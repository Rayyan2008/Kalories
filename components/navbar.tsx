"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import BetaSignupModal from "@/components/beta-signup-modal"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("kalorie-auth")
      setIsLoggedIn(auth ? JSON.parse(auth).isLoggedIn : false)
    }

    checkAuth()
    window.addEventListener("storage", checkAuth)
    return () => window.removeEventListener("storage", checkAuth)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("kalorie-auth")
    localStorage.removeItem("kalorie-meals")
    setIsLoggedIn(false)
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href={isLoggedIn ? "/dashboard" : "/"} className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Kalorie AI</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          {!isLoggedIn && (
            <>
              <Link href="#features" className="transition-colors hover:text-primary">
                Features
              </Link>
              <Link href="#about" className="transition-colors hover:text-primary">
                About
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <Link href="/tracker" className="transition-colors hover:text-primary">
                Tracker
              </Link>
            </>
          )}
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="https://github.com/kalorieai" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          {!isLoggedIn && (
            <>
              <Link href="/contact">
                <Button variant="ghost" size="sm">
                  Contact
                </Button>
              </Link>
              <Link href="/login">
                <Button size="sm">Join Beta</Button>
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
