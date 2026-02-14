"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import LogoutButton from "@/components/auth/LogoutButton"
import BookmarkForm from "@/components/bookmarks/BookmarkForm"
import BookmarkList from "@/components/bookmarks/BookmarkList"
import { useBookmarks } from "@/hooks/useBookmarks"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const { bookmarks, fetchBookmarks } = useBookmarks(user?.id || "")

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/")
      } else {
        setUser(user)
      }

      setLoading(false)
    }

    getUser()
  }, [router])

  // ✅ Loading Screen (Center Animated Loader)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg animate-pulse">
            Loading Dashboard...
          </p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: "url('/images/dashboard-bg.jpg')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/90"></div>

      {/* Content */}
      <div className="relative z-10 text-white p-6">
        <div className="max-w-3xl mx-auto backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold tracking-wide">
              My Bookmarks
            </h1>
            <LogoutButton />
          </div>

          {/* Add Form */}
          <BookmarkForm
            userId={user.id}
            onSuccess={fetchBookmarks}
          />

          {/* List */}
          <div className="mt-6">
            <BookmarkList
              bookmarks={bookmarks}
              onDeleteSuccess={fetchBookmarks}
            />
          </div>

        </div>
      </div>
    </div>
  )
}
