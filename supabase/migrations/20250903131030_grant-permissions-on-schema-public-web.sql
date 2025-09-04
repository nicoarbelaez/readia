-- Dar acceso al rol anon
GRANT usage ON SCHEMA public_web TO anon;

GRANT
SELECT
,
 INSERT,
UPDATE,
DELETE ON ALL TABLES IN SCHEMA public_web TO anon;

GRANT usage,
SELECT
 ON ALL SEQUENCES IN SCHEMA public_web TO anon;

-- Dar acceso al rol authenticated
GRANT usage ON SCHEMA public_web TO authenticated;

GRANT
SELECT
,
 INSERT,
UPDATE,
DELETE ON ALL TABLES IN SCHEMA public_web TO authenticated;

GRANT usage,
SELECT
 ON ALL SEQUENCES IN SCHEMA public_web TO authenticated;

-- Importante: asegurar que futuras tablas también tengan permisos
ALTER DEFAULT PRIVILEGES IN SCHEMA public_web
GRANT
SELECT
,
 INSERT,
UPDATE,
DELETE ON TABLES TO anon;

ALTER DEFAULT PRIVILEGES IN SCHEMA public_web
GRANT
SELECT
,
 INSERT,
UPDATE,
DELETE ON TABLES TO authenticated;