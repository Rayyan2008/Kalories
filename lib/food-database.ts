export interface FoodItem {
  id: string
  name: string
  category: string
  servingSize: number
  servingUnit: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber?: number
  sugar?: number
  sodium?: number
}

export const foodDatabase: FoodItem[] = [
  // Fruits
  {
    id: "apple",
    name: "Apple",
    category: "Fruits",
    servingSize: 1,
    servingUnit: "medium apple",
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fat: 0.3,
    fiber: 4.4,
    sugar: 19
  },
  {
    id: "banana",
    name: "Banana",
    category: "Fruits",
    servingSize: 1,
    servingUnit: "medium banana",
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.4,
    fiber: 3.1,
    sugar: 14
  },
  {
    id: "orange",
    name: "Orange",
    category: "Fruits",
    servingSize: 1,
    servingUnit: "medium orange",
    calories: 62,
    protein: 1.2,
    carbs: 15,
    fat: 0.2,
    fiber: 3.1,
    sugar: 12
  },
  {
    id: "strawberries",
    name: "Strawberries",
    category: "Fruits",
    servingSize: 1,
    servingUnit: "cup",
    calories: 49,
    protein: 1,
    carbs: 12,
    fat: 0.5,
    fiber: 3,
    sugar: 7
  },

  // Vegetables
  {
    id: "broccoli",
    name: "Broccoli",
    category: "Vegetables",
    servingSize: 1,
    servingUnit: "cup chopped",
    calories: 55,
    protein: 3.7,
    carbs: 11,
    fat: 0.6,
    fiber: 5.1,
    sugar: 2.2
  },
  {
    id: "carrot",
    name: "Carrot",
    category: "Vegetables",
    servingSize: 1,
    servingUnit: "medium carrot",
    calories: 25,
    protein: 0.6,
    carbs: 6,
    fat: 0.1,
    fiber: 1.7,
    sugar: 3
  },
  {
    id: "spinach",
    name: "Spinach",
    category: "Vegetables",
    servingSize: 1,
    servingUnit: "cup",
    calories: 7,
    protein: 0.9,
    carbs: 1.1,
    fat: 0.1,
    fiber: 0.7,
    sugar: 0.1
  },
  {
    id: "tomato",
    name: "Tomato",
    category: "Vegetables",
    servingSize: 1,
    servingUnit: "medium tomato",
    calories: 22,
    protein: 1.1,
    carbs: 4.8,
    fat: 0.2,
    fiber: 1.5,
    sugar: 3.2
  },

  // Proteins
  {
    id: "chicken_breast",
    name: "Chicken Breast",
    category: "Proteins",
    servingSize: 100,
    servingUnit: "g",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    sugar: 0
  },
  {
    id: "salmon",
    name: "Salmon",
    category: "Proteins",
    servingSize: 100,
    servingUnit: "g",
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 13,
    fiber: 0,
    sugar: 0
  },
  {
    id: "eggs",
    name: "Eggs",
    category: "Proteins",
    servingSize: 1,
    servingUnit: "large egg",
    calories: 70,
    protein: 6,
    carbs: 0.6,
    fat: 5,
    fiber: 0,
    sugar: 0.6
  },
  {
    id: "tofu",
    name: "Tofu",
    category: "Proteins",
    servingSize: 100,
    servingUnit: "g",
    calories: 76,
    protein: 8,
    carbs: 1.9,
    fat: 4.8,
    fiber: 0.3,
    sugar: 0.6
  },

  // Grains
  {
    id: "brown_rice",
    name: "Brown Rice",
    category: "Grains",
    servingSize: 1,
    servingUnit: "cup cooked",
    calories: 216,
    protein: 5,
    carbs: 44,
    fat: 1.8,
    fiber: 3.5,
    sugar: 0.7
  },
  {
    id: "quinoa",
    name: "Quinoa",
    category: "Grains",
    servingSize: 1,
    servingUnit: "cup cooked",
    calories: 222,
    protein: 8,
    carbs: 39,
    fat: 3.6,
    fiber: 5.2,
    sugar: 1.6
  },
  {
    id: "oats",
    name: "Oats",
    category: "Grains",
    servingSize: 0.5,
    servingUnit: "cup dry",
    calories: 150,
    protein: 5,
    carbs: 27,
    fat: 3,
    fiber: 4,
    sugar: 1
  },
  {
    id: "whole_wheat_bread",
    name: "Whole Wheat Bread",
    category: "Grains",
    servingSize: 1,
    servingUnit: "slice",
    calories: 81,
    protein: 4,
    carbs: 15,
    fat: 1,
    fiber: 2,
    sugar: 1
  },

  // Dairy
  {
    id: "greek_yogurt",
    name: "Greek Yogurt",
    category: "Dairy",
    servingSize: 1,
    servingUnit: "cup",
    calories: 100,
    protein: 17,
    carbs: 6,
    fat: 0,
    fiber: 0,
    sugar: 4
  },
  {
    id: "milk",
    name: "Milk",
    category: "Dairy",
    servingSize: 1,
    servingUnit: "cup",
    calories: 103,
    protein: 8,
    carbs: 12,
    fat: 2.4,
    fiber: 0,
    sugar: 12
  },
  {
    id: "cheddar_cheese",
    name: "Cheddar Cheese",
    category: "Dairy",
    servingSize: 28,
    servingUnit: "g",
    calories: 113,
    protein: 7,
    carbs: 0.4,
    fat: 9,
    fiber: 0,
    sugar: 0.1
  },

  // Snacks
  {
    id: "almonds",
    name: "Almonds",
    category: "Snacks",
    servingSize: 28,
    servingUnit: "g",
    calories: 161,
    protein: 6,
    carbs: 6,
    fat: 14,
    fiber: 3.5,
    sugar: 1.2
  },
  {
    id: "peanut_butter",
    name: "Peanut Butter",
    category: "Snacks",
    servingSize: 2,
    servingUnit: "tbsp",
    calories: 188,
    protein: 8,
    carbs: 6,
    fat: 16,
    fiber: 2,
    sugar: 3
  },
  {
    id: "dark_chocolate",
    name: "Dark Chocolate",
    category: "Snacks",
    servingSize: 28,
    servingUnit: "g",
    calories: 170,
    protein: 2,
    carbs: 13,
    fat: 12,
    fiber: 3,
    sugar: 8
  },

  // Beverages
  {
    id: "coffee",
    name: "Coffee",
    category: "Beverages",
    servingSize: 1,
    servingUnit: "cup",
    calories: 2,
    protein: 0.3,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0
  },
  {
    id: "green_tea",
    name: "Green Tea",
    category: "Beverages",
    servingSize: 1,
    servingUnit: "cup",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0
  },
  {
    id: "orange_juice",
    name: "Orange Juice",
    category: "Beverages",
    servingSize: 1,
    servingUnit: "cup",
    calories: 112,
    protein: 2,
    carbs: 26,
    fat: 0.5,
    fiber: 0.5,
    sugar: 21
  }
]

export const getFoodById = (id: string): FoodItem | undefined => {
  return foodDatabase.find(food => food.id === id)
}

export const searchFoods = (query: string): FoodItem[] => {
  const lowerQuery = query.toLowerCase()
  return foodDatabase.filter(food =>
    food.name.toLowerCase().includes(lowerQuery) ||
    food.category.toLowerCase().includes(lowerQuery)
  )
}

export const getFoodsByCategory = (category: string): FoodItem[] => {
  return foodDatabase.filter(food => food.category === category)
}

export const calculateNutrition = (food: FoodItem, quantity: number, unit: string): {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber?: number
  sugar?: number
  sodium?: number
} => {
  // Convert quantity to base serving size
  let multiplier = quantity / food.servingSize

  // Handle different units if needed (for now, assume user enters in serving units)
  if (unit !== food.servingUnit) {
    // Basic unit conversion - in a real app, this would be more sophisticated
    if (unit === 'g' && food.servingUnit.includes('g')) {
      multiplier = quantity / food.servingSize
    } else if (unit === 'cup' && food.servingUnit.includes('cup')) {
      multiplier = quantity
    } else {
      // Default to quantity as multiplier for serving units
      multiplier = quantity
    }
  }

  return {
    calories: Math.round(food.calories * multiplier),
    protein: Math.round(food.protein * multiplier * 10) / 10,
    carbs: Math.round(food.carbs * multiplier * 10) / 10,
    fat: Math.round(food.fat * multiplier * 10) / 10,
    fiber: food.fiber ? Math.round(food.fiber * multiplier * 10) / 10 : undefined,
    sugar: food.sugar ? Math.round(food.sugar * multiplier * 10) / 10 : undefined,
    sodium: food.sodium ? Math.round(food.sodium * multiplier) : undefined
  }
}
