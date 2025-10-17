import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:py-12">
        <div className="flex-1 space-y-4">
          <h2 className="font-bold">Kalorie AI</h2>
          <p className="text-sm text-muted-foreground">Your smart companion for calorie tracking and healthy living.</p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Features</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/calendar" className="text-muted-foreground transition-colors hover:text-primary">
                  Calendar View
                </Link>
              </li>
              <li>
                <Link href="/progress" className="text-muted-foreground transition-colors hover:text-primary">
                  Progress Tracker
                </Link>
              </li>
              <li>
                <Link href="/ai-suggestions" className="text-muted-foreground transition-colors hover:text-primary">
                  AI Suggestions
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground transition-colors hover:text-primary">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground transition-colors hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="text-muted-foreground transition-colors hover:text-primary">
                  Refunds
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground transition-colors hover:text-primary">
                  Shipping
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/kalorieai"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://twitter.com/kalorieai"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://linkedin.com/company/kalorieai"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container border-t py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Kalorie AI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
