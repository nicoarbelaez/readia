INSERT INTO public_web.questions (question_text, question_type, is_global, required) VALUES
('¿Cuál es el principal desafío que enfrenta tu empresa actualmente?', 'open', true, true),
('¿En qué etapa de madurez digital consideras que está tu empresa?', 'multiple', true, true),
('¿Cuáles son tus objetivos de crecimiento para el próximo año?', 'open', true, true),
('¿Tienes un plan de transformación digital?', 'single', true, true),
('¿Qué recursos necesitarías para alcanzar tus objetivos empresariales?', 'open', true, true);

DO $$
DECLARE
    q2_id UUID;
    q4_id UUID;
BEGIN
    SELECT id INTO q2_id FROM public_web.questions WHERE question_text = '¿En qué etapa de madurez digital consideras que está tu empresa?' AND is_global = true LIMIT 1;
    SELECT id INTO q4_id FROM public_web.questions WHERE question_text = '¿Tienes un plan de transformación digital?' AND is_global = true LIMIT 1;

    IF q2_id IS NOT NULL THEN
        INSERT INTO public_web.question_options (question_id, option_text, option_label, option_order) VALUES
        (q2_id, 'inicial', 'Inicial - Procesos principalmente manuales', 0),
        (q2_id, 'desarrollo', 'En desarrollo - Algunos procesos digitalizados', 1),
        (q2_id, 'avanzado', 'Avanzado - Mayoría de procesos digitales', 2),
        (q2_id, 'optimizado', 'Optimizado - Completamente digital', 3);
    END IF;

    IF q4_id IS NOT NULL THEN
        INSERT INTO public_web.question_options (question_id, option_text, option_label, option_order) VALUES
        (q4_id, 'si', 'Sí', 0),
        (q4_id, 'no', 'No', 1),
        (q4_id, 'en_proceso', 'En proceso de desarrollo', 2);
    END IF;
END $$;
