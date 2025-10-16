import { Button } from "@/components/ui/button"
import BetaSignupModal from "@/components/beta-signup-modal"

export default function CTA() {
  return (
    <section className="border-t">
      <div className="container flex flex-col items-center gap-4 py-24 text-center md:py-32">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Ready to transform your health journey?
        </h2>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Join thousands of users who are already tracking their calories smarter with Kalorie AI. Start your beta access today and take control of your nutrition.
        </p>
        <BetaSignupModal>
          <Button size="lg" className="mt-4">
            Join Beta Now
          </Button>
        </BetaSignupModal>
      </div>
    </section>
  )
}
