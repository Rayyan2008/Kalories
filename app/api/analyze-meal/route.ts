import { NextRequest, NextResponse } from 'next/server'
import { foodDatabase, calculateNutrition, FoodItem } from '@/lib/food-database'

type Nutrients = {
  calories: number
  protein: number
  carbs: number
  fat: number
}

function parseNumberToken(token: string): number | null {
  if (!token) return null
  token = token.toLowerCase().trim()
  if (token === 'a' || token === 'an' || token === 'one') return 1
  if (token === 'half' || token === '½') return 0.5
  const words: Record<string, number> = { two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 }
  if (words[token]) return words[token]
  if (token.includes('/')) {
    const parts = token.split('/')
    const num = parseFloat(parts[0])
    const den = parseFloat(parts[1])
    if (!isNaN(num) && !isNaN(den) && den !== 0) return num / den
  }
  const n = parseFloat(token.replace(/[,]/g, ''))
  if (!isNaN(n)) return n
  return null
}

function findFoodsInText(text: string): Array<{ food: FoodItem; quantity: number; unit: string | null }> {
  const lowered = text.toLowerCase()
  const results: Array<{ food: FoodItem; quantity: number; unit: string | null }> = []

  for (const food of foodDatabase) {
    const name = food.name.toLowerCase()
    if (!lowered.includes(name)) continue

    const idx = lowered.indexOf(name)
    const before = lowered.slice(Math.max(0, idx - 40), idx)

    const qtyRegex = /(?:(\d+\.?\d*|\d+\/\d+|half|a|an|one|two|three|four|five)\s*(g|kg|cup|cups|tbsp|tbsp\.|tsp|tsp\.|slice|slices|piece|pieces|medium|large|small)?\s*)$/i
    const m = before.match(qtyRegex)

    let qty = 1
    let unit: string | null = null
    if (m) {
      const numToken = m[1]
      const parsed = parseNumberToken(numToken)
      if (parsed !== null) qty = parsed
      unit = m[2] || null
    }

    const normalizedUnit = unit ? unit : food.servingUnit
    results.push({ food, quantity: qty, unit: normalizedUnit })
  }

  return results
}

function aggregateNutrition(matches: Array<{ food: FoodItem; quantity: number; unit: string | null }>): Nutrients {
  let calories = 0
  let protein = 0
  let carbs = 0
  let fat = 0

  for (const m of matches) {
    const unit = m.unit || m.food.servingUnit
    const nut = calculateNutrition(m.food, m.quantity, unit)
    calories += nut.calories
    protein += nut.protein
    carbs += nut.carbs
    fat += nut.fat
  }

  return { calories: Math.round(calories), protein: Math.round(protein * 10) / 10, carbs: Math.round(carbs * 10) / 10, fat: Math.round(fat * 10) / 10 }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const mealText = typeof body?.mealText === 'string' ? body.mealText : ''

    if (!mealText || !mealText.trim()) {
      return NextResponse.json({ error: 'mealText is required' }, { status: 400 })
    }

    // If API key is present, require CalorieNinja for live results (no local fallback)
    const apiKey = process.env.CALORIE_NINJA_API_KEY || process.env.CALORIENINJAS_API_KEY || process.env.CALORIE_NINJA_KEY
    if (apiKey) {
      try {
        const q = encodeURIComponent(mealText)
        const res = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${q}`, {
          headers: { 'X-Api-Key': apiKey }
        })

        if (!res.ok) {
          const text = await res.text().catch(() => '')
          console.error('CalorieNinja error', res.status, text)
          return NextResponse.json({ error: 'CalorieNinja lookup failed' }, { status: 502 })
        }

        const json = await res.json()
        if (!Array.isArray(json) || json.length === 0) {
          return NextResponse.json({ error: 'CalorieNinja did not recognize any foods. Try rephrasing.' }, { status: 422 })
        }

        const calories = json.reduce((s: number, it: any) => s + (it.calories || 0), 0)
        const protein = json.reduce((s: number, it: any) => s + (it.protein_g ?? it.protein ?? 0), 0)
        const carbs = json.reduce((s: number, it: any) => s + (it.carbohydrates_total_g ?? it.carbs ?? 0), 0)
        const fat = json.reduce((s: number, it: any) => s + (it.fat_total_g ?? it.fat ?? 0), 0)

        return NextResponse.json({ calories: Math.round(calories), protein: Math.round(protein * 10) / 10, carbs: Math.round(carbs * 10) / 10, fat: Math.round(fat * 10) / 10 })
      } catch (err) {
        console.error('CalorieNinja request failed', err)
        return NextResponse.json({ error: 'CalorieNinja request failed' }, { status: 502 })
      }
    }

    // Local parsing fallback when no CalorieNinja key is configured
    const matches = findFoodsInText(mealText)
    if (matches.length === 0) {
      const tokens = mealText.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)
      for (const t of tokens) {
        const found = foodDatabase.find(f => f.name.toLowerCase().includes(t) || f.id === t)
        if (found) {
          matches.push({ food: found, quantity: 1, unit: found.servingUnit })
        }
      }
    }

    if (matches.length === 0) {
      return NextResponse.json({ error: 'Could not recognize any foods. Try: "1 banana", "2 eggs", "100g chicken breast"' }, { status: 422 })
    }

    const nutrients = aggregateNutrition(matches)
    return NextResponse.json(nutrients)
  } catch (err) {
    console.error('analyze-meal error', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'POST a { mealText } JSON to analyze. Examples: "2 eggs", "1 banana", "100g chicken breast"' })
}
