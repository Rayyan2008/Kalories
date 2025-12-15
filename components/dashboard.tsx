"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, Trash2, BarChart3, Brain, Apple, User, Home, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import ProfileSetupModal from "@/components/profile-setup-modal"
import FoodSearch from "@/components/food-search"
import { FoodItem, calculateNutrition } from "@/lib/food-database"

interface MealEntry {
  id: string
  text: string
  calories: number
  protein: number
  carbs: number
  fat: number
  timestamp: Date
  foodItems?: Array<{
    food: FoodItem
    quantity: number
    unit: string
    nutrition: {
      calories: number
      protein: number
      carbs: number
      fat: number
    }
  }>
}

export default function Dashboard() {
  const [mealText, setMealText] = useState("")
  const [meals, setMeals] = useState<MealEntry[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showProfileSetup, setShowProfileSetup] = useState(false)
  const [profileData, setProfileData] = useState<any>(null)
  const [showFoodSearch, setShowFoodSearch] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    // Wait for session loading to finish
    if (status === "loading") return
    // Redirect to login if unauthenticated
    if (!session) {
      router.push("/login")
      return
    }

    // Check if profile is set up (still stored in localStorage for now)
    const profile = localStorage.getItem("kalorie-profile")
    if (!profile) {
      setShowProfileSetup(true)
    } else {
      setProfileData(JSON.parse(profile))
    }

    // Load meals from API
    ;(async () => {
      try {
        const res = await fetch('/api/meals')
        if (!res.ok) throw new Error('Failed to load meals')
        const data = await res.json()
        const parsedMeals = data.map((m: any) => ({
          id: m.id,
          text: m.text,
          calories: m.calories,
          protein: m.protein,
          carbs: m.carbs,
          fat: m.fat,
          timestamp: new Date(m.date),
          foodItems: m.items || undefined,
        }))
        setMeals(parsedMeals)
      } catch (err) {
        console.error('Failed loading meals from API, falling back to localStorage', err)
        const savedMeals = localStorage.getItem("kalorie-meals")
        if (savedMeals) {
          const parsedMeals = JSON.parse(savedMeals).map((meal: any) => ({
            ...meal,
            timestamp: new Date(meal.timestamp)
          }))
          setMeals(parsedMeals)
        }
      }
    })()
  }, [router, session, status])

  const analyzeMeal = async () => {
    if (!mealText.trim()) return

    setIsAnalyzing(true)

    try {
      // Call AI API for natural language parsing and nutrition analysis
      const response = await fetch('/api/analyze-meal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mealText }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze meal')
      }

      const data = await response.json()

      // Persist meal to backend
      const createRes = await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: mealText,
          calories: data.calories,
          protein: data.protein,
          carbs: data.carbs,
          fat: data.fat,
        }),
      })
      if (!createRes.ok) throw new Error('Failed to create meal')
      const created = await createRes.json()
      const newMeal: MealEntry = {
        id: created.id,
        text: created.text,
        calories: created.calories,
        protein: created.protein,
        carbs: created.carbs,
        fat: created.fat,
        timestamp: new Date(created.date),
      }

      setMeals(prev => [newMeal, ...prev])
      setMealText("")
    } catch (error) {
      console.error('Error analyzing meal:', error)
      // Fallback to mock data if API fails
      const mockData = {
        calories: Math.floor(Math.random() * 500) + 100,
        protein: Math.floor(Math.random() * 30) + 5,
        carbs: Math.floor(Math.random() * 50) + 10,
        fat: Math.floor(Math.random() * 20) + 2
      }

      const newMealData = {
        text: mealText,
        calories: mockData.calories,
        protein: mockData.protein,
        carbs: mockData.carbs,
        fat: mockData.fat,
      }
      try {
        const createRes = await fetch('/api/meals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMealData),
        })
        if (createRes.ok) {
          const created = await createRes.json()
          const newMeal: MealEntry = {
            id: created.id,
            text: created.text,
            calories: created.calories,
            protein: created.protein,
            carbs: created.carbs,
            fat: created.fat,
            timestamp: new Date(created.date),
          }
          setMeals(prev => [newMeal, ...prev])
          setMealText("")
          return
        }
      } catch (err) {
        console.error('Failed to persist mock meal', err)
      }

      const newMeal: MealEntry = {
        id: Date.now().toString(),
        text: mealText,
        ...mockData,
        timestamp: new Date()
      }

      setMeals(prev => [newMeal, ...prev])
      localStorage.setItem("kalorie-meals", JSON.stringify([newMeal, ...meals]))
      setMealText("")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleFoodSelect = (food: FoodItem, quantity: number, unit: string) => {
    const nutrition = calculateNutrition(food, quantity, unit)
    const mealText = `${quantity} ${unit} ${food.name}`

    ;(async () => {
      try {
        const res = await fetch('/api/meals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: mealText,
            calories: nutrition.calories,
            protein: nutrition.protein,
            carbs: nutrition.carbs,
            fat: nutrition.fat,
            items: [{
              foodId: food.id,
              quantity,
              unit,
              calories: nutrition.calories,
              protein: nutrition.protein,
              carbs: nutrition.carbs,
              fat: nutrition.fat,
            }]
          }),
        })
        if (res.ok) {
          const created = await res.json()
          const newMeal: MealEntry = {
            id: created.id,
            text: created.text,
            calories: created.calories,
            protein: created.protein,
            carbs: created.carbs,
            fat: created.fat,
            timestamp: new Date(created.date),
            foodItems: created.items || undefined,
          }
          setMeals(prev => [newMeal, ...prev])
          return
        }
      } catch (err) {
        console.error('Failed to persist selected food meal', err)
      }

      const newMeal: MealEntry = {
        id: Date.now().toString(),
        text: mealText,
        calories: nutrition.calories,
        protein: nutrition.protein,
        carbs: nutrition.carbs,
        fat: nutrition.fat,
        timestamp: new Date(),
        foodItems: [{ food, quantity, unit, nutrition }]
      }
      setMeals(prev => [newMeal, ...prev])
      localStorage.setItem("kalorie-meals", JSON.stringify([newMeal, ...meals]))
    })()
  }

  const deleteMeal = (id: string) => {
    ;(async () => {
      try {
        const res = await fetch(`/api/meals/${id}`, { method: 'DELETE' })
        if (res.ok) {
          setMeals(prev => prev.filter(m => m.id !== id))
          return
        }
      } catch (err) {
        console.error('Failed to delete meal via API', err)
      }

      // fallback local removal
      const updatedMeals = meals.filter(meal => meal.id !== id)
      setMeals(updatedMeals)
      localStorage.setItem("kalorie-meals", JSON.stringify(updatedMeals))
    })()
  }

  const logout = () => {
    // Sign out via NextAuth and clear client-side data
    localStorage.removeItem("kalorie-profile")
    localStorage.removeItem("kalorie-meals")
    signOut({ callbackUrl: '/' })
  }

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0)
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0)
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Apple className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Kalorie AI Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => router.push("/")}>
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowProfileSetup(true)}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Meal Input */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Log Your Meal
                </CardTitle>
                <CardDescription>
                  Type what you ate in natural language (e.g., "½ McAloo Tikki Burger")
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Describe your meal..."
                  value={mealText}
                  onChange={(e) => setMealText(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={analyzeMeal}
                    disabled={!mealText.trim() || isAnalyzing}
                    className="flex-1"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze & Add Meal"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowFoodSearch(true)}
                    className="flex-1"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search Food
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Meals */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Meals
                </CardTitle>
              </CardHeader>
              <CardContent>
                {meals.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No meals logged yet. Start by adding your first meal above!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {meals.map((meal) => (
                      <div key={meal.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{meal.text}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="secondary">{meal.calories} cal</Badge>
                            <Badge variant="outline">{meal.protein}g protein</Badge>
                            <Badge variant="outline">{meal.carbs}g carbs</Badge>
                            <Badge variant="outline">{meal.fat}g fat</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {meal.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteMeal(meal.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calorie Goals */}
            {profileData?.calorieGoals && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Your Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-green-600">{profileData.calorieGoals.dailyDeficit}</div>
                      <div className="text-xs text-muted-foreground">Daily Goal</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-blue-600">{profileData.calorieGoals.weeklyGoal}</div>
                      <div className="text-xs text-muted-foreground">Weekly Goal</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-purple-600">{profileData.calorieGoals.monthlyGoal}</div>
                      <div className="text-xs text-muted-foreground">Monthly Goal</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-orange-600">{profileData.calorieGoals.dailyMaintenance}</div>
                      <div className="text-xs text-muted-foreground">Maintenance</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Daily Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Daily Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{totalCalories}</div>
                  <div className="text-sm text-muted-foreground">Total Calories</div>
                  {profileData?.calorieGoals && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Goal: {profileData.calorieGoals.dailyDeficit} cal
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold">{totalProtein}g</div>
                    <div className="text-xs text-muted-foreground">Protein</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{totalCarbs}g</div>
                    <div className="text-xs text-muted-foreground">Carbs</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{totalFat}g</div>
                    <div className="text-xs text-muted-foreground">Fat</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">Healthy Alternative</p>
                    <p className="text-xs text-muted-foreground">
                      Try grilled chicken instead of fried for 200 fewer calories
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">Meal Balance</p>
                    <p className="text-xs text-muted-foreground">
                      Add more vegetables to increase fiber intake
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Profile Setup Modal */}
      <ProfileSetupModal
        isOpen={showProfileSetup}
        onClose={() => setShowProfileSetup(false)}
      />

      {/* Food Search Modal */}
      {showFoodSearch && (
        <FoodSearch
          onFoodSelect={handleFoodSelect}
          onClose={() => setShowFoodSearch(false)}
        />
      )}
    </div>
  )
}
