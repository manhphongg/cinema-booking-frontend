"use client"

import type React from "react"
import {useState} from "react"
import {useRouter} from "next/navigation"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Alert, AlertDescription} from "@/components/ui/alert"
import {Eye, EyeOff, Film} from "lucide-react"

// Test credentials
const TEST_CREDENTIALS = {
    customer: {
        email: "customer@cinema.com",
        password: "customer123",
        role: "customer",
    },
}

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (email === TEST_CREDENTIALS.customer.email && password === TEST_CREDENTIALS.customer.password) {
            localStorage.setItem(
                "auth",
                JSON.stringify({
                    isAuthenticated: true,
                    user: {email, role: "customer", name: "John Doe"},
                }),
            )
            router.push("/customer")
        } else {
            setError("Invalid email or password")
        }
        setIsLoading(false)
    }

    const handleGoogleSignIn = () => {
        alert("Đăng nhập bằng Google sẽ được tích hợp sau!")
    }

    const handleForgotPassword = () => {
        alert("Chức năng khôi phục mật khẩu sẽ được tích hợp sau!")
    }

    const handleRegister = () => {
        router.push("/register") // Placeholder, tạo trang /register sau
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl bg-white/90 backdrop-blur-sm rounded-xl border-0">
                <CardHeader className="text-center space-y-4">
                    <div className="flex justify-center mb-4">
                        <div
                            className="bg-gradient-to-r from-primary to-purple-600 text-white p-4 rounded-full shadow-lg">
                            <Film className="h-8 w-8"/>
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold text-gray-900">PHT Cinema VietNam</CardTitle>
                    <CardDescription className="text-gray-600">Welcome back</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                                <a
                                    href="#"
                                    onClick={handleForgotPassword}
                                    className="text-sm text-primary hover:text-primary/80 underline transition-colors"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/50"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-100"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4 text-gray-600"/> :
                                        <Eye className="h-4 w-4 text-gray-600"/>}
                                </Button>
                            </div>
                        </div>

                        {error && (
                            <Alert variant="destructive" className="text-sm">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button type="submit"
                                className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg transition-all"
                                disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="space-y-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50 text-gray-700"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"/>
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"/>
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                    fill="#FBBC05"/>
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"/>
                            </svg>
                            Sign in with Google
                        </Button>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Don’t have an account?{" "}
                                <a
                                    href="#"
                                    onClick={handleRegister}
                                    className="text-primary hover:text-primary/80 font-medium underline transition-colors"
                                >
                                    Register here
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="font-semibold mb-2 text-gray-800">Test Credentials:</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div>
                                <strong>Customer:</strong>
                                <br/>
                                Email: customer@cinema.com
                                <br/>
                                Password: customer123
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}