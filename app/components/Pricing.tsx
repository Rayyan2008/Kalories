import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    price: "$9.99",
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
    price: "$14.99",
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
  return (
    <section id="pricing" className="py-20 bg-background relative">
      {/* Background gradients to match landing page */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 h-[300px] w-[300px] bg-blue-500/5 blur-[80px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] bg-purple-500/5 blur-[80px]" />
      </div>
      <div className="container mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">
                {plan.name}
              </h3>
              <p className="text-4xl font-bold mb-6 text-card-foreground">
                {plan.price}
                <span className="text-lg font-normal text-muted-foreground">
                  {plan.period}
                </span>
              </p>
              <ul className="mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mb-2">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span className="text-card-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={index === 1 ? "default" : "outline"}
              >
                {index === 0 ? "Get Started" : index === 2 ? "Start Premium" : "Upgrade to Pro"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
