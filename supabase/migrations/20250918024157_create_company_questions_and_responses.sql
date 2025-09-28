CREATE TYPE public_web.question_type_enum AS ENUM(
 'single', -- una sola opción
 'multiple', -- múltiples opciones
 'open' -- respuesta abierta (texto)
);

-- Tabla questions
CREATE TABLE
 public_web.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
  business_id BIGINT NOT NULL REFERENCES public_web.businesses (id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type public_web.question_type_enum NOT NULL,
  description TEXT,
  required BOOLEAN DEFAULT FALSE,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
 );

-- Tabla question_options (opciones de preguntas single o multiple)
CREATE TABLE
 public_web.question_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
  question_id UUID NOT NULL REFERENCES public_web.questions (id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  option_order INTEGER DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
 );

-- Tabla responses
CREATE TABLE
 public_web.responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
  question_id UUID NOT NULL REFERENCES public_web.questions (id) ON DELETE CASCADE,
  business_id BIGINT NOT NULL REFERENCES public_web.businesses (id) ON DELETE CASCADE, -- duplicado para facilitar filtros/RLS
  user_id UUID NOT NULL REFERENCES public_web.users (id) ON DELETE CASCADE,
  response_text TEXT NOT NULL, -- almacena la respuesta: para single, el texto de la opción; para multiple, varios textos separados por ';'; para open, el texto libre
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
 );

-- Triggers para public_web.set_update_at (ya existente) en las tablas nuevas
CREATE TRIGGER trg_questions_update_at BEFORE
UPDATE ON public_web.questions FOR EACH ROW
EXECUTE FUNCTION public_web.set_update_at ();

CREATE TRIGGER trg_question_options_update_at BEFORE
UPDATE ON public_web.question_options FOR EACH ROW
EXECUTE FUNCTION public_web.set_update_at ();

CREATE TRIGGER trg_responses_update_at BEFORE
UPDATE ON public_web.responses FOR EACH ROW
EXECUTE FUNCTION public_web.set_update_at ();

-- Políticas RLS
-- Habilitar RLS en cada tabla nueva
ALTER TABLE public_web.questions ENABLE ROW LEVEL SECURITY;

ALTER TABLE public_web.question_options ENABLE ROW LEVEL SECURITY;

ALTER TABLE public_web.responses ENABLE ROW LEVEL SECURITY;

-- Separar por operación para mayor claridad y control
CREATE POLICY "Empresas pueden ver sus preguntas" ON public_web.questions FOR
SELECT
 TO authenticated USING (
  EXISTS (
   SELECT
    1
   FROM
    public_web.businesses b
   WHERE
    b.id = questions.business_id
    AND b.user_owner_id = auth.uid ()
  )
 );

CREATE POLICY "Empresas pueden crear sus preguntas" ON public_web.questions FOR INSERT TO authenticated
WITH
 CHECK (
  EXISTS (
   SELECT
    1
   FROM
    public_web.businesses b
   WHERE
    b.id = business_id
    AND b.user_owner_id = auth.uid ()
  )
 );

CREATE POLICY "Empresas pueden actualizar sus preguntas" ON public_web.questions FOR
UPDATE TO authenticated USING (
 EXISTS (
  SELECT
   1
  FROM
   public_web.businesses b
  WHERE
   b.id = business_id
   AND b.user_owner_id = auth.uid ()
 )
)
WITH
 CHECK (
  EXISTS (
   SELECT
    1
   FROM
    public_web.businesses b
   WHERE
    b.id = business_id
    AND b.user_owner_id = auth.uid ()
  )
 );

CREATE POLICY "Empresas pueden eliminar sus preguntas" ON public_web.questions FOR DELETE TO authenticated USING (
 EXISTS (
  SELECT
   1
  FROM
   public_web.businesses b
  WHERE
   b.id = business_id
   AND b.user_owner_id = auth.uid ()
 )
);

-- Política para opciones de preguntas
CREATE POLICY "Gestión de opciones de preguntas" ON public_web.question_options FOR ALL TO authenticated USING (
 EXISTS (
  SELECT
   1
  FROM
   public_web.questions q
   JOIN public_web.businesses b ON b.id = q.business_id
  WHERE
   q.id = question_options.question_id
   AND b.user_owner_id = auth.uid ()
 )
)
WITH
 CHECK (
  EXISTS (
   SELECT
    1
   FROM
    public_web.questions q
    JOIN public_web.businesses b ON b.id = q.business_id
   WHERE
    q.id = question_options.question_id
    AND b.user_owner_id = auth.uid ()
  )
 );

-- Políticas para respuestas
CREATE POLICY "Empresas pueden ver respuestas de sus preguntas" ON public_web.responses FOR
SELECT
 TO authenticated USING (
  -- Empresa propietaria puede ver todas las respuestas de sus preguntas
  EXISTS (
   SELECT
    1
   FROM
    public_web.businesses b
   WHERE
    b.id = responses.business_id
    AND b.user_owner_id = auth.uid ()
  )
  OR
  -- Usuario puede ver sus propias respuestas
  user_id = auth.uid ()
 );

CREATE POLICY "Usuarios pueden crear respuestas" ON public_web.responses FOR INSERT TO authenticated
WITH
 CHECK (
  -- Verificar que la pregunta existe y pertenece a un negocio
  EXISTS (
   SELECT
    1
   FROM
    public_web.questions q
   WHERE
    q.id = question_id
    AND business_id = q.business_id
  )
  -- Asegurar que el usuario solo puede crear sus propias respuestas
  AND user_id = auth.uid ()
 );

CREATE POLICY "Usuarios pueden actualizar sus respuestas" ON public_web.responses FOR
UPDATE TO authenticated USING (user_id = auth.uid ())
WITH
 CHECK (user_id = auth.uid ());

CREATE POLICY "Empresas pueden eliminar respuestas de sus preguntas" ON public_web.responses FOR DELETE TO authenticated USING (
 EXISTS (
  SELECT
   1
  FROM
   public_web.businesses b
  WHERE
   b.id = responses.business_id
   AND b.user_owner_id = auth.uid ()
 )
 OR user_id = auth.uid ()
);