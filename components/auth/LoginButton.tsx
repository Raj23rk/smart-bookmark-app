"use client"

import { supabase } from "@/lib/supabaseClient"

export default function LoginButton() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google"
    })
  }

  return (
    <button
      onClick={login}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Login with Google
    </button>
  )
}
