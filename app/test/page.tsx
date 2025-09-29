"use client"

import {useEffect} from "react"
import API from "@/src/api/axios"

export default function TestPage() {
    useEffect(() => {
        // gọi thử endpoint bảo vệ (cần accessToken)
        API.get("/user/lisst")
            .then(res => console.log("Profile:", res.data))
            .catch(err => console.error(" Error:", err))
    }, [])

    return <div>Test refresh token page</div>
}
