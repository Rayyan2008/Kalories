import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

const plans = {
  pro: {
    name: 'Pro',
    price: 99900, // ₹999 in paisa (₹9.99 * 100)
    description: 'Pro Plan - Monthly Subscription',
  },
  premium: {
    name: 'Premium',
    price: 149900, // ₹1499 in paisa (₹14.99 * 100)
    description: 'Premium Plan - Monthly Subscription',
  },
}

export async function POST(request: NextRequest) {
  try {
    const { plan } = await request.json()

    if (!plans[plan as keyof typeof plans]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const planData = plans[plan as keyof typeof plans]

    const options = {
      amount: planData.price,
      currency: 'INR',
      receipt: `receipt_${plan}_${Date.now()}`,
      notes: {
        plan: plan,
        description: planData.description,
      },
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      plan: plan,
    })
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
