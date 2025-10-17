import { Button } from "@/components/ui/button"
import Link from "next/link"
import BetaSignupModal from "@/components/beta-signup-modal"

export default function CTA() {
  return (
    <section className="border-t">
      <div className="container flex flex-col items-center gap-4 py-24 text-center md:py-32">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Ready to transform your health journey?
        </h2>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          The landing page should look sleek and modern, with a hero section explaining the main feature (type → see calories), followed by feature sections, screenshots/mockups, testimonials, and a CTA (Join Beta / Get Started).
        </p>
        <div className="flex gap-4">
          <Link href="/login">
            <Button size="lg" className="mt-4">
              Join Beta Now
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="mt-4">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
