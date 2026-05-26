-- 1. Create Diagnostics Tables
CREATE TABLE public_web.diagnostics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id BIGINT NOT NULL REFERENCES public_web.businesses(id) ON DELETE CASCADE,
    overall_score INT NOT NULL,
    score_label TEXT NOT NULL,
    score_description TEXT NOT NULL,
    conclusions_markdown TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public_web.diagnostic_distributions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    diagnostic_id UUID NOT NULL REFERENCES public_web.diagnostics(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    value INT NOT NULL,
    color TEXT NOT NULL
);

CREATE TABLE public_web.diagnostic_pillars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    diagnostic_id UUID NOT NULL REFERENCES public_web.diagnostics(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE public_web.diagnostic_pillar_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pillar_id UUID NOT NULL REFERENCES public_web.diagnostic_pillars(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    a_value INT NOT NULL,
    full_mark INT NOT NULL
);

CREATE TABLE public_web.diagnostic_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    diagnostic_id UUID NOT NULL REFERENCES public_web.diagnostics(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    priority TEXT NOT NULL,
    category TEXT NOT NULL
);

-- 2. Create Roadmap Tables
CREATE TABLE public_web.roadmaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id BIGINT NOT NULL REFERENCES public_web.businesses(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public_web.roadmap_nodes (
    id TEXT PRIMARY KEY,
    roadmap_id UUID NOT NULL REFERENCES public_web.roadmaps(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    position_x FLOAT NOT NULL,
    position_y FLOAT NOT NULL,
    label TEXT NOT NULL,
    node_type TEXT NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT,
    owner TEXT,
    objectives JSONB,
    actions JSONB,
    tools JSONB,
    kpis JSONB,
    next_steps JSONB,
    is_done BOOLEAN DEFAULT false,
    timeline TEXT,
    subtasks JSONB
);

CREATE TABLE public_web.roadmap_edges (
    id TEXT PRIMARY KEY,
    roadmap_id UUID NOT NULL REFERENCES public_web.roadmaps(id) ON DELETE CASCADE,
    source TEXT NOT NULL,
    target TEXT NOT NULL,
    animated BOOLEAN DEFAULT false
);

-- 3. Modify Questions Table
ALTER TABLE public_web.questions 
ALTER COLUMN business_id DROP NOT NULL,
ADD COLUMN IF NOT EXISTS is_global BOOLEAN DEFAULT false;

-- 4. Triggers
CREATE TRIGGER trg_diagnostics_update_at BEFORE UPDATE ON public_web.diagnostics FOR EACH ROW EXECUTE FUNCTION public_web.set_update_at();
CREATE TRIGGER trg_roadmaps_update_at BEFORE UPDATE ON public_web.roadmaps FOR EACH ROW EXECUTE FUNCTION public_web.set_update_at();

-- 5. RLS Policies
ALTER TABLE public_web.diagnostics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_web.diagnostic_distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_web.diagnostic_pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_web.diagnostic_pillar_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_web.diagnostic_recommendations ENABLE ROW LEVEL SECURITY;

ALTER TABLE public_web.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_web.roadmap_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_web.roadmap_edges ENABLE ROW LEVEL SECURITY;

-- Permisos (Simplificados para Select)
CREATE POLICY "Users can manage their business diagnostics" ON public_web.diagnostics FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public_web.businesses b WHERE b.id = diagnostics.business_id AND b.user_owner_id = auth.uid())
) WITH CHECK (
    EXISTS (SELECT 1 FROM public_web.businesses b WHERE b.id = diagnostics.business_id AND b.user_owner_id = auth.uid())
);

CREATE POLICY "Users can view diagnostic distributions" ON public_web.diagnostic_distributions FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public_web.diagnostics d JOIN public_web.businesses b ON b.id = d.business_id WHERE d.id = diagnostic_distributions.diagnostic_id AND b.user_owner_id = auth.uid())
);
CREATE POLICY "Users can view diagnostic pillars" ON public_web.diagnostic_pillars FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public_web.diagnostics d JOIN public_web.businesses b ON b.id = d.business_id WHERE d.id = diagnostic_pillars.diagnostic_id AND b.user_owner_id = auth.uid())
);
CREATE POLICY "Users can view diagnostic pillar data" ON public_web.diagnostic_pillar_data FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public_web.diagnostic_pillars p JOIN public_web.diagnostics d ON d.id = p.diagnostic_id JOIN public_web.businesses b ON b.id = d.business_id WHERE p.id = diagnostic_pillar_data.pillar_id AND b.user_owner_id = auth.uid())
);
CREATE POLICY "Users can view diagnostic recommendations" ON public_web.diagnostic_recommendations FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public_web.diagnostics d JOIN public_web.businesses b ON b.id = d.business_id WHERE d.id = diagnostic_recommendations.diagnostic_id AND b.user_owner_id = auth.uid())
);

CREATE POLICY "Users can manage their business roadmaps" ON public_web.roadmaps FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public_web.businesses b WHERE b.id = roadmaps.business_id AND b.user_owner_id = auth.uid())
) WITH CHECK (
    EXISTS (SELECT 1 FROM public_web.businesses b WHERE b.id = roadmaps.business_id AND b.user_owner_id = auth.uid())
);

CREATE POLICY "Users can view roadmap nodes" ON public_web.roadmap_nodes FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public_web.roadmaps r JOIN public_web.businesses b ON b.id = r.business_id WHERE r.id = roadmap_nodes.roadmap_id AND b.user_owner_id = auth.uid())
);
CREATE POLICY "Users can view roadmap edges" ON public_web.roadmap_edges FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public_web.roadmaps r JOIN public_web.businesses b ON b.id = r.business_id WHERE r.id = roadmap_edges.roadmap_id AND b.user_owner_id = auth.uid())
);
