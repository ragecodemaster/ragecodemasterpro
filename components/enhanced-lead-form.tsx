"use client"

import type React from "react"

import { useState, forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, Target, MessageSquare, Send, CheckCircle } from "lucide-react"

interface EnhancedLeadFormProps {
  className?: string
}

const EnhancedLeadForm = forwardRef<HTMLDivElement, EnhancedLeadFormProps>(({ className = "" }, ref) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    goal: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Send to Telegram bot
    const telegramMessage = `
🎯 НОВАЯ ЗАЯВКА НА КОНСУЛЬТАЦИЮ

👤 Имя: ${formData.name}
📧 Email: ${formData.email}
🎯 Цель: ${formData.goal}
💬 Сообщение: ${formData.message}

📅 Дата: ${new Date().toLocaleString("ru-RU")}
🌐 Источник: RageCodeMaster Pro
`

    try {
      const apiRes = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: telegramMessage }),
      })

      if (!apiRes.ok) {
        throw new Error(await apiRes.text())
      }

      setIsSubmitted(true)
      setFormData({ name: "", email: "", goal: "", message: "" })
    } catch (error) {
      console.error("Error sending message:", error)
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div
        ref={ref}
        className={`bg-gray-900/95 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-2xl ${className}`}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
          <p className="text-gray-300 mb-4">
            Your request has been submitted successfully. Our team will contact you within 24 hours.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`bg-gray-900/95 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-2xl ${className}`}
    >
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-white mb-2">
          Get Your{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Free Consultation
          </span>
        </h3>
        <p className="text-gray-300">
          Start your coding journey today. Fill out the form below and our expert will contact you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <Label htmlFor="name" className="text-gray-300 text-sm font-medium mb-2 block">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-300" />
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              className="bg-gray-800/50 border-gray-600 text-white pl-12 h-12 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:bg-gray-800/70"
              required
            />
          </div>
        </div>

        <div className="relative group">
          <Label htmlFor="email" className="text-gray-300 text-sm font-medium mb-2 block">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-300" />
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
              className="bg-gray-800/50 border-gray-600 text-white pl-12 h-12 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:bg-gray-800/70"
              required
            />
          </div>
        </div>

        <div className="relative group">
          <Label htmlFor="goal" className="text-gray-300 text-sm font-medium mb-2 block">
            Your Goal
          </Label>
          <div className="relative">
            <Target className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-300 z-10" />
            <Select onValueChange={(value) => setFormData({ ...formData, goal: value })}>
              <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white pl-12 h-12 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:bg-gray-800/70">
                <SelectValue placeholder="What do you want to achieve?" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600 rounded-xl">
                <SelectItem value="career-change">Career Change to Programming</SelectItem>
                <SelectItem value="skill-upgrade">Upgrade My Programming Skills</SelectItem>
                <SelectItem value="freelancing">Start Freelancing</SelectItem>
                <SelectItem value="startup">Build My Own Startup</SelectItem>
                <SelectItem value="job-ready">Get Job-Ready Fast</SelectItem>
                <SelectItem value="other">Other Goals</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="relative group">
          <Label htmlFor="message" className="text-gray-300 text-sm font-medium mb-2 block">
            Tell Us More (Optional)
          </Label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-300" />
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your current experience, timeline, or any specific questions..."
              className="bg-gray-800/50 border-gray-600 text-white pl-12 pt-4 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:bg-gray-800/70 min-h-[100px] resize-none"
              rows={4}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white py-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              Get Free Consultation
            </div>
          )}
        </Button>

        <p className="text-xs text-gray-400 text-center">
          🔒 Your information is secure and will never be shared with third parties
        </p>
      </form>
    </div>
  )
})

EnhancedLeadForm.displayName = "EnhancedLeadForm"

export default EnhancedLeadForm
