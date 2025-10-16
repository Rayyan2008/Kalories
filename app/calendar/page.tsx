"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Flame, Target } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface MealEntry {
  id: string
  text: string
  calories: number
  protein: number
  carbs: number
  fat: number
  timestamp: Date
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [meals, setMeals] = useState<MealEntry[]>([])
  const [profileData, setProfileData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("kalorie-auth")
    if (!auth) {
      router.push("/login")
      return
    }

    // Load meals
    const savedMeals = localStorage.getItem("kalorie-meals")
    if (savedMeals) {
      const parsedMeals = JSON.parse(savedMeals).map((meal: any) => ({
        ...meal,
        timestamp: new Date(meal.timestamp)
      }))
      setMeals(parsedMeals)
    }

    // Load profile
    const profile = localStorage.getItem("kalorie-profile")
    if (profile) {
      setProfileData(JSON.parse(profile))
    }
  }, [router])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getMealsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return meals.filter(meal => {
      const mealDate = meal.timestamp.toISOString().split('T')[0]
      return mealDate === dateString
    })
  }

  const getTotalCaloriesForDate = (date: Date) => {
    const mealsForDate = getMealsForDate(date)
    return mealsForDate.reduce((total, meal) => total + meal.calories, 0)
  }

  const getCalorieStatus = (calories: number) => {
    const target = profileData?.calorieGoals?.dailyDeficit || 2000
    if (calories === 0) return 'none'
    if (calories < target * 0.8) return 'under'
    if (calories <= target * 1.1) return 'on-track'
    return 'over'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'under': return 'bg-green-500/20 border-green-500/50'
      case 'on-track': return 'bg-orange-500/20 border-orange-500/50'
      case 'over': return 'bg-red-500/20 border-red-500/50'
      default: return 'bg-gray-500/10 border-gray-500/30'
    }
  }

  const selectedMeals = selectedDate ? getMealsForDate(new Date(selectedDate)) : []

  return (
    <div className="relative min-h-screen">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <section className="container py-24 md:py-32">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                📅 Diet Calendar View
              </h1>
              <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                Daily entries automatically log into a calendar, showing total calories and macros per day.
                Click any date to see detailed breakdown.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Calendar */}
              <div className="lg:col-span-2">
                <div className="bg-card/50 backdrop-blur-sm border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h2>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                      >
                        ←
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                      >
                        →
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const today = new Date()
                          setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1))
                          setSelectedDate(today.toISOString().split('T')[0])
                        }}
                      >
                        Today
                      </Button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {getDaysInMonth(currentMonth).map((date, index) => {
                      if (!date) {
                        return <div key={index} className="p-2"></div>
                      }

                      const calories = getTotalCaloriesForDate(date)
                      const status = getCalorieStatus(calories)
                      const isSelected = selectedDate === date.toISOString().split('T')[0]

                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedDate(date.toISOString().split('T')[0])}
                          className={`p-2 text-left border rounded-md transition-colors hover:bg-accent/50 ${
                            isSelected ? 'ring-2 ring-primary' : ''
                          } ${getStatusColor(status)}`}
                        >
                          <div className="text-sm font-medium">{date.getDate()}</div>
                          {calories > 0 && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {calories} cal
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap gap-4 mt-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500/20 border border-green-500/50 rounded"></div>
                      <span>Under target</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500/20 border border-orange-500/50 rounded"></div>
                      <span>On track</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500/20 border border-red-500/50 rounded"></div>
                      <span>Over limit</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Breakdown */}
              <div className="space-y-6">
                {selectedDate ? (
                  <div className="bg-card/50 backdrop-blur-sm border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      {new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h3>

                    {selectedMeals.length > 0 ? (
                      <div className="space-y-4">
                        {selectedMeals.map(meal => (
                          <div key={meal.id} className="border rounded-lg p-4">
                            <div className="font-medium">{meal.text}</div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Flame className="w-4 h-4" />
                                {meal.calories} cal
                              </div>
                              <div>P: {meal.protein}g</div>
                              <div>C: {meal.carbs}g</div>
                              <div>F: {meal.fat}g</div>
                            </div>
                          </div>
                        ))}

                        <div className="border-t pt-4">
                          <div className="font-semibold">Daily Total</div>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <div className="flex items-center gap-1">
                              <Flame className="w-4 h-4" />
                              {selectedMeals.reduce((sum, meal) => sum + meal.calories, 0)} cal
                            </div>
                            <div>P: {selectedMeals.reduce((sum, meal) => sum + meal.protein, 0)}g</div>
                            <div>C: {selectedMeals.reduce((sum, meal) => sum + meal.carbs, 0)}g</div>
                            <div>F: {selectedMeals.reduce((sum, meal) => sum + meal.fat, 0)}g</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No meals logged for this date.</p>
                    )}
                  </div>
                ) : (
                  <div className="bg-card/50 backdrop-blur-sm border rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-5 h-5" />
                      <h3 className="text-lg font-semibold">Daily Breakdown</h3>
                    </div>
                    <p className="text-muted-foreground">Click on a date to see detailed meal breakdown.</p>
                  </div>
                )}

                <div className="bg-card/50 backdrop-blur-sm border rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">Daily Target</h3>
                  </div>
                  <div className="text-2xl font-bold">{profileData?.calorieGoals?.dailyDeficit || 2000} cal</div>
                  <p className="text-sm text-muted-foreground mt-1">Based on your profile</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  )
}
