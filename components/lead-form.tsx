"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface LeadFormProps {
  isOpen: boolean
  onClose: () => void
}

export default function LeadForm({ isOpen, onClose }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    goal: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Send to Telegram bot
    const telegramMessage = `
🎯 New Lead Form Submission:
👤 Name: ${formData.name}
📧 Email: ${formData.email}
🎯 Goal: ${formData.goal}
💬 Message: ${formData.message}
    `

    try {
      // Replace with your actual Telegram bot token and chat ID
      const botToken = "YOUR_BOT_TOKEN"
      const chatId = "YOUR_CHAT_ID"

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: "HTML",
        }),
      })

      alert("Thank you! RageCodeMaster Pro team will contact you soon.")
      onClose()
      setFormData({ name: "", email: "", goal: "", message: "" })
    } catch (error) {
      console.error("Error sending message:", error)
      alert("Thank you for your interest in RageCodeMaster Pro! We will contact you soon.")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">Get Your Free Consultation</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-gray-300">
              Full Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-gray-800 border-gray-600 text-white mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-300">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-gray-800 border-gray-600 text-white mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="goal" className="text-gray-300">
              Your Goal
            </Label>
            <Select onValueChange={(value) => setFormData({ ...formData, goal: value })}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white mt-1">
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="career-change">Career Change</SelectItem>
                <SelectItem value="skill-upgrade">Skill Upgrade</SelectItem>
                <SelectItem value="freelancing">Start Freelancing</SelectItem>
                <SelectItem value="startup">Build My Startup</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message" className="text-gray-300">
              Additional Information (Optional)
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-gray-800 border-gray-600 text-white mt-1"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white py-3 font-semibold"
          >
            Get Free Consultation
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
