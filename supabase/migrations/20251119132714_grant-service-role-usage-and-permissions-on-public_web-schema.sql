-- Da permiso de uso del esquema
GRANT USAGE ON SCHEMA public_web TO service_role;

-- Da permisos sobre todas las tablas existentes en ese esquema
GRANT ALL ON ALL TABLES IN SCHEMA public_web TO service_role;

-- Da permisos sobre secuencias (si hay)
GRANT ALL ON ALL SEQUENCES IN SCHEMA public_web TO service_role;

-- Da permisos sobre funciones / rutinas si las tienes
GRANT ALL ON ALL ROUTINES IN SCHEMA public_web TO service_role;

-- Asegura que las futuras tablas/secuencias hereden esos permisos:
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public_web
  GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public_web
  GRANT ALL ON SEQUENCES TO service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public_web
  GRANT ALL ON ROUTINES TO service_role;
