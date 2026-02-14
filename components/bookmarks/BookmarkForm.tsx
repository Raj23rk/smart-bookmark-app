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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !url.trim()) {
      setError("All fields are required")
      return
    }

    setError("")
    setLoading(true)

    const { error } = await supabase.from("bookmarks").insert([
      {
        title: title.trim(),
        url: url.trim(),
        user_id: userId,
      },
    ])

    if (error) {
      setError(error.message)
    } else {
      setTitle("")
      setUrl("")
      if (onSuccess) await onSuccess()
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg"
    >
      <div className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Bookmark title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-3 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 p-3 rounded font-semibold disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Bookmark"}
        </button>

      </div>
    </form>
  )
}
