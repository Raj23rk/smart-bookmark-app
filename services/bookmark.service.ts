import { supabase } from "@/lib/supabaseClient"
import { Bookmark } from "@/types/bookmark"

export const BookmarkService = {
  async getBookmarks(userId: string): Promise<Bookmark[]> {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  },

  async addBookmark(title: string, url: string, userId: string) {
    const { error } = await supabase
      .from("bookmarks")
      .insert([{ title, url, user_id: userId }])

    if (error) throw error
  },

  async deleteBookmark(id: string) {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id)

    if (error) throw error
  }
}
