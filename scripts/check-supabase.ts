import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fglvypynatlwvxwjudlk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnbHZ5cHluYXRsd3Z4d2p1ZGxrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTcyMjkwMCwiZXhwIjoyMDcxMjk4OTAwfQ.TdZelV03OiydPZ1eDe-MIznCnl2PjorzmwLiwYuZF1w";

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ No se encontró SUPABASE_URL o SUPABASE_KEY en process.env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase
    .schema("public_web")
    .from("businesses")
    .select()
    .limit(1);
  if (error) {
    console.error("Error al conectarse a Supabase:", error);
    process.exit(1);
  }
  console.log("✅ Conexión exitosa, ejemplo de datos:", data);
  process.exit(0);
}

test();
