-- Primero, elimina la política anterior si existe:
DROP POLICY IF EXISTS "Los usuarios pueden actualizar su propio registro de usuario" ON public_web.users;

-- Ahora crea la política completa:
CREATE POLICY "Los usuarios pueden actualizar su propio registro de usuario" ON public_web.users FOR
UPDATE TO authenticated USING (auth.uid () = id)
WITH
 CHECK (auth.uid () = id);