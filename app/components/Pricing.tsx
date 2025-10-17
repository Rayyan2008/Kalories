"use client"

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const plans = [
  {
    name: "Free",
    price: "Free",
    period: "",
    features: [
      "Unlimited meal logging",
      "Basic calorie tracking",
      "Daily progress charts",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "₹999",
    period: "/month",
    features: [
      "Everything in Free",
      "AI-powered meal analysis",
      "Advanced nutrition insights",
      "Calendar view",
      "Priority support",
    ],
  },
  {
    name: "Premium",
    price: "₹1499",
    period: "/month",
    features: [
      "Everything in Pro",
      "Personal AI trainer",
      "Custom meal recommendations",
      "Health goal tracking",
      "24/7 premium support",
    ],
  },
];

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (plan: string) => {
    if (plan === 'free') {
      // Handle free plan - maybe redirect to dashboard
      window.location.href = '/dashboard';
      return;
    }

    setLoading(plan);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      });

      const { orderId, amount, currency } = await response.json();

      if (orderId) {
        // Initialize Razorpay
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount,
          currency: currency,
          name: 'Kalorie.ai',
          description: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan Subscription`,
          order_id: orderId,
          handler: function (response: any) {
            // Handle successful payment
            console.log('Payment successful:', response);
            window.location.href = '/dashboard?success=true';
          },
          prefill: {
            name: '',
            email: '',
            contact: '',
          },
          theme: {
            color: '#3b82f6',
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
                index === 1
                  ? "bg-primary text-primary-foreground border-2 border-primary"
                  : "bg-card/50 backdrop-blur-sm border border-border/50"
              }`}
            >
              <h3 className="text-2xl font-bold mb-4">
                {plan.name}
              </h3>
              <p className="text-4xl font-bold mb-6">
                {plan.price}
                <span className="text-lg font-normal opacity-80">
                  {plan.period}
                </span>
              </p>
              <ul className="mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mb-2">
                    <Check className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={index === 1 ? "secondary" : index === 0 ? "outline" : "default"}
                onClick={() => handleSubscribe(plan.name.toLowerCase())}
                disabled={loading === plan.name.toLowerCase()}
              >
                {loading === plan.name.toLowerCase()
                  ? "Processing..."
                  : index === 0
                  ? "Get Started"
                  : index === 1
                  ? "Upgrade to Pro"
                  : "Start Premium"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
