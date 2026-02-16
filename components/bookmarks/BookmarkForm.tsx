"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

type Props = {
  userId: string
  onSuccess?: () => Promise<void>
}

export default function BookmarkForm({ userId, onSuccess }: Props) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const formatUrl = (input: string) => {
    if (!/^https?:\/\//i.test(input)) {
      return `https://${input}`
    }
    return input
  }

  const isValidUrl = (input: string) => {
    try {
      const parsed = new URL(input)

      // Must be http or https
      if (!["http:", "https:"].includes(parsed.protocol)) {
        return false
      }

      // Must contain valid domain (like .com, .in etc)
      if (!parsed.hostname.includes(".")) {
        return false
      }

      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !url.trim()) {
      setError("All fields are required")
      return
    }

    const formattedUrl = formatUrl(url.trim())

    if (!isValidUrl(formattedUrl)) {
      setError("Please enter a valid website URL (example.com)")
      return
    }

    setError("")
    setSuccess("")
    setLoading(true)

    const { error } = await supabase.from("bookmarks").insert([
      {
        title: title.trim(),
        url: formattedUrl,
        user_id: userId,
      },
    ])

    if (error) {
      setError(error.message)
    } else {
      setTitle("")
      setUrl("")
      setSuccess("Bookmark added successfully 🎉")

      if (onSuccess) await onSuccess()

      setTimeout(() => setSuccess(""), 2000)
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20"
    >
      <div className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Bookmark title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <input
          type="text"
          placeholder="example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-3 rounded-lg bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        {success && (
          <p className="text-green-400 text-sm">{success}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-200 p-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Bookmark"}
        </button>

      </div>
    </form>
  )
}
