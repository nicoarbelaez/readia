import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const loadUser = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    redirect("/login");
  }
  const userId = data.user.id;
  const { data: user, error: errorUser } = await supabase
    .schema("public_web")
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (errorUser) {
    throw Error(JSON.stringify(errorUser, null, 2));
  }

  return user;
};

export default loadUser;
