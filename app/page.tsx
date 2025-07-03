"use client"

import { useRef } from "react"
import EnhancedNavigation from "@/components/enhanced-navigation"
import HeroSection from "@/components/hero-section"
import BenefitsSection from "@/components/benefits-section"
import CoursesSection from "@/components/courses-section"
import InstructorSection from "@/components/instructor-section"
import StepsSection from "@/components/steps-section"
import TestimonialsSection from "@/components/testimonials-section"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import Preloader from "@/components/preloader"
import EnhancedLeadForm from "@/components/enhanced-lead-form"
import AutoPopup from "@/components/auto-popup"

export default function HomePage() {
  const leadFormRef = useRef<HTMLDivElement>(null)

  const scrollToForm = () => {
    leadFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }

  return (
    <>
      <Preloader />
      <div className="min-h-screen bg-gray-900 text-white">
        <EnhancedNavigation onScrollToForm={scrollToForm} />

        <section id="hero">
          <HeroSection onScrollToForm={scrollToForm} />
        </section>

        <BenefitsSection />

        <section id="courses">
          <CoursesSection onScrollToForm={scrollToForm} />
        </section>

        <section id="instructor">
          <InstructorSection />
        </section>

        <StepsSection onScrollToForm={scrollToForm} />

        {/* Enhanced Lead Form Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-green-500/5" />
          <div className="max-w-2xl mx-auto relative z-10">
            <EnhancedLeadForm ref={leadFormRef} />
          </div>
        </section>

        <section id="testimonials">
          <TestimonialsSection />
        </section>

        <section id="faq">
          <FAQSection />
        </section>

        <Footer />

        <AutoPopup onScrollToForm={scrollToForm} />
      </div>
    </>
  )
}
