"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Edit, Save, X, Star } from "lucide-react"

const showToast = (message: string, type: "success" | "error" = "success") => {
  const toast = document.createElement("div")
  toast.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-md text-white ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }`
  toast.textContent = message
  document.body.appendChild(toast)
  setTimeout(() => document.body.removeChild(toast), 3000)
}

export function CustomerProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "John Doe",
    gender: "male",
    dateOfBirth: "1990-05-15",
    email: "john.doe@email.com",
    loyaltyPoints: 2450,
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSave = () => {
    if (!formData.name.trim()) {
      showToast("Name is required", "error")
      return
    }
    if (!formData.gender) {
      showToast("Gender is required", "error")
      return
    }
    setIsEditing(false)
    showToast("Profile updated successfully!")
  }

  const handlePasswordChange = () => {
    if (!passwordData.currentPassword) {
      showToast("Current password is required", "error")
      return
    }
    if (!passwordData.newPassword) {
      showToast("New password is required", "error")
      return
    }
    if (passwordData.newPassword.length < 6) {
      showToast("New password must be at least 6 characters", "error")
      return
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast("New passwords don't match!", "error")
      return
    }
    showToast("Password changed successfully!")
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  return (
    <div id="view-profile" className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button id="btnSaveProfile" onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button
              id="btnCancelProfile"
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              ) : (
                <p className="text-gray-900 font-medium">{formData.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              {isEditing ? (
                <RadioGroup
                  id="gender"
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              ) : (
                <p className="text-gray-900 font-medium capitalize">{formData.gender}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <p id="dob" className="text-gray-600">
                {new Date(formData.dateOfBirth).toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <p id="email" className="text-gray-600">
                {formData.email}
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>Loyalty Points</Label>
              <div className="flex items-center gap-2 mt-1">
                <Badge id="loyaltyPoints" variant="secondary" className="text-lg px-3 py-1">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  {formData.loyaltyPoints.toLocaleString()} Points
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Gold Member Status</p>
              <p className="text-xs text-gray-500">Next tier: Platinum (500 points to go)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button id="btnSavePassword" onClick={handlePasswordChange}>
              Save Password
            </Button>
            <Button
              variant="outline"
              onClick={() => setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
