ALTER TABLE public_web.questions
    ADD COLUMN IF NOT EXISTS ai_generated BOOLEAN;