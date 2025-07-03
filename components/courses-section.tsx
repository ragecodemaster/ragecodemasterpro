"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Code, Coffee, Database, Globe, Zap, Star, Clock, Users, CreditCard, CheckCircle } from "lucide-react"
import PaymentModal from "./payment-modal"

interface CoursesSectionProps {
  onScrollToForm: () => void
}

export default function CoursesSection({ onScrollToForm }: CoursesSectionProps) {
  const [showPayment, setShowPayment] = useState(false)

  const courses = [
    {
      id: "java",
      title: "Java - Complete Java Course",
      subtitle: "Master Java Programming from Basics to Advanced",
      description:
        "Learn all key Java features: fundamentals, data types, classes, methods, OOP, collections, exceptions, and generics",
      icon: Coffee,
      color: "from-orange-500 to-red-500",
      borderColor: "border-orange-500/30",
      hoverColor: "hover:border-orange-500/50",
      fullPrice: 249,
      originalPrice: 349,
      features: [
        "Java Fundamentals & Syntax",
        "Object-Oriented Programming",
        "Collections & Data Structures",
        "Exception Handling",
        "Generics & Advanced Topics",
        "Real-world Projects",
      ],
      duration: "40+ hours",
      projects: "8 Projects",
      level: "Beginner to Advanced",
    },
    {
      id: "javascript",
      title: "JavaScript - Web Development Masterclass",
      subtitle: "React and Node.js Complete Guide",
      description:
        "Become a Web Developer with ONE course. HTML, CSS, JavaScript, React, NPM, Node.js, DOM with many Projects and Examples",
      icon: Globe,
      color: "from-yellow-500 to-orange-500",
      borderColor: "border-yellow-500/30",
      hoverColor: "hover:border-yellow-500/50",
      fullPrice: 299,
      originalPrice: 399,
      features: [
        "HTML5 & CSS3 Mastery",
        "Modern JavaScript (ES6+)",
        "React Development",
        "Node.js & NPM",
        "DOM Manipulation",
        "Full-Stack Projects",
      ],
      duration: "50+ hours",
      projects: "12 Projects",
      level: "Beginner to Advanced",
    },
    {
      id: "python",
      title: "Python - Complete Python Course",
      subtitle: "Modern Python Programming Mastery",
      description:
        "Learn and understand all modern Python features that are used most often in practice in this comprehensive Python course",
      icon: Database,
      color: "from-green-500 to-blue-500",
      borderColor: "border-green-500/30",
      hoverColor: "hover:border-green-500/50",
      fullPrice: 229,
      originalPrice: 299,
      features: [
        "Python Fundamentals",
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "File Handling & APIs",
        "Libraries & Frameworks",
        "Data Science Basics",
      ],
      duration: "45+ hours",
      projects: "10 Projects",
      level: "Beginner to Advanced",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Premium Courses
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Master the most in-demand programming languages with comprehensive, hands-on courses designed by industry
            experts
          </p>

          {/* Pricing Model Explanation */}
          <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <CreditCard className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-bold text-green-400">How Our Free Trial Works</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              <span className="text-cyan-400 font-semibold">Link your card and get instant access</span> to your first
              lesson completely FREE. Experience our teaching quality with no upfront payment.
              <span className="text-green-400 font-semibold">
                {" "}
                Only pay the full course price if you decide to continue after the first lesson!
              </span>
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {courses.map((course, index) => {
            const Icon = course.icon
            return (
              <div
                key={course.id}
                className={`bg-gray-900/50 p-8 rounded-2xl border ${course.borderColor} ${course.hoverColor} transition-all duration-300 hover:transform hover:scale-105 group relative overflow-hidden`}
              >
                {/* Background gradient effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  {/* Course Icon */}
                  <div className="mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${course.color} p-4 mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>by</span>
                      <span className="text-cyan-400 font-semibold">Bogdan Stashchuk</span>
                      <span className="text-gray-500">•</span>
                      <span>Software Engineer</span>
                    </div>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="text-lg text-cyan-400 mb-4 font-medium">{course.subtitle}</p>

                  {/* Pricing */}
                  <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Full Course Price:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 line-through text-sm">${course.originalPrice}</span>
                        <span className="text-2xl font-bold text-green-400">${course.fullPrice}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400 font-semibold">First Lesson:</span>
                      <span className="text-xl font-bold text-green-400">FREE</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-400">💡 Just link your card - no upfront payment</div>
                  </div>

                  {/* Course Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed">{course.description}</p>

                  {/* Course Stats */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span className="text-gray-300">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Code className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">{course.projects}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300">{course.level}</span>
                    </div>
                  </div>

                  {/* Course Features */}
                  <div className="mb-8">
                    <h4 className="text-white font-semibold mb-3">What You'll Learn:</h4>
                    <ul className="space-y-2">
                      {course.features.map((feature, featureIndex) => {
                        const Bullet = CheckCircle
                        return (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-300">
                            <Bullet className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                            {feature}
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-yellow-400 font-semibold text-sm">4.9</span>
                    <span className="text-gray-400 text-sm">(2,500+ reviews)</span>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={() => setShowPayment(true)}
                      className={`w-full bg-gradient-to-r ${course.color} hover:opacity-90 text-white py-3 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg`}
                    >
                      Start First Lesson FREE
                    </Button>
                    <Button
                      onClick={onScrollToForm}
                      variant="outline"
                      className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 py-2 text-sm bg-transparent"
                    >
                      Get Free Consultation
                    </Button>
                  </div>

                  <p className="text-xs text-center text-gray-400 mt-2">
                    Full course: ${course.fullPrice} (only if you continue)
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center">
          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-700/50 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Master Programming?</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Link your card and get instant access to any course's first lesson completely FREE
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <div className="flex items-center gap-2 text-green-400">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">Lifetime Access</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400">
                <Code className="w-5 h-5" />
                <span className="font-semibold">30+ Real Projects</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400">
                <Users className="w-5 h-5" />
                <span className="font-semibold">1-on-1 Mentoring</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setShowPayment(true)}
                className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Choose Your Course - Start FREE
              </Button>
              <Button
                onClick={onScrollToForm}
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 bg-transparent"
              >
                Get Free Consultation
              </Button>
            </div>

            <p className="text-sm text-gray-400 mt-4">
              🆓 First lesson FREE • 🔒 Secure card linking • ⚡ Instant access
            </p>
          </div>
        </div>
      </div>

      <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} />
    </section>
  )
}
