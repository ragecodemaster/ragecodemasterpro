"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Code, Zap, Trophy } from "lucide-react"
import PaymentModal from "./payment-modal"

interface HeroSectionProps {
  onScrollToForm: () => void
}

export default function HeroSection({ onScrollToForm }: HeroSectionProps) {
  const [showPayment, setShowPayment] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-90" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Main heading */}
        <div className="mb-8">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Code className="w-8 h-8 text-cyan-400" />
            <span className="text-cyan-400 font-semibold text-lg">RageCodeMaster Pro</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Become a{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              In-Demand Developer
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Build your portfolio and land your first job with our intensive JavaScript React & Python courses. Taught by{" "}
            <span className="text-cyan-400 font-semibold">Bogdan Stashchuk</span>, a senior engineer with 15+ years of
            experience and former Google developer.
          </p>
        </div>

        {/* Key benefits */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full border border-cyan-500/20">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium">Fast-Track Learning</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full border border-green-500/20">
            <Trophy className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium">Google Engineer Instructor</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full border border-purple-500/20">
            <Code className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium">Real Portfolio Projects</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => setShowPayment(true)}
            data-payment-trigger
            className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
          >
            Start First Lesson FREE
          </Button>

          <Button
            onClick={onScrollToForm}
            variant="outline"
            className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 bg-transparent"
          >
            Get Free Consultation
          </Button>
        </div>

        <p className="text-sm text-gray-400 mt-4">🆓 First lesson completely FREE • No upfront payment required</p>
      </div>

      <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} />
    </section>
  )
}
