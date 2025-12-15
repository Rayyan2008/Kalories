import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    const userId = (session?.user as any)?.id
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = params
    const meal = await prisma.meal.findUnique({ where: { id }, include: { items: true } })
    if (!meal || meal.userId !== userId) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json(meal)
  } catch (error) {
    console.error('Error fetching meal:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    const userId = (session?.user as any)?.id
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = params
    const body = await request.json()

    const updated = await prisma.meal.updateMany({
      where: { id, userId },
      data: {
        text: body.text,
        calories: body.calories,
        protein: body.protein,
        carbs: body.carbs,
        fat: body.fat,
        date: body.date ? new Date(body.date) : undefined,
      },
    })

    if (updated.count === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const meal = await prisma.meal.findUnique({ where: { id }, include: { items: true } })
    return NextResponse.json(meal)
  } catch (error) {
    console.error('Error updating meal:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    const userId = (session?.user as any)?.id
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = params

    // delete meal items first (cascade might handle it, but be explicit)
    await prisma.mealItem.deleteMany({ where: { mealId: id } })
    const deleted = await prisma.meal.deleteMany({ where: { id, userId } })
    if (deleted.count === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting meal:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
