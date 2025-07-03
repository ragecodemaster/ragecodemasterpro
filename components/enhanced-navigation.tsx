"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Code, Menu, X } from "lucide-react"

interface EnhancedNavigationProps {
  onScrollToForm: () => void
}

// Add this right after the interface declaration
const typingStyles = `
  @keyframes typing {
    from { width: 0 }
    to { width: 15ch }
  }
`

export default function EnhancedNavigation({ onScrollToForm }: EnhancedNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [logoKey, setLogoKey] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = ["hero", "courses", "instructor", "testimonials", "faq"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      const startPosition = window.pageYOffset
      const distance = offsetPosition - startPosition
      const duration = 1000 // 1 second
      let start: number | null = null

      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = timestamp - start
        const progressPercentage = Math.min(progress / duration, 1)

        // Easing function for smooth animation
        const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1)

        const easedProgress = easeInOutCubic(progressPercentage)

        window.scrollTo(0, startPosition + distance * easedProgress)

        if (progress < duration) {
          window.requestAnimationFrame(step)
        }
      }

      window.requestAnimationFrame(step)
    }
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "Courses", id: "courses" },
    { label: "Instructor", id: "instructor" },
    { label: "Reviews", id: "testimonials" },
    { label: "FAQ", id: "faq" },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: typingStyles }} />
      <nav
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-gray-900/95 backdrop-blur-md border border-gray-700/50 shadow-2xl shadow-cyan-500/10 scale-95"
            : "bg-gray-900/80 backdrop-blur-sm border border-gray-700/30 scale-100"
        } rounded-2xl px-6 py-3`}
        style={{ width: "calc(100% - 2rem)", maxWidth: "1200px" }}
      >
        <div className="flex items-center justify-between">
          {/* Logo with animation */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              scrollToSection("hero")
              setLogoKey((prev) => prev + 1) // Trigger re-animation
            }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-green-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12">
                <Code className="w-6 h-6 text-white" />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-green-500 rounded-xl blur-md opacity-0 hover:opacity-30 transition-opacity duration-300 -z-10" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center">
                <div className="flex items-center">
                  <span
                    className="text-white font-bold text-lg inline-block overflow-hidden whitespace-nowrap"
                    style={{
                      width: logoKey % 2 === 0 ? "0" : "auto",
                      animation: logoKey % 2 === 0 ? "typing 2.5s ease-out forwards" : "none",
                    }}
                    key={logoKey}
                  >
                    RageCodeMaster
                  </span>
                  <span
                    className="text-cyan-400 font-bold text-lg animate-bounce"
                    style={{
                      opacity: logoKey % 2 === 0 ? "0" : "1",
                      animation: logoKey % 2 === 0 ? "none" : "bounce 1s infinite",
                      transition: "opacity 0.3s ease-in-out",
                      transitionDelay: logoKey % 2 === 0 ? "2.5s" : "0s",
                    }}
                    key={`pro-${logoKey}`}
                  >
                    Pro
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation with active indicators */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative font-medium transition-all duration-300 px-3 py-2 rounded-lg group ${
                  activeSection === item.id
                    ? "text-cyan-400 bg-cyan-500/10"
                    : "text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50"
                }`}
              >
                {item.label}
                {/* Active indicator */}
                <span
                  className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-green-400 transition-all duration-300 ${
                    activeSection === item.id ? "w-6" : "w-0 group-hover:w-6"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* CTA Button with enhanced effects */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={() => {
                // Find and trigger payment modal instead of scrolling to form
                const heroSection = document.querySelector("[data-payment-trigger]") as HTMLButtonElement
                if (heroSection) {
                  heroSection.click()
                }
              }}
              className="relative bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-cyan-400 transition-all duration-300 p-2 rounded-lg hover:bg-gray-800/50"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left py-3 px-4 rounded-lg transition-all duration-300 font-medium ${
                    activeSection === item.id
                      ? "text-cyan-400 bg-cyan-500/10 border-l-2 border-cyan-400"
                      : "text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => {
                  // Find and trigger payment modal instead of scrolling to form
                  const heroSection = document.querySelector("[data-payment-trigger]") as HTMLButtonElement
                  if (heroSection) {
                    heroSection.click()
                  }
                  setIsMobileMenuOpen(false)
                }}
                className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 mt-4"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-20" />
    </>
  )
}
