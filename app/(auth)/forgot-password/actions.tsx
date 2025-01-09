"use server"

import { redirect } from "next/navigation"
import { createClient } from "../../../utils/supabase/server"

export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string

  if (!email) {
    return {
      error: "Email is required"
    }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/update-password`,
  })

  if (error) {
    return {
      error: error.message
    }
  }

  return redirect("/auth/check-email")
}
