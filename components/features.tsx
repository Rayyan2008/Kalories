import { Brain, Cloud, Shield, Zap } from "lucide-react"

const features = [
  {
    name: "🗓 Calendar View",
    description: "to track daily, weekly, and monthly food logs.",
    icon: Brain,
  },
  {
    name: "📊 Progress Tracker",
    description: "visual graphs to show calorie intake trends and health goals.",
    icon: Cloud,
  },
  {
    name: "💡 AI Suggestions Page",
    description: "gives personalized meal recommendations and healthier alternatives.",
    icon: Shield,
  },
  {
    name: "🧠 AI Trainer",
    description: "offers fitness and diet guidance based on user history.",
    icon: Zap,
  },
]

export default function Features() {
  return (
    <section id="features" className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Powerful Features</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Explore the features that make Kalorie AI your ultimate health companion.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.name} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8" />
              <h3 className="font-bold">{feature.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
