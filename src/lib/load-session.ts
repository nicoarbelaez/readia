import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const loadUser = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    redirect("/login");
  }
  return data.user;
};

export default loadUser;
