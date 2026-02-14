import "./globals.css"
import { ReactNode } from "react"

export const metadata = {
  title: "Smart Bookmark App",
  description: "Bookmark manager with Google OAuth"
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <main className="max-w-5xl mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  )
}
