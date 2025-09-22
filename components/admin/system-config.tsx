"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, Mail, MessageSquare, Database, Shield, Save, RefreshCw, AlertTriangle } from "lucide-react"

export function SystemConfig() {
  const [isLoading, setIsLoading] = useState(false)
  const [lastBackup, setLastBackup] = useState("2024-01-15 03:00:00")

  const handleSave = async (section: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    console.log(`Saved ${section} configuration`)
  }

  const handleBackup = async () => {
    setIsLoading(true)
    // Simulate backup process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLastBackup(new Date().toLocaleString())
    setIsLoading(false)
  }

  const handleRestore = async () => {
    setIsLoading(true)
    // Simulate restore process
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">System Configuration</h1>
        <p className="text-muted-foreground mt-2">Configure system-wide settings and integrations</p>
      </div>

      {/* Configuration Tabs */}
      <Tabs defaultValue="payment" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="payment">Payment Gateway</TabsTrigger>
          <TabsTrigger value="communication">Email/SMS</TabsTrigger>
          <TabsTrigger value="ai">AI API</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="backup">Backup/Restore</TabsTrigger>
        </TabsList>

        <TabsContent value="payment" className="space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Gateway Configuration
              </CardTitle>
              <CardDescription>Configure payment processing settings and providers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Primary Payment Provider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-card-foreground">Primary Payment Provider</h3>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payment-provider">Provider</Label>
                    <Select defaultValue="stripe">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="razorpay">Razorpay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD - US Dollar</SelectItem>
                        <SelectItem value="eur">EUR - Euro</SelectItem>
                        <SelectItem value="gbp">GBP - British Pound</SelectItem>
                        <SelectItem value="vnd">VND - Vietnamese Dong</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="public-key">Public Key</Label>
                    <Input id="public-key" placeholder="pk_live_..." defaultValue="pk_live_51H..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secret-key">Secret Key</Label>
                    <Input id="secret-key" type="password" placeholder="sk_live_..." defaultValue="sk_live_51H..." />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payment Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground">Payment Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Credit Card Payments</Label>
                      <p className="text-sm text-muted-foreground">Accept Visa, Mastercard, American Express</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Digital Wallet</Label>
                      <p className="text-sm text-muted-foreground">Apple Pay, Google Pay, Samsung Pay</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Bank Transfer</Label>
                      <p className="text-sm text-muted-foreground">Direct bank transfer payments</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("payment")} disabled={isLoading}>
                  {isLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Payment Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Email Configuration */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Configuration
                </CardTitle>
                <CardDescription>Configure SMTP settings for email notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input id="smtp-host" placeholder="smtp.gmail.com" defaultValue="smtp.gmail.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">Port</Label>
                    <Input id="smtp-port" placeholder="587" defaultValue="587" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-security">Security</Label>
                    <Select defaultValue="tls">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tls">TLS</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">Username</Label>
                  <Input id="smtp-username" placeholder="your-email@gmail.com" defaultValue="cinema@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">Password</Label>
                  <Input id="smtp-password" type="password" placeholder="App password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="from-email">From Email</Label>
                  <Input id="from-email" placeholder="noreply@cinema.com" defaultValue="noreply@cinema.com" />
                </div>
                <Button onClick={() => handleSave("email")} disabled={isLoading} className="w-full">
                  {isLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Email Settings
                </Button>
              </CardContent>
            </Card>

            {/* SMS Configuration */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  SMS Configuration
                </CardTitle>
                <CardDescription>Configure SMS service for notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sms-provider">SMS Provider</Label>
                  <Select defaultValue="twilio">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twilio">Twilio</SelectItem>
                      <SelectItem value="aws-sns">AWS SNS</SelectItem>
                      <SelectItem value="nexmo">Vonage (Nexmo)</SelectItem>
                      <SelectItem value="messagebird">MessageBird</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sms-sid">Account SID</Label>
                  <Input id="sms-sid" placeholder="AC..." defaultValue="AC1234567890abcdef" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sms-token">Auth Token</Label>
                  <Input id="sms-token" type="password" placeholder="Auth token" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sms-from">From Number</Label>
                  <Input id="sms-from" placeholder="+1234567890" defaultValue="+1234567890" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send booking confirmations via SMS</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button onClick={() => handleSave("sms")} disabled={isLoading} className="w-full">
                  {isLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save SMS Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                AI API Configuration
              </CardTitle>
              <CardDescription>Configure AI chatbot and recommendation engine</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* AI Provider */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground">AI Provider Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ai-provider">AI Provider</Label>
                    <Select defaultValue="openai">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="anthropic">Anthropic</SelectItem>
                        <SelectItem value="google">Google AI</SelectItem>
                        <SelectItem value="azure">Azure OpenAI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ai-model">Model</Label>
                    <Select defaultValue="gpt-4">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="claude-3">Claude 3</SelectItem>
                        <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ai-api-key">API Key</Label>
                  <Input id="ai-api-key" type="password" placeholder="sk-..." defaultValue="sk-proj-..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ai-prompt">System Prompt</Label>
                  <Textarea
                    id="ai-prompt"
                    placeholder="You are a helpful cinema assistant..."
                    defaultValue="You are a helpful cinema assistant. Help customers with movie recommendations, showtimes, and booking questions. Be friendly and informative."
                    rows={4}
                  />
                </div>
              </div>

              <Separator />

              {/* AI Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground">AI Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Customer Chat</Label>
                      <p className="text-sm text-muted-foreground">AI-powered customer support chat</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Movie Recommendations</Label>
                      <p className="text-sm text-muted-foreground">Personalized movie suggestions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sentiment Analysis</Label>
                      <p className="text-sm text-muted-foreground">Analyze customer feedback sentiment</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("ai")} disabled={isLoading}>
                  {isLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save AI Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Configuration
              </CardTitle>
              <CardDescription>Configure security settings and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Authentication Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground">Authentication Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Session Timeout</Label>
                      <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Password Complexity</Label>
                      <p className="text-sm text-muted-foreground">Enforce strong password requirements</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Access Control */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground">Access Control</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>IP Whitelist</Label>
                      <p className="text-sm text-muted-foreground">Restrict admin access to specific IPs</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allowed-ips">Allowed IP Addresses</Label>
                    <Textarea id="allowed-ips" placeholder="192.168.1.1&#10;10.0.0.1&#10;203.0.113.1" rows={3} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Rate Limiting</Label>
                      <p className="text-sm text-muted-foreground">Limit API requests per minute</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Security Monitoring */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground">Security Monitoring</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Login Attempt Monitoring</Label>
                      <p className="text-sm text-muted-foreground">Track failed login attempts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">Email alerts for security events</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alert-email">Alert Email</Label>
                    <Input
                      id="alert-email"
                      type="email"
                      placeholder="security@cinema.com"
                      defaultValue="admin@cinema.com"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("security")} disabled={isLoading}>
                  {isLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Database className="w-5 h-5" />
                Backup & Restore
              </CardTitle>
              <CardDescription>Manage system backups and data restoration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Backup Status */}
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Last backup: {lastBackup} | Next scheduled backup: Today at 03:00 AM
                </AlertDescription>
              </Alert>

              {/* Backup Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground">Backup Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">Schedule regular system backups</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Backup Frequency</Label>
                      <p className="text-sm text-muted-foreground">How often to create backups</p>
                    </div>
                    <Select defaultValue="daily">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Retention Period</Label>
                      <p className="text-sm text-muted-foreground">How long to keep backups</p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Backup Actions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground">Backup Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button onClick={handleBackup} disabled={isLoading} className="h-20 flex-col gap-2">
                    {isLoading ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Database className="w-6 h-6" />}
                    <span>Create Backup Now</span>
                  </Button>
                  <Button
                    onClick={handleRestore}
                    disabled={isLoading}
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-transparent"
                  >
                    {isLoading ? <RefreshCw className="w-6 h-6 animate-spin" /> : <RefreshCw className="w-6 h-6" />}
                    <span>Restore from Backup</span>
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Storage Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground">Storage Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="storage-provider">Storage Provider</Label>
                    <Select defaultValue="aws-s3">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aws-s3">Amazon S3</SelectItem>
                        <SelectItem value="google-cloud">Google Cloud Storage</SelectItem>
                        <SelectItem value="azure-blob">Azure Blob Storage</SelectItem>
                        <SelectItem value="local">Local Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bucket-name">Bucket Name</Label>
                      <Input id="bucket-name" placeholder="cinema-backups" defaultValue="cinema-backups-prod" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region">Region</Label>
                      <Select defaultValue="us-east-1">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                          <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                          <SelectItem value="eu-west-1">Europe (Ireland)</SelectItem>
                          <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSave("backup")} disabled={isLoading}>
                  {isLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Backup Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
