"use server";

import { ActionResult } from "@/types/action-type";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface UpdateProfileParams {
  id: string;
  fullName: string;
  userName: string;
}

export async function updateProfile({
  id,
  fullName,
  userName,
}: UpdateProfileParams): Promise<ActionResult> {
  const supabase = await createClient();

  const { error, data } = await supabase
    .schema("public_web")
    .from("users")
    .update({
      full_name: fullName,
      user_name: userName,
    })
    .eq("id", id)
    .select();

  if (error) {
    return { success: false, message: "No se pudo actualizar el perfil." };
  }

  revalidatePath("/");

  return { success: true, data };
}
