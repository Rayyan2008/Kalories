import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Basic",
    price: "$4.99",
    period: "/month",
    features: [
      "Unlimited meal logging",
      "Basic calorie tracking",
      "Daily progress charts",
      "Email support"
    ],
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    features: [
      "Everything in Basic",
      "AI-powered meal analysis",
      "Advanced nutrition insights",
      "Calendar view",
      "Priority support"
    ],
  },
  {
    name: "Premium",
    price: "$14.99",
    period: "/month",
    features: [
      "Everything in Pro",
      "Personal AI trainer",
      "Custom meal recommendations",
      "Health goal tracking",
      "24/7 premium support"
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">
                {plan.price}
                <span className="text-lg font-normal text-gray-600">{plan.period}</span>
              </p>
              <ul className="mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mb-2">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                {index === 2 ? "Start Premium" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
