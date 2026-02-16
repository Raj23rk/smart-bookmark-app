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

    if (!error) {
      setBookmarks(data || [])
    }

    setLoading(false)
  }, [userId])

  useEffect(() => {
    if (!userId) return

    fetchBookmarks()

    // ✅ REALTIME SUBSCRIPTION
    const channel = supabase
      .channel("bookmarks-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          fetchBookmarks() // 🔥 auto refresh when change happens
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, fetchBookmarks])

  return {
    bookmarks,
    loading,
    fetchBookmarks,
  }
}
