-- Corregir trigger para crear registro en public_web.users al registrarse vía Auth
CREATE
OR REPLACE FUNCTION public_web.handle_new_user () RETURNS TRIGGER SECURITY DEFINER AS $$
BEGIN
    INSERT INTO
        public_web.users (id, full_name, email)
    VALUES
        (NEW.id, NEW.raw_user_meta_data ->> 'full_name', NEW.email) ON CONFLICT DO NOTHING;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users FOR EACH ROW
EXECUTE FUNCTION public_web.handle_new_user ();