"use server"
import { LoginSchema } from "@/components/forms/login/schema";
import { safeAction } from "@/utils/safe-action";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const loginAction = safeAction(LoginSchema, async ({ email, password }) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Revalidate the path to update server components with new auth state
  revalidatePath('/', 'layout');

  return { redirect: '/' }; // was using /browse as route
});


