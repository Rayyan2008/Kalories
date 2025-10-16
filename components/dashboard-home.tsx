"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, BarChart3, Brain, Dumbbell, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const dashboardOptions = [
  {
    title: "📅 Calendar View",
    description: "Track daily, weekly, and monthly food logs with an intuitive calendar interface.",
    icon: Calendar,
    href: "/calendar",
    available: true,
  },
  {
    title: "📊 Progress Tracker",
    description: "Visual graphs to show calorie intake trends and health goals progress.",
    icon: BarChart3,
    href: "/progress",
    available: false,
  },
  {
    title: "💡 AI Suggestions",
    description: "Get personalized meal recommendations and healthier alternatives based on your habits.",
    icon: Brain,
    href: "/ai-suggestions",
    available: false,
  },
  {
    title: "🧠 AI Trainer",
    description: "Offers fitness and diet guidance based on user history and goals.",
    icon: Dumbbell,
    href: "/ai-trainer",
    available: false,
  },
]

export default function DashboardHome() {
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("kalorie-auth")
    if (!auth) {
      router.push("/login")
      return
    }
  }, [router])

  return (
    <div className="relative min-h-screen">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="font-bold text-xl">Kalorie AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/tracker">
                <Button variant="outline" size="sm">
                  Tracker
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  localStorage.removeItem("kalorie-auth")
                  localStorage.removeItem("kalorie-meals")
                  router.push("/")
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </header>

        <section className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
          <div className="space-y-4">
            <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome to Kalorie AI
            </h1>
            <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Your personal health companion. Choose from our powerful features to track your nutrition and achieve your fitness goals.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-4xl w-full">
            {dashboardOptions.map((option) => (
              <Card key={option.title} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <option.icon className="h-8 w-8 text-primary" />
                    <CardTitle className="text-left">{option.title}</CardTitle>
                  </div>
                  <CardDescription className="text-left">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {option.available ? (
                    <Link href={option.href}>
                      <Button className="w-full">
                        Open
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button disabled className="w-full">
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
                {!option.available && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                      Soon
                    </span>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="pt-8">
            <Link href="/tracker">
              <Button size="lg" variant="outline">
                Go to Tracker
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
