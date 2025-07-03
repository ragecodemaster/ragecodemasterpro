"use client"

import { useState, useEffect } from "react"

export default function TestimonialsSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Frontend Developer",
      initials: "SJ",
      text: "Very clear and to the point. I recommend the author's courses to all my friends. My son bought a Python course. I really like it.",
      isShort: true,
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Full Stack Developer",
      initials: "MC",
      text: "Excellent course. Very consistent and detailed material delivery. Thanks to this course, I was able to implement my first Python projects.",
      isShort: false,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Python Developer",
      initials: "ER",
      text: "This is what I wanted. Very balanced and detailed course. Divided into convenient steps for mastering. Enough practice. Effective logic of presentation. The instructor beautifully presents and demonstrates the material, engages with his involvement in the process. Very satisfied with the course.",
      isShort: false,
      isLong: true,
    },
    {
      id: 4,
      name: "David Kim",
      role: "React Developer",
      initials: "DK",
      text: "Amazing course structure and teaching methodology. The projects are real-world applicable and helped me land my current job.",
      isShort: false,
    },
    {
      id: 5,
      name: "Jessica Taylor",
      role: "JavaScript Developer",
      initials: "JT",
      text: "Best investment in my career. The instructor's Google background really shows in the quality of content.",
      isShort: true,
    },
    {
      id: 6,
      name: "Alex Thompson",
      role: "Software Engineer",
      initials: "AT",
      text: "Comprehensive course with excellent practical examples. The step-by-step approach made complex concepts easy to understand. Highly recommend for anyone serious about programming.",
      isShort: false,
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = Number.parseInt(entry.target.getAttribute("data-card-id") || "0")
            setVisibleCards((prev) => [...prev, cardId])
          }
        })
      },
      { threshold: 0.1 },
    )

    const cards = document.querySelectorAll("[data-card-id]")
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  const getCardHeight = (testimonial: (typeof testimonials)[0]) => {
    if (testimonial.isLong) return "h-80"
    if (testimonial.isShort) return "h-48"
    return "h-64"
  }

  const getGridPosition = (index: number) => {
    const positions = [
      "md:col-span-1 md:row-span-1", // Short card
      "md:col-span-1 md:row-span-1", // Medium card
      "md:col-span-1 md:row-span-2", // Long card
      "md:col-span-1 md:row-span-1", // Medium card
      "md:col-span-1 md:row-span-1", // Short card
      "md:col-span-1 md:row-span-1", // Medium card
    ]
    return positions[index] || "md:col-span-1 md:row-span-1"
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 text-transparent bg-clip-text text-sm font-bold uppercase tracking-wider">
              Student Reviews
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Students Share Their{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See what successful students say about transforming their careers with RageCodeMaster Pro
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 auto-rows-max">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              data-card-id={testimonial.id}
              className={`
                ${getGridPosition(index)}
                ${getCardHeight(testimonial)}
                bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 
                hover:border-cyan-500/30 transition-all duration-500 group relative overflow-hidden
                ${visibleCards.includes(testimonial.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                {/* Testimonial text */}
                <div className="flex-1 mb-6">
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">"{testimonial.text}"</p>
                </div>

                {/* Author info */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">{testimonial.initials}</span>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold text-sm md:text-base group-hover:text-cyan-400 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400 text-xs md:text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-8 bg-gray-800/30 px-8 py-6 rounded-2xl border border-gray-700/50">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-sm text-gray-400">Happy Students</div>
            </div>

            <div className="w-px h-12 bg-gray-700" />

            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                4.9/5
              </div>
              <div className="text-sm text-gray-400">Average Rating</div>
            </div>

            <div className="w-px h-12 bg-gray-700" />

            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                150%
              </div>
              <div className="text-sm text-gray-400">Salary Increase</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
