"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import LoginButton from "@/components/auth/LoginButton"

export default function HomePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        router.push("/dashboard")
      } else {
        setLoading(false)
      }
    }

    checkSession()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-pulse text-xl">Checking session...</div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
      style={{ backgroundImage: "url('/images/dashboard-bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/90"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">

        <h1 className="text-5xl font-bold mb-6 tracking-wide">
          Smart Bookmark App
        </h1>

        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Save and manage your bookmarks securely.
          Access them anytime with Google login.
        </p>

        <LoginButton />

      </div>
    </div>
  )
}
