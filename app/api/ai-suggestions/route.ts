import { NextRequest, NextResponse } from 'next/server'
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference"
import { AzureKeyCredential } from "@azure/core-auth"

const token = process.env["GITHUB_TOKEN"]
const endpoint = "https://models.github.ai/inference"
const model = "openai/gpt-4o"

export async function POST(request: NextRequest) {
  try {
    const { userHistory, preferences } = await request.json()

    if (!userHistory || !Array.isArray(userHistory)) {
      return NextResponse.json({ error: 'Invalid user history' }, { status: 400 })
    }

    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token),
    )

    const systemPrompt = `You are an AI nutritionist for Kalorie AI. Based on the user's meal history and preferences, provide personalized meal suggestions and healthier alternatives.

User's meal history: ${JSON.stringify(userHistory)}
User preferences: ${preferences || 'No specific preferences mentioned'}

Provide 3-5 meal suggestions that are:
1. Nutritionally balanced
2. Realistic and practical
3. Consider cultural preferences (Indian foods preferred)
4. Include approximate calorie counts
5. Suggest healthier alternatives to current eating patterns

Format your response as a JSON object with this structure:
{
  "suggestions": [
    {
      "meal": "Meal name",
      "description": "Brief description",
      "calories": 450,
      "benefits": "Health benefits"
    }
  ],
  "alternatives": [
    {
      "original": "Original food",
      "alternative": "Healthier alternative",
      "calorieSavings": 150,
      "reason": "Why this is better"
    }
  ]
}`

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Generate personalized meal suggestions and healthier alternatives based on my eating history." }
        ],
        model: model,
        temperature: 0.7,
        max_tokens: 1000
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
        suggestions: [
          {
            meal: "Grilled Chicken Salad",
            description: "Fresh greens with grilled chicken and light dressing",
            calories: 350,
            benefits: "High protein, low calorie, nutrient-rich"
          }
        ],
        alternatives: [
          {
            original: "Fried foods",
            alternative: "Grilled or baked options",
            calorieSavings: 200,
            reason: "Reduces unhealthy fats while maintaining flavor"
          }
        ]
      })
    }

  } catch (error) {
    console.error('Error generating AI suggestions:', error)
    return NextResponse.json({ error: 'Failed to generate suggestions' }, { status: 500 })
  }
}
