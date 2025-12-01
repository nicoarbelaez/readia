ALTER TABLE public_web.businesses
    ADD COLUMN IF NOT EXISTS category TEXT,
    ADD COLUMN IF NOT EXISTS net_earnings NUMERIC;

ALTER TABLE public_web.question_options
    ADD COLUMN IF NOT EXISTS option_label TEXT;