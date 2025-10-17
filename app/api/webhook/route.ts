import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const razorpaySecret = process.env.RAZORPAY_KEY_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-razorpay-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', razorpaySecret)
      .update(body)
      .digest('hex')

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)

    // Handle the event
    switch (event.event) {
      case 'payment.captured':
        const payment = event.payload.payment.entity
        // TODO: Update user subscription status in database
        console.log('Payment was successful!', payment)
        break
      case 'payment.failed':
        // TODO: Handle failed payment
        console.log('Payment failed', event.payload.payment.entity)
        break
      case 'subscription.activated':
        // TODO: Handle subscription activation
        console.log('Subscription activated', event.payload.subscription.entity)
        break
      default:
        console.log(`Unhandled event type ${event.event}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
