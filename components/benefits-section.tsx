import { Clock, Users, Award, Briefcase, Code2, Rocket } from "lucide-react"

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Clock,
      title: "Lightning Fast Results",
      description:
        "Get job-ready in 3-6 months with our intensive, focused curriculum designed for rapid skill acquisition.",
    },
    {
      icon: Award,
      title: "Learn from Bogdan Stashchuk",
      description:
        "Get mentored by a former Google Senior Engineer with 15+ years of experience, bringing real-world industry knowledge to every lesson.",
    },
    {
      icon: Code2,
      title: "Modern Tech Stack",
      description: "Master JavaScript, React, and Python - the most in-demand technologies in today's job market.",
    },
    {
      icon: Briefcase,
      title: "Portfolio Projects",
      description: "Build 5+ real-world projects that showcase your skills to potential employers and clients.",
    },
    {
      icon: Users,
      title: "Personalized Mentoring",
      description: "Get 1-on-1 code reviews and career guidance to accelerate your learning journey.",
    },
    {
      icon: Rocket,
      title: "Job Placement Support",
      description: "Resume optimization, interview prep, and direct connections to our hiring partner network.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              RageCodeMaster Pro?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We don't just teach code - we build careers. Our proven methodology has helped 500+ students land their
            dream jobs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="bg-gray-900/50 p-8 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className="mb-6">
                  <Icon className="w-12 h-12 text-cyan-400 group-hover:text-green-400 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
