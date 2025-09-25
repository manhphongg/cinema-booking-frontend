"use client"

import {toast} from "sonner"
import {Button} from "@/components/ui/button"

export default function TestToastPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="space-x-4">
                <Button onClick={() => toast.success("Đăng nhập thành công!")}>
                    Success Toast
                </Button>
                <Button onClick={() => toast.error("Sai mật khẩu!")}>
                    Error Toast
                </Button>
                <Button
                    onClick={() =>
                        toast("Thông báo thường", {
                            description: "Đây là thông báo mặc định",
                        })
                    }
                >
                    Default Toast
                </Button>
            </div>
        </div>
    )
}