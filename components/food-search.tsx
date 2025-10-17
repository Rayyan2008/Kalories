"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, X } from "lucide-react"
import { foodDatabase, FoodItem, calculateNutrition, searchFoods } from "@/lib/food-database"

interface FoodSearchProps {
  onFoodSelect: (food: FoodItem, quantity: number, unit: string) => void
  onClose: () => void
}

export default function FoodSearch({ onFoodSelect, onClose }: FoodSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [unit, setUnit] = useState("")
  const [searchResults, setSearchResults] = useState<FoodItem[]>([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (searchQuery.length > 0) {
      const results = searchFoods(searchQuery)
      setSearchResults(results.slice(0, 10)) // Limit to 10 results
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }, [searchQuery])

  const handleFoodSelect = (food: FoodItem) => {
    setSelectedFood(food)
    setUnit(food.servingUnit)
    setQuantity(food.servingSize)
    setSearchQuery("")
    setShowResults(false)
  }

  const handleAddFood = () => {
    if (selectedFood) {
      onFoodSelect(selectedFood, quantity, unit)
      onClose()
    }
  }

  const getNutritionPreview = () => {
    if (!selectedFood) return null
    return calculateNutrition(selectedFood, quantity, unit)
  }

  const nutrition = getNutritionPreview()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Add Food</CardTitle>
            <CardDescription>Search and select food items with accurate nutrition data</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for food (e.g., apple, chicken, rice)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Search Results */}
          {showResults && searchResults.length > 0 && (
            <div className="border rounded-lg max-h-60 overflow-y-auto">
              {searchResults.map((food) => (
                <button
                  key={food.id}
                  onClick={() => handleFoodSelect(food)}
                  className="w-full p-3 text-left hover:bg-muted/50 border-b last:border-b-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{food.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {food.servingSize} {food.servingUnit} • {food.category}
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div>{food.calories} cal</div>
                      <div className="text-muted-foreground">
                        P:{food.protein}g C:{food.carbs}g F:{food.fat}g
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {showResults && searchResults.length === 0 && searchQuery.length > 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No foods found matching "{searchQuery}"
            </div>
          )}

          {/* Selected Food Details */}
          {selectedFood && (
            <div className="border rounded-lg p-4 bg-muted/20">
              <h3 className="font-semibold mb-3">{selectedFood.name}</h3>

              {/* Quantity Input */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium">Quantity</label>
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Unit</label>
                  <Input
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="mt-1"
                    placeholder="e.g., cups, grams, pieces"
                  />
                </div>
              </div>

              {/* Nutrition Preview */}
              {nutrition && (
                <div className="space-y-2">
                  <h4 className="font-medium">Nutrition Facts</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span>Calories:</span>
                      <span className="font-medium">{nutrition.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Protein:</span>
                      <span className="font-medium">{nutrition.protein}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carbs:</span>
                      <span className="font-medium">{nutrition.carbs}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fat:</span>
                      <span className="font-medium">{nutrition.fat}g</span>
                    </div>
                    {nutrition.fiber && (
                      <div className="flex justify-between">
                        <span>Fiber:</span>
                        <span className="font-medium">{nutrition.fiber}g</span>
                      </div>
                    )}
                    {nutrition.sugar && (
                      <div className="flex justify-between">
                        <span>Sugar:</span>
                        <span className="font-medium">{nutrition.sugar}g</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleAddFood}
              disabled={!selectedFood}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Food
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
