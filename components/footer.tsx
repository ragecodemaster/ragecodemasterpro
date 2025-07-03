import { Code, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Code className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">RageCodeMaster Pro</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Transform your career with intensive programming courses taught by a Google engineer. Join 500+ successful
              graduates who landed their dream jobs.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`/placeholder.svg?height=32&width=32`}
                    alt={`Student ${i}`}
                    className="w-8 h-8 rounded-full border-2 border-gray-900"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">500+ Happy Students</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#courses" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                  Courses
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                  About Instructor
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400" />
                <a
                  href="mailto:support@ragecodemasterpro.com"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  support@ragecodemasterpro.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-400" />
                <a href="tel:+1-555-0123" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                  +1 (555) 012-3456
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 mt-0.5" />
                <span className="text-gray-300">
                  San Francisco, CA
                  <br />
                  United States
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2024 RageCodeMaster Pro. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
              Terms of Service
            </a>
            <a href="/refund" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
