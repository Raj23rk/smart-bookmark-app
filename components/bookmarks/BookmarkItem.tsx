"use client"

import { Bookmark } from "@/types/bookmark"
import { BookmarkService } from "@/services/bookmark.service"

interface Props {
  bookmark: Bookmark
  onDeleteSuccess: () => Promise<void>
}

export default function BookmarkItem({ 
  bookmark,
  onDeleteSuccess
}: Props) {

  const handleDelete = async () => {
    await BookmarkService.deleteBookmark(bookmark.id)
    await onDeleteSuccess()   // 🔥 refresh immediately
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center">

      <div>
        <h3 className="font-semibold text-lg">{bookmark.title}</h3>
        <a
          href={bookmark.url}
          target="_blank"
          className="text-blue-400 text-sm"
        >
          {bookmark.url}
        </a>
      </div>

      <button
        onClick={handleDelete}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
      >
        Delete
      </button>
    </div>
  )
}
