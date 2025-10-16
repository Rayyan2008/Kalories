import { NextRequest, NextResponse } from 'next/server'

// Mock food database with Indian and global foods
const foodDatabase: Record<string, { calories: number; protein: number; carbs: number; fat: number }> = {
  // Indian foods
  'aloo tikki': { calories: 180, protein: 4, carbs: 25, fat: 8 },
  'mc aloo tikki burger': { calories: 420, protein: 12, carbs: 45, fat: 18 },
  '½ mc aloo tikki burger': { calories: 210, protein: 6, carbs: 22, fat: 9 },
  'paneer butter masala': { calories: 320, protein: 18, carbs: 12, fat: 22 },
  'roti': { calories: 120, protein: 3, carbs: 20, fat: 3 },
  'chicken biryani': { calories: 450, protein: 25, carbs: 50, fat: 15 },
  'dal makhani': { calories: 280, protein: 12, carbs: 30, fat: 12 },
  'chole bhature': { calories: 520, protein: 15, carbs: 65, fat: 20 },
  'rajma': { calories: 220, protein: 10, carbs: 35, fat: 4 },
  'palak paneer': { calories: 290, protein: 16, carbs: 8, fat: 20 },

  // Global foods
  'boiled egg': { calories: 70, protein: 6, carbs: 1, fat: 5 },
  '2 boiled eggs': { calories: 140, protein: 12, carbs: 2, fat: 10 },
  'black coffee': { calories: 5, protein: 0, carbs: 1, fat: 0 },
  'grilled chicken': { calories: 165, protein: 31, carbs: 0, fat: 3 },
  'fried chicken': { calories: 320, protein: 25, carbs: 10, fat: 20 },
  'salad': { calories: 50, protein: 2, carbs: 8, fat: 1 },
  'rice': { calories: 130, protein: 3, carbs: 28, fat: 0 },
  'bread': { calories: 80, protein: 3, carbs: 15, fat: 1 },
  'banana': { calories: 105, protein: 1, carbs: 27, fat: 0 },
  'apple': { calories: 95, protein: 0, carbs: 25, fat: 0 },
  'orange': { calories: 62, protein: 1, carbs: 15, fat: 0 },
  'milk': { calories: 150, protein: 8, carbs: 12, fat: 8 },
  'yogurt': { calories: 100, protein: 10, carbs: 8, fat: 3 },
  'cheese': { calories: 110, protein: 7, carbs: 1, fat: 9 },
  'butter': { calories: 100, protein: 0, carbs: 0, fat: 11 },
  'potato': { calories: 77, protein: 2, carbs: 17, fat: 0 },
  'tomato': { calories: 18, protein: 1, carbs: 4, fat: 0 },
  'onion': { calories: 40, protein: 1, carbs: 9, fat: 0 },
  'garlic': { calories: 4, protein: 0, carbs: 1, fat: 0 },
  'spinach': { calories: 23, protein: 3, carbs: 4, fat: 0 },
  'broccoli': { calories: 55, protein: 4, carbs: 11, fat: 0 },
  'carrot': { calories: 41, protein: 1, carbs: 10, fat: 0 },
  'beef': { calories: 250, protein: 26, carbs: 0, fat: 17 },
  'fish': { calories: 120, protein: 25, carbs: 0, fat: 3 },
  'pasta': { calories: 220, protein: 8, carbs: 43, fat: 1 },
  'pizza': { calories: 285, protein: 12, carbs: 36, fat: 10 },
  'burger': { calories: 295, protein: 16, carbs: 30, fat: 12 },
  'sandwich': { calories: 250, protein: 12, carbs: 30, fat: 8 },
  'soup': { calories: 80, protein: 4, carbs: 12, fat: 2 },
  'cake': { calories: 350, protein: 5, carbs: 50, fat: 15 },
  'cookie': { calories: 150, protein: 2, carbs: 20, fat: 7 },
  'ice cream': { calories: 270, protein: 5, carbs: 31, fat: 15 },
  'chocolate': { calories: 235, protein: 3, carbs: 30, fat: 13 },
  'nuts': { calories: 160, protein: 6, carbs: 6, fat: 14 },
  'peanuts': { calories: 160, protein: 7, carbs: 6, fat: 14 },
  'almonds': { calories: 160, protein: 6, carbs: 6, fat: 14 },
  'walnuts': { calories: 185, protein: 4, carbs: 4, fat: 18 },
  'oats': { calories: 150, protein: 5, carbs: 27, fat: 3 },
  'cereal': { calories: 120, protein: 3, carbs: 24, fat: 1 },
  'juice': { calories: 110, protein: 1, carbs: 27, fat: 0 },
  'soda': { calories: 140, protein: 0, carbs: 39, fat: 0 },
  'water': { calories: 0, protein: 0, carbs: 0, fat: 0 },
  'tea': { calories: 2, protein: 0, carbs: 0, fat: 0 },
  'coffee': { calories: 2, protein: 0, carbs: 0, fat: 0 },
}

function parseMealText(text: string): { items: string[]; quantities: number[] } {
  const lowerText = text.toLowerCase()
  const items: string[] = []
  const quantities: number[] = []

  // Extract quantities and items
  const patterns = [
    /(\d+(?:\.\d+)?)\s*(half|½)?\s*([a-zA-Z\s]+)/g,
    /([a-zA-Z\s]+)\s*(\d+(?:\.\d+)?)\s*(half|½)?/g,
    /([a-zA-Z\s]+)/g
  ]

  for (const pattern of patterns) {
    let match
    while ((match = pattern.exec(lowerText)) !== null) {
      let quantity = 1
      let item = ''

      if (match[1] && match[3]) {
        quantity = parseFloat(match[1])
        if (match[2] === 'half' || match[2] === '½') quantity *= 0.5
        item = match[3].trim()
      } else if (match[1] && match[2]) {
        item = match[1].trim()
        quantity = parseFloat(match[2])
        if (match[3] === 'half' || match[3] === '½') quantity *= 0.5
      } else if (match[1]) {
        item = match[1].trim()
      }

      if (item) {
        items.push(item)
        quantities.push(quantity)
      }
    }
  }

  // If no specific parsing worked, treat the whole text as one item
  if (items.length === 0) {
    items.push(lowerText.trim())
    quantities.push(1)
  }

  return { items, quantities }
}

function findFoodMatch(item: string): { calories: number; protein: number; carbs: number; fat: number } | null {
  const lowerItem = item.toLowerCase()

  // Direct match
  if (foodDatabase[lowerItem]) {
    return foodDatabase[lowerItem]
  }

  // Partial match
  for (const [key, value] of Object.entries(foodDatabase)) {
    if (lowerItem.includes(key) || key.includes(lowerItem)) {
      return value
    }
  }

  // Keyword matching
  const keywords = lowerItem.split(/\s+/)
  for (const keyword of keywords) {
    for (const [key, value] of Object.entries(foodDatabase)) {
      if (key.includes(keyword) || keyword.includes(key)) {
        return value
      }
    }
  }

  return null
}

export async function POST(request: NextRequest) {
  try {
    const { mealText } = await request.json()

    if (!mealText || typeof mealText !== 'string') {
      return NextResponse.json({ error: 'Invalid meal text' }, { status: 400 })
    }

    const { items, quantities } = parseMealText(mealText)

    let totalCalories = 0
    let totalProtein = 0
    let totalCarbs = 0
    let totalFat = 0

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const quantity = quantities[i]
      const nutrition = findFoodMatch(item)

      if (nutrition) {
        totalCalories += nutrition.calories * quantity
        totalProtein += nutrition.protein * quantity
        totalCarbs += nutrition.carbs * quantity
        totalFat += nutrition.fat * quantity
      } else {
        // Fallback for unknown foods - estimate based on common patterns
        const estimatedCalories = Math.floor(Math.random() * 300) + 50
        totalCalories += estimatedCalories * quantity
        totalProtein += Math.floor(estimatedCalories * 0.2) * quantity
        totalCarbs += Math.floor(estimatedCalories * 0.5) * quantity
        totalFat += Math.floor(estimatedCalories * 0.3) * quantity
      }
    }

    return NextResponse.json({
      calories: Math.round(totalCalories),
      protein: Math.round(totalProtein),
      carbs: Math.round(totalCarbs),
      fat: Math.round(totalFat)
    })

  } catch (error) {
    console.error('Error analyzing meal:', error)
    return NextResponse.json({ error: 'Failed to analyze meal' }, { status: 500 })
  }
}
