"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Zap, Clock, Gift } from "lucide-react"

interface AutoPopupProps {
  onScrollToForm: () => void
}

export default function AutoPopup({ onScrollToForm }: AutoPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    if (hasShown) return

    const timer = setTimeout(() => {
      setIsOpen(true)
      setHasShown(true)
    }, 30000) // 30 seconds

    return () => clearTimeout(timer)
  }, [hasShown])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleGetStarted = () => {
    setIsOpen(false)
    onScrollToForm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md p-0 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-cyan-500 to-green-500 p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Wait! Don't Miss Out!</h3>
            <p className="text-white/90">Your coding journey is just one click away</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold text-white mb-3">
              🚀 Ready to{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                Transform Your Career?
              </span>
            </h4>
            <p className="text-gray-300 leading-relaxed">
              Join 500+ successful developers who landed their dream jobs. Get your FREE consultation and start your
              coding journey today!
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-gray-300">Learn from Google Engineer</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-gray-300">Get job-ready in 3-6 months</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Gift className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-gray-300">FREE first lesson access</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleGetStarted}
              className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white py-3 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Yes, Get My Free Consultation!
            </Button>
            <Button onClick={handleClose} variant="ghost" className="w-full text-gray-400 hover:text-white py-2">
              Maybe later
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            ⏰ Limited time: Free consultation available for the next 24 hours
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
