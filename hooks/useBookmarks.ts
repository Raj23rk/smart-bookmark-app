"use client"

import { useEffect, useState, useCallback } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Bookmark } from "@/types/bookmark"

export function useBookmarks(userId: string) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(false)

  const fetchBookmarks = useCallback(async () => {
    if (!userId) return

    setLoading(true)

    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching bookmarks:", error.message)
    } else {
      setBookmarks(data || [])
    }

    setLoading(false)
  }, [userId])

  useEffect(() => {
    fetchBookmarks()
  }, [fetchBookmarks])

  return {
    bookmarks,
    loading,
    fetchBookmarks,
  }
}
