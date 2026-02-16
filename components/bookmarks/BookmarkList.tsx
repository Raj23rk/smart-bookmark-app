"use client"

import { Bookmark } from "@/types/bookmark"
import BookmarkItem from "./BookmarkItem"

interface Props {
  bookmarks: Bookmark[]
  onDeleteSuccess: () => Promise<void>
  loading?: boolean
}

export default function BookmarkList({
  bookmarks,
  onDeleteSuccess,
  loading
}: Props) {

  // 🔄 Loading state
  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // 📭 Empty state
  if (bookmarks.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-300 bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20">
        <p className="text-lg font-semibold">No bookmarks yet</p>
        <p className="text-sm mt-2 text-gray-400">
          Start by adding your first bookmark above 🚀
        </p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-5 mt-8 animate-fadeIn">
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          bookmark={bookmark}
          onDeleteSuccess={onDeleteSuccess}
        />
      ))}
    </div>
  )
}
