"use client"

import {useEffect, useMemo, useState} from "react"
import {useRouter} from "next/navigation"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Separator} from "@/components/ui/separator"
import {Loader2, LogIn} from "lucide-react"

import {changePassword, requestPasswordOtp, resetPassword} from "@/src/api/user"

const showToast = (message: string, type: "success" | "error" = "success") => {
    const toast = document.createElement("div")
    toast.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-md text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
    }`
    toast.textContent = message
    document.body.appendChild(toast)
    setTimeout(() => document.body.removeChild(toast), 3000)
}

export default function ForgotPasswordPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [resetForm, setResetForm] = useState({
        otp: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [changeForm, setChangeForm] = useState({
        oldPassword: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [loading, setLoading] = useState({
        forgot: false,
        reset: false,
        change: false,
    })

    useEffect(() => {
        const stored = typeof window !== "undefined" ? localStorage.getItem("email") : null
        if (stored) {
            setEmail(stored)
        }
    }, [])

    const hasEmail = useMemo(() => email.trim().length > 0, [email])

    const handleSendOtp = async () => {
        if (!hasEmail) {
            showToast("Vui lòng nhập email", "error")
            return
        }
        try {
            setLoading((prev) => ({...prev, forgot: true}))
            await requestPasswordOtp(email.trim())
            showToast("Đã gửi OTP tới email của bạn")
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error("[ForgotPassword] requestPasswordOtp error:", err)
            showToast("Gửi OTP thất bại", "error")
        } finally {
            setLoading((prev) => ({...prev, forgot: false}))
        }
    }

    const handleResetPassword = async () => {
        if (!hasEmail) {
            showToast("Vui lòng nhập email", "error")
            return
        }
        if (!resetForm.otp.trim()) {
            showToast("Vui lòng nhập OTP", "error")
            return
        }
        if (!resetForm.newPassword.trim()) {
            showToast("Vui lòng nhập mật khẩu mới", "error")
            return
        }
        if (resetForm.newPassword !== resetForm.confirmPassword) {
            showToast("Mật khẩu xác nhận không khớp", "error")
            return
        }
        try {
            setLoading((prev) => ({...prev, reset: true}))
            await resetPassword({
                email: email.trim(),
                otp: resetForm.otp.trim(),
                newPassword: resetForm.newPassword.trim(),
            })
            showToast("Đặt lại mật khẩu thành công")
            setResetForm({otp: "", newPassword: "", confirmPassword: ""})
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error("[ForgotPassword] resetPassword error:", err)
            showToast("Đặt lại mật khẩu thất bại", "error")
        } finally {
            setLoading((prev) => ({...prev, reset: false}))
        }
    }

    const handleChangePassword = async () => {
        if (!hasEmail) {
            showToast("Vui lòng nhập email", "error")
            return
        }
        if (!changeForm.oldPassword.trim()) {
            showToast("Vui lòng nhập mật khẩu hiện tại", "error")
            return
        }
        if (!changeForm.newPassword.trim()) {
            showToast("Vui lòng nhập mật khẩu mới", "error")
            return
        }
        if (changeForm.newPassword.length < 6) {
            showToast("Mật khẩu mới phải tối thiểu 6 ký tự", "error")
            return
        }
        if (changeForm.newPassword !== changeForm.confirmPassword) {
            showToast("Mật khẩu xác nhận không khớp", "error")
            return
        }
        if (!changeForm.otp.trim()) {
            showToast("Vui lòng nhập OTP", "error")
            return
        }
        try {
            setLoading((prev) => ({...prev, change: true}))
            await changePassword({
                email: email.trim(),
                oldPassword: changeForm.oldPassword.trim(),
                newPassword: changeForm.newPassword.trim(),
                otp: changeForm.otp.trim(),
            })
            showToast("Đổi mật khẩu thành công")
            setChangeForm({oldPassword: "", otp: "", newPassword: "", confirmPassword: ""})
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error("[ForgotPassword] changePassword error:", err)
            showToast("Đổi mật khẩu thất bại", "error")
        } finally {
            setLoading((prev) => ({...prev, change: false}))
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Quên / Đổi mật khẩu</h1>
                    <Button variant="outline" onClick={() => router.push("/login")} className="flex items-center gap-2">
                        <LogIn className="h-4 w-4"/>
                        Quay lại đăng nhập
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin tài khoản</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Nhập email của bạn"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Gửi OTP quên mật khẩu</Label>
                            <p className="text-sm text-gray-500">
                                Hệ thống sẽ gửi mã OTP xác thực tới email trên.
                            </p>
                            <Button
                                id="btnForgotPassword"
                                disabled={loading.forgot}
                                onClick={handleSendOtp}
                                className="w-full md:w-auto"
                            >
                                {loading.forgot ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                        Đang gửi OTP...
                                    </>
                                ) : (
                                    "Gửi OTP"
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Đặt lại mật khẩu bằng OTP</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="resetOtp">OTP</Label>
                                <Input
                                    id="resetOtp"
                                    value={resetForm.otp}
                                    onChange={(e) => setResetForm({...resetForm, otp: e.target.value})}
                                    placeholder="Nhập OTP"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="resetNewPassword">Mật khẩu mới</Label>
                                <Input
                                    id="resetNewPassword"
                                    type="password"
                                    value={resetForm.newPassword}
                                    onChange={(e) => setResetForm({...resetForm, newPassword: e.target.value})}
                                    placeholder="Mật khẩu mới"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="resetConfirmPassword">Xác nhận mật khẩu</Label>
                                <Input
                                    id="resetConfirmPassword"
                                    type="password"
                                    value={resetForm.confirmPassword}
                                    onChange={(e) => setResetForm({...resetForm, confirmPassword: e.target.value})}
                                    placeholder="Xác nhận mật khẩu"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                id="btnResetPassword"
                                disabled={loading.reset}
                                onClick={handleResetPassword}
                            >
                                {loading.reset ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                        Đang đặt lại...
                                    </>
                                ) : (
                                    "Đặt lại mật khẩu"
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setResetForm({otp: "", newPassword: "", confirmPassword: ""})}
                            >
                                Xóa thông tin
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Đổi mật khẩu (khi đã nhớ mật khẩu cũ)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-gray-500">
                            Cần nhập mật khẩu hiện tại, OTP xác nhận và mật khẩu mới.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    value={changeForm.oldPassword}
                                    onChange={(e) => setChangeForm({...changeForm, oldPassword: e.target.value})}
                                    placeholder="Nhập mật khẩu hiện tại"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="changeOtp">OTP</Label>
                                <Input
                                    id="changeOtp"
                                    value={changeForm.otp}
                                    onChange={(e) => setChangeForm({...changeForm, otp: e.target.value})}
                                    placeholder="Nhập OTP"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="changeNewPassword">Mật khẩu mới</Label>
                                <Input
                                    id="changeNewPassword"
                                    type="password"
                                    value={changeForm.newPassword}
                                    onChange={(e) => setChangeForm({...changeForm, newPassword: e.target.value})}
                                    placeholder="Mật khẩu mới"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="changeConfirmPassword">Xác nhận mật khẩu</Label>
                                <Input
                                    id="changeConfirmPassword"
                                    type="password"
                                    value={changeForm.confirmPassword}
                                    onChange={(e) =>
                                        setChangeForm({...changeForm, confirmPassword: e.target.value})
                                    }
                                    placeholder="Xác nhận mật khẩu"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                id="btnChangePassword"
                                disabled={loading.change}
                                onClick={handleChangePassword}
                            >
                                {loading.change ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                        Đang đổi mật khẩu...
                                    </>
                                ) : (
                                    "Đổi mật khẩu"
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setChangeForm({oldPassword: "", otp: "", newPassword: "", confirmPassword: ""})}
                            >
                                Xóa thông tin
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Separator/>

                <div className="text-center text-sm text-gray-500">
                    Nếu bạn gặp vấn đề khi đặt lại mật khẩu, vui lòng liên hệ bộ phận hỗ trợ khách hàng.
                </div>
            </div>
        </div>
    )
}
