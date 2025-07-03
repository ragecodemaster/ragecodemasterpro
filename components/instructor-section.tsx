import { Award, Users, Code, BookOpen, Star, CheckCircle } from "lucide-react"

export default function InstructorSection() {
  const achievements = [
    "15+ years of software development experience",
    "Former Senior Engineer at Google",
    "500+ successful students placed in top companies",
    "Expert in JavaScript, React, Python, and modern web technologies",
    "Published author of programming courses with 100k+ students",
    "Mentored developers now working at FAANG companies",
  ]

  const stats = [
    { number: "15+", label: "Years Experience" },
    { number: "500+", label: "Students Placed" },
    { number: "100k+", label: "Course Students" },
    { number: "4.9/5", label: "Average Rating" },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-800/50 to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Your{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Instructor
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Learn from a seasoned professional who has walked the path from beginner to Google engineer
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Instructor Photo and Info */}
          <div className="text-center lg:text-left">
            <div className="relative inline-block mb-8">
              <div className="w-64 h-64 rounded-full mx-auto lg:mx-0 border-4 border-cyan-500/30 shadow-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                <img
                  src="/images/bogdan-stashchuk-hq.jpg"
                  alt="Bogdan Stashchuk - Lead Instructor"
                  className="w-full h-full object-cover object-center filter brightness-110 contrast-110 saturate-110 hover:scale-105 transition-all duration-500"
                  style={{
                    imageRendering: "crisp-edges",
                    filter: "brightness(1.1) contrast(1.1) saturate(1.1) sharpen(1px)",
                  }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full p-3 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>

              {/* Quality enhancement overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/5 pointer-events-none" />
            </div>

            <h3 className="text-3xl font-bold text-white mb-2">Bogdan Stashchuk</h3>
            <p className="text-xl text-cyan-400 mb-4">Founder & Lead Instructor</p>
            <p className="text-lg text-green-400 mb-6">Former Senior Engineer at Google</p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-800/50 px-4 py-3 rounded-lg border border-gray-700/50">
                  <div className="text-2xl font-bold text-cyan-400">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-500/20">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                <span className="text-yellow-400 font-semibold ml-2">4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Achievements and Experience */}
          <div>
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-700/50">
              <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Code className="w-8 h-8 text-cyan-400" />
                Experience & Achievements
              </h4>

              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300 leading-relaxed">{achievement}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-green-500/10 rounded-xl border border-cyan-500/20">
                <blockquote className="text-gray-300 italic text-lg leading-relaxed">
                  "My mission is to bridge the gap between academic learning and real-world industry requirements. I've
                  seen what it takes to succeed at top tech companies, and I'm here to guide you on that journey."
                </blockquote>
                <cite className="text-cyan-400 font-semibold mt-4 block">- Bogdan Stashchuk</cite>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gray-800/30 p-8 rounded-2xl border border-gray-700/50 max-w-4xl mx-auto">
            <h4 className="text-2xl font-bold text-white mb-4">Ready to Learn from a Google Engineer?</h4>
            <p className="text-gray-300 mb-6 text-lg">
              Join hundreds of successful developers who transformed their careers under Bogdan's mentorship
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 text-green-400">
                <Users className="w-5 h-5" />
                <span className="font-semibold">500+ Students Placed</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400">
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">Industry-Proven Curriculum</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
