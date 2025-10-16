"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ProfileData {
  age: number
  gender: 'male' | 'female'
  currentWeight: number
  targetWeight: number
  height?: number
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active'
}

interface CalorieGoals {
  dailyMaintenance: number
  dailyDeficit: number
  weeklyGoal: number
  monthlyGoal: number
}

export default function ProfileSetupModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [profileData, setProfileData] = useState<ProfileData>({
    age: 25,
    gender: 'male',
    currentWeight: 70,
    targetWeight: 65,
    height: 170,
    activityLevel: 'moderately_active'
  })

  const [calorieGoals, setCalorieGoals] = useState<CalorieGoals | null>(null)

  // Calculate BMR using Mifflin-St Jeor Equation
  const calculateBMR = (age: number, gender: string, weight: number, height: number) => {
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161
    }
  }

  // Calculate TDEE based on activity level
  const calculateTDEE = (bmr: number, activityLevel: string) => {
    const multipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extremely_active: 1.9
    }
    return bmr * multipliers[activityLevel as keyof typeof multipliers]
  }

  // Calculate calorie goals
  const calculateGoals = () => {
    const bmr = calculateBMR(profileData.age, profileData.gender, profileData.currentWeight, profileData.height || 170)
    const tdee = calculateTDEE(bmr, profileData.activityLevel)

    const dailyMaintenance = Math.round(tdee)
    const dailyDeficit = Math.round(tdee - 500) // 500 calorie deficit for weight loss
    const weeklyGoal = dailyDeficit * 7
    const monthlyGoal = dailyDeficit * 30

    return {
      dailyMaintenance,
      dailyDeficit,
      weeklyGoal,
      monthlyGoal
    }
  }

  useEffect(() => {
    if (profileData.age && profileData.currentWeight && profileData.targetWeight) {
      setCalorieGoals(calculateGoals())
    }
  }, [profileData])

  const handleSave = () => {
    const goals = calculateGoals()
    const profileWithGoals = {
      ...profileData,
      calorieGoals: goals,
      setupCompleted: true
    }

    localStorage.setItem("kalorie-profile", JSON.stringify(profileWithGoals))
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Set Up Your Profile</DialogTitle>
          <DialogDescription>
            Help us calculate your personalized calorie goals for better results.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={profileData.age}
                onChange={(e) => setProfileData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={profileData.gender} onValueChange={(value: 'male' | 'female') => setProfileData(prev => ({ ...prev, gender: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentWeight">Current Weight (kg)</Label>
              <Input
                id="currentWeight"
                type="number"
                step="0.1"
                value={profileData.currentWeight}
                onChange={(e) => setProfileData(prev => ({ ...prev, currentWeight: parseFloat(e.target.value) || 0 }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetWeight">Target Weight (kg)</Label>
              <Input
                id="targetWeight"
                type="number"
                step="0.1"
                value={profileData.targetWeight}
                onChange={(e) => setProfileData(prev => ({ ...prev, targetWeight: parseFloat(e.target.value) || 0 }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={profileData.height}
                onChange={(e) => setProfileData(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activityLevel">Activity Level</Label>
              <Select value={profileData.activityLevel} onValueChange={(value: ProfileData['activityLevel']) => setProfileData(prev => ({ ...prev, activityLevel: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                  <SelectItem value="lightly_active">Lightly active (light exercise 1-3 days/week)</SelectItem>
                  <SelectItem value="moderately_active">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                  <SelectItem value="very_active">Very active (hard exercise 6-7 days/week)</SelectItem>
                  <SelectItem value="extremely_active">Extremely active (very hard exercise & physical job)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {calorieGoals && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Your Calorie Goals</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Daily Maintenance</p>
                  <p className="font-medium">{calorieGoals.dailyMaintenance} cal</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Daily for Weight Loss</p>
                  <p className="font-medium">{calorieGoals.dailyDeficit} cal</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Weekly Goal</p>
                  <p className="font-medium">{calorieGoals.weeklyGoal} cal</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Monthly Goal</p>
                  <p className="font-medium">{calorieGoals.monthlyGoal} cal</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
