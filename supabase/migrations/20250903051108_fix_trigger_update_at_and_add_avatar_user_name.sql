-- Agregar nuevas columnas si no existen (Evita errores con IF NOT EXISTS)
ALTER TABLE public_web.users
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS user_name TEXT;

-- Actualizar función del trigger para usar 'update_at'
CREATE
OR REPLACE FUNCTION public_web.set_update_at () RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.update_at := now();
  RETURN NEW;
END;
$$;

-- Reemplazar trigger anterior
DROP TRIGGER IF EXISTS trg_set_updated_at_users ON public_web.users;

CREATE TRIGGER trg_set_update_at_users BEFORE
UPDATE ON public_web.users FOR EACH ROW
EXECUTE FUNCTION public_web.set_update_at ();

DROP TRIGGER IF EXISTS trg_set_updated_at_businesses ON public_web.businesses;

CREATE TRIGGER trg_set_update_at_businesses BEFORE
UPDATE ON public_web.businesses FOR EACH ROW
EXECUTE FUNCTION public_web.set_update_at ();

-- Actualizar trigger de creación para usar avatar_url y user_name desde raw_user_meta_data
CREATE
OR REPLACE FUNCTION public_web.handle_new_user () RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET
 search_path = public_web AS $$
BEGIN
  INSERT INTO public_web.users (id, full_name, email, avatar_url, user_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.email,
    NEW.raw_user_meta_data ->> 'avatar_url',
    NEW.raw_user_meta_data ->> 'user_name'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users FOR EACH ROW
EXECUTE FUNCTION public_web.handle_new_user ();