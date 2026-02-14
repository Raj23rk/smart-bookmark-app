"use client"

import { Bookmark } from "@/types/bookmark"
import BookmarkItem from "./BookmarkItem"

interface Props {
  bookmarks: Bookmark[]
  onDeleteSuccess: () => Promise<void>
}

export default function BookmarkList({ 
  bookmarks, 
  onDeleteSuccess 
}: Props) {

  if (bookmarks.length === 0) {
    return (
      <div className="text-gray-400 mt-6">
        No bookmarks yet.
      </div>
    )
  }

  return (
    <div className="space-y-3 mt-6">
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
