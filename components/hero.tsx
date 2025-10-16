import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import BetaSignupModal from "@/components/beta-signup-modal"

export default function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
      <div className="space-y-4">
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Smart Calorie & Diet Tracker
          <br />
          with Kalorie AI
        </h1>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Kalorie AI is a modern health companion that lets users log their meals in a simple notepad-style interface. As users type in the food they ate (e.g., "½ McAloo Tikki Burger"), the app instantly displays the estimated calorie count and nutritional breakdown on the right side.
        </p>
      </div>
      <div className="flex gap-4">
        <BetaSignupModal>
          <Button size="lg">
            Join Beta
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </BetaSignupModal>
        <BetaSignupModal>
          <Button variant="outline" size="lg">
            Get Started
          </Button>
        </BetaSignupModal>
      </div>
    </section>
  )
}
