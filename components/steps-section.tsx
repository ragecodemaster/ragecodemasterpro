"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreditCard, BookOpen, Trophy } from "lucide-react"
import PaymentModal from "./payment-modal"

interface StepsSectionProps {
  onScrollToForm: () => void
}

export default function StepsSection({ onScrollToForm }: StepsSectionProps) {
  const [showPayment, setShowPayment] = useState(false)

  const steps = [
    {
      number: "01",
      icon: CreditCard,
      title: "Link Your Card",
      description: "Securely link your card and get instant access to your first lesson completely FREE.",
      action: "Start FREE",
      isPrimary: true,
    },
    {
      number: "02",
      icon: BookOpen,
      title: "Master the Fundamentals",
      description: "Build solid foundations in JavaScript, React, and Python through hands-on projects.",
      action: "Learn More",
      isPrimary: false,
    },
    {
      number: "03",
      icon: Trophy,
      title: "Land Your Dream Job",
      description: "Complete your portfolio, ace interviews, and get hired with our job placement support.",
      action: "Get Started",
      isPrimary: false,
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Elite Developers
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Follow our proven 3-step process that has transformed beginners into professional developers
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent z-0" />
              )}

              <div className="relative z-10 bg-gray-900/80 p-8 rounded-2xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {step.number}
                </div>

                <div className="mb-6 pt-4">
                  {(() => {
                    const Icon = step.icon
                    return (
                      <Icon className="w-16 h-16 text-cyan-400 group-hover:text-green-400 transition-colors duration-300" />
                    )
                  })()}
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {step.title}
                </h3>

                <p className="text-gray-300 mb-8 leading-relaxed">{step.description}</p>

                <Button
                  onClick={() => {
                    if (step.isPrimary) {
                      setShowPayment(true)
                    } else {
                      onScrollToForm()
                    }
                  }}
                  className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 ${
                    step.isPrimary
                      ? "bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white shadow-lg hover:shadow-cyan-500/25"
                      : "bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600 hover:border-cyan-500/50"
                  }`}
                >
                  {step.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} />
    </section>
  )
}
