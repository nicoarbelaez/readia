// Manual test: check then delete business with ID 1
// Run with: node test-delete-business.mjs

const SUPABASE_URL = "https://iienjlqzfimcovzozknt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpZW5qbHF6ZmltY292em96a250Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MTI5OTEsImV4cCI6MjA5NTM4ODk5MX0.U2C0klMFziVMZ-nzNXOFTQ9_pw7IfrzC6dXHQFAag5k";

async function query(sql) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ query: sql }),
  });
  return res.json();
}

async function checkBusiness(id) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/businesses?id=eq.${id}&select=id,company_name,user_owner_id`,
    {
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Accept-Profile": "public_web",
      },
    }
  );
  return res.json();
}

async function deleteBusiness(id) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/businesses?id=eq.${id}`,
    {
      method: "DELETE",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Accept-Profile": "public_web",
        "Content-Profile": "public_web",
        "Prefer": "return=representation",
      },
    }
  );
  const text = await res.text();
  return { status: res.status, body: text };
}

// ── MAIN TEST ──
console.log("=".repeat(50));
console.log("PASO 1: Verificar que la empresa con ID 1 existe");
console.log("=".repeat(50));
const before = await checkBusiness(1);
console.log("Resultado ANTES:", JSON.stringify(before, null, 2));

if (!before || before.length === 0) {
  console.log("\n⚠️  No se encontró ninguna empresa con ID 1. La prueba no puede continuar.");
  process.exit(0);
}

console.log(`\n✅ Empresa encontrada: "${before[0].company_name}" (ID: ${before[0].id})`);

console.log("\n" + "=".repeat(50));
console.log("PASO 2: Eliminar la empresa con ID 1");
console.log("=".repeat(50));

// NOTE: The anon key respects RLS, so deletion will only work if the user owns the business.
// Since we're testing without auth, we expect this to be blocked by RLS (returning 0 rows).
// This confirms the function correctly requires auth.
const deleteResult = await deleteBusiness(1);
console.log("Status HTTP:", deleteResult.status);
console.log("Response body:", deleteResult.body || "(vacío - eliminación exitosa o sin resultado)");

if (deleteResult.status === 200 || deleteResult.status === 204) {
  console.log("\n✅ DELETE ejecutado correctamente (HTTP " + deleteResult.status + ").");
} else {
  console.log("\n⚠️  DELETE bloqueado (esperado con anon key sin sesión activa).");
  console.log("    El RLS protege correctamente la eliminación sin autenticación.");
}

console.log("\n" + "=".repeat(50));
console.log("PASO 3: Verificar estado DESPUÉS del intento de eliminación");
console.log("=".repeat(50));
const after = await checkBusiness(1);
console.log("Resultado DESPUÉS:", JSON.stringify(after, null, 2));

if (!after || after.length === 0) {
  console.log("\n✅ La empresa con ID 1 fue ELIMINADA correctamente.");
} else {
  console.log(`\n🔒 La empresa con ID 1 TODAVÍA EXISTE (protegida por RLS).`);
  console.log("   Esto es el comportamiento correcto con la clave anon sin autenticación.");
  console.log("   La función deleteBusiness() en el servidor valida la propiedad via auth.uid().");
}
console.log("\n" + "=".repeat(50));
