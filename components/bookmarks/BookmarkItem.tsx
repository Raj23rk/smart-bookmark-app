"use client"

import { useState } from "react"
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

  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this bookmark?")
    if (!confirmDelete) return

    setDeleting(true)

    await BookmarkService.deleteBookmark(bookmark.id)
    await onDeleteSuccess()

    setDeleting(false)
  }

  const getFavicon = (url: string) => {
    try {
      const domain = new URL(url).origin
      return `${domain}/favicon.ico`
    } catch {
      return ""
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl shadow-lg flex justify-between items-center hover:scale-[1.02] transition-all duration-300">

      {/* Left Content */}
      <div className="flex items-start gap-3 overflow-hidden">

        {/* Favicon */}
        {/* <img
          src={getFavicon(bookmark.url)}
          alt="favicon"
          className="w-6 h-6 mt-1 rounded"
        /> */}

        <div className="overflow-hidden">
          <h3 className="font-semibold text-lg text-white truncate">
            {bookmark.title}
          </h3>

          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 text-sm hover:underline truncate block max-w-xs"
          >
            {bookmark.url}
          </a>
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-200 px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  )
}
