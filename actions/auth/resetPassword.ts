"use server"
import { getURL } from "@/utils/helpers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function resetPassword(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email) {
    return {
      error: 'Email is required',
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: getURL("/auth/update-password")
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  return redirect('/auth/check-email');
}