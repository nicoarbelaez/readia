import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://iienjlqzfimcovzozknt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpZW5qbHF6ZmltY292em96a250Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MTI5OTEsImV4cCI6MjA5NTM4ODk5MX0.U2C0klMFziVMZ-nzNXOFTQ9_pw7IfrzC6dXHQFAag5k";

async function runTest() {
  console.log("=".repeat(60));
  console.log("🚀 INICIANDO TEST MANUAL DE ELIMINACIÓN DE EMPRESA CON RLS");
  console.log("=".repeat(60));

  // 1. Inicializar cliente Supabase con clave anon
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    db: { schema: "public_web" }
  });

  const testEmail = `delete.test.${Math.floor(Math.random() * 1000000)}@gmail.com`;
  const testPassword = "SuperSecurePassword123!";

  console.log(`\nPaso 1: Registrando usuario de prueba: ${testEmail}`);
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
  });

  if (signUpError) {
    console.error("❌ Error al registrar usuario:", signUpError.message);
    process.exit(1);
  }

  const user = signUpData.user;
  console.log(`✅ Usuario registrado con ID: ${user.id}`);

  console.log("\nPaso 2: Iniciando sesión...");
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: testEmail,
    password: testPassword,
  });

  if (signInError) {
    console.error("❌ Error al iniciar sesión:", signInError.message);
    process.exit(1);
  }

  console.log("✅ Sesión iniciada con éxito.");
  const session = signInData.session;
  
  // Crear un cliente Supabase autenticado con el token del usuario
  const authSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    db: { schema: "public_web" },
    global: {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    },
  });

  // Esperar un momento para asegurar que el trigger de inserción de usuario se ejecute
  console.log("\nPaso 3: Verificando creación del perfil de usuario en public_web.users...");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { data: userData, error: userError } = await authSupabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (userError || !userData) {
    console.error("❌ Error al verificar usuario en public_web.users:", userError?.message || "No se encontró el registro");
    process.exit(1);
  }
  console.log(`✅ Registro de usuario encontrado en public_web.users:`, userData);

  console.log("\nPaso 4: Creando una nueva empresa de prueba...");
  const { data: businessData, error: businessError } = await authSupabase
    .from("businesses")
    .insert({
      company_name: "Empresa de Prueba S.A.",
      user_owner_id: user.id,
      sector: "Tecnología",
      employee_count: 10,
      description: "Empresa de prueba para verificar borrado con RLS",
      category: "A",
      net_earnings: 50000,
    })
    .select()
    .single();

  if (businessError || !businessData) {
    console.error("❌ Error al crear la empresa de prueba:", businessError?.message);
    process.exit(1);
  }

  const businessId = businessData.id;
  console.log(`✅ Empresa creada con ID: ${businessId}, Nombre: "${businessData.company_name}"`);

  console.log("\nPaso 5: Verificando que la empresa existe y es accesible bajo RLS...");
  const { data: selectBefore, error: selectBeforeError } = await authSupabase
    .from("businesses")
    .select("*")
    .eq("id", businessId)
    .maybeSingle();

  if (selectBeforeError || !selectBefore) {
    console.error("❌ Error al leer la empresa antes de borrar:", selectBeforeError?.message || "No se encontró la empresa");
    process.exit(1);
  }
  console.log(`✅ Empresa confirmada en base de datos antes de borrar.`);

  console.log("\n" + "=".repeat(60));
  console.log(`🔥 Paso 6: Ejecutando borrado de la empresa con ID: ${businessId}`);
  console.log("=".repeat(60));

  // Simulamos la operación de borrado que hace la función deleteBusiness en el servidor
  const { error: deleteError } = await authSupabase
    .from("businesses")
    .delete()
    .eq("id", businessId);

  if (deleteError) {
    console.error("❌ Error de la base de datos al eliminar la empresa:", deleteError.message);
    process.exit(1);
  }
  console.log("✅ Consulta de eliminación (DELETE) completada sin errores.");

  console.log("\nPaso 7: Verificando que la empresa fue eliminada de la base de datos...");
  const { data: selectAfter, error: selectAfterError } = await authSupabase
    .from("businesses")
    .select("*")
    .eq("id", businessId)
    .maybeSingle();

  if (selectAfterError) {
    console.error("❌ Error al verificar después de borrar:", selectAfterError.message);
    process.exit(1);
  }

  if (!selectAfter) {
    console.log("🎉 ¡ÉXITO! La empresa ya no existe en la base de datos.");
    console.log("   La política de eliminación RLS y la función de borrado funcionan a la perfección.");
  } else {
    console.error("❌ ERROR: La empresa todavía existe en la base de datos:", selectAfter);
    process.exit(1);
  }

  console.log("\n" + "=".repeat(60));
  console.log("🏁 TEST COMPLETADO CON ÉXITO");
  console.log("=".repeat(60));
}

runTest().catch((err) => {
  console.error("❌ Error fatal en el test:", err);
  process.exit(1);
});
