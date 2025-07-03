"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "How does the FREE first lesson work?",
      answer:
        "Simply link your card to get instant access to your first lesson completely FREE. No upfront payment required. If you decide to continue after the first lesson, you'll be charged the full course price (Java: $249, JavaScript: $299, Python: $229). If you don't want to continue, just cancel - no charges at all.",
    },
    {
      question: "Why do you need my card information?",
      answer:
        "We securely store your card information to make it seamless for you to continue with the full course if you love the first lesson. This eliminates the need to re-enter payment details later. Your card is never charged until you explicitly decide to continue.",
    },
    {
      question: "What if I have no programming experience?",
      answer:
        "Perfect! Our courses are designed for complete beginners. We start with the absolute basics and gradually build up your skills. Many of our most successful graduates started with zero coding experience.",
    },
    {
      question: "How long does it take to complete the program?",
      answer:
        "Most students complete our intensive program in 3-6 months, depending on their pace and time commitment. We recommend dedicating 10-15 hours per week for optimal results.",
    },
    {
      question: "What's included in the full course price?",
      answer:
        "The full course includes lifetime access to all video lessons, downloadable resources, project files, 1-on-1 mentoring sessions, career guidance, job placement assistance, and access to our private community of developers.",
    },
    {
      question: "Do you provide job placement assistance?",
      answer:
        "Yes! We offer comprehensive career support including resume optimization, portfolio review, interview preparation, and direct connections to our network of hiring partners.",
    },
    {
      question: "Is my card information secure?",
      answer:
        "We use bank-level encryption to protect your card information. We're PCI DSS compliant and never store your full card details. Your information is processed through secure payment gateways.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes! You can cancel anytime before deciding to continue with the full course. If you cancel after the first lesson, there are no charges. Even after purchasing the full course, we offer a 30-day money-back guarantee.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gray-800/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-gray-300">Everything you need to know about RageCodeMaster Pro</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-700/50 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-800/30 transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="mailto:support@ragecodemasterpro.com"
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-300"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  )
}
