import { NextRequest, NextResponse } from 'next/server'
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference"
import { AzureKeyCredential } from "@azure/core-auth"

const token = process.env["GITHUB_TOKEN"]
const endpoint = "https://models.github.ai/inference"
const model = "openai/gpt-4o"

export async function POST(request: NextRequest) {
  try {
    const { userHistory, goals, fitnessLevel } = await request.json()

    if (!userHistory || !Array.isArray(userHistory)) {
      return NextResponse.json({ error: 'Invalid user history' }, { status: 400 })
    }

    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token),
    )

    const systemPrompt = `You are an AI fitness trainer for Kalorie AI. Based on the user's meal history, goals, and fitness level, provide personalized fitness and diet guidance.

User's meal history: ${JSON.stringify(userHistory)}
User goals: ${goals || 'General health and fitness'}
Fitness level: ${fitnessLevel || 'Beginner'}

Provide comprehensive guidance that includes:
1. Exercise recommendations based on their current diet
2. Diet adjustments for better fitness results
3. Weekly workout plan
4. Nutrition timing advice
5. Motivation and tips for consistency

Format your response as a JSON object with this structure:
{
  "workoutPlan": [
    {
      "day": "Monday",
      "focus": "Upper body strength",
      "exercises": ["Push-ups", "Dumbbell rows", "Plank"],
      "duration": "45 minutes",
      "caloriesBurn": 300
    }
  ],
  "dietAdvice": [
    {
      "category": "Pre-workout nutrition",
      "recommendation": "Eat a balanced meal 2-3 hours before exercise",
      "examples": ["Oatmeal with banana", "Greek yogurt with nuts"]
    }
  ],
  "tips": [
    "Stay hydrated throughout your workout",
    "Track your progress weekly",
    "Rest when needed to avoid injury"
  ],
  "motivation": "Remember that consistency is key to achieving your fitness goals!"
}`

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Create a personalized fitness and diet plan based on my eating history and goals." }
        ],
        model: model,
        temperature: 0.7,
        max_tokens: 1500
      }
    })

    if (isUnexpected(response)) {
      throw response.body.error
    }

    const aiResponse = response.body.choices[0].message.content

    if (!aiResponse) {
      throw new Error('No response from AI')
    }

    try {
      const parsedResponse = JSON.parse(aiResponse)
      return NextResponse.json(parsedResponse)
    } catch (parseError) {
      // If AI response isn't valid JSON, return a fallback
      return NextResponse.json({
        workoutPlan: [
          {
            day: "Monday",
            focus: "Full body workout",
            exercises: ["Squats", "Push-ups", "Walking"],
            duration: "30 minutes",
            caloriesBurn: 200
          }
        ],
        dietAdvice: [
          {
            category: "Meal timing",
            recommendation: "Eat every 3-4 hours to maintain energy levels",
            examples: ["Include protein in every meal", "Add vegetables to each plate"]
          }
        ],
        tips: [
          "Start with shorter workouts and gradually increase duration",
          "Combine cardio with strength training",
          "Listen to your body and rest when needed"
        ],
        motivation: "Every step counts towards your health goals!"
      })
    }

  } catch (error) {
    console.error('Error generating AI trainer guidance:', error)
    return NextResponse.json({ error: 'Failed to generate trainer guidance' }, { status: 500 })
  }
}
