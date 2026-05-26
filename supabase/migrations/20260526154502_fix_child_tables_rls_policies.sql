-- Drop the restrictive SELECT policies
DROP POLICY IF EXISTS "Users can view diagnostic distributions" ON public_web.diagnostic_distributions;
DROP POLICY IF EXISTS "Users can view diagnostic pillars" ON public_web.diagnostic_pillars;
DROP POLICY IF EXISTS "Users can view diagnostic pillar data" ON public_web.diagnostic_pillar_data;
DROP POLICY IF EXISTS "Users can view diagnostic recommendations" ON public_web.diagnostic_recommendations;
DROP POLICY IF EXISTS "Users can view roadmap nodes" ON public_web.roadmap_nodes;
DROP POLICY IF EXISTS "Users can view roadmap edges" ON public_web.roadmap_edges;

-- Create FOR ALL policies so users can manage (insert/update/delete) their own child rows
CREATE POLICY "Users can manage their diagnostic distributions" ON public_web.diagnostic_distributions FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public_web.diagnostics d JOIN public_web.businesses b ON b.id = d.business_id WHERE d.id = diagnostic_distributions.diagnostic_id AND b.user_owner_id = auth.uid())
) WITH CHECK (
    EXISTS (SELECT 1 FROM public_web.diagnostics d JOIN public_web.businesses b ON b.id = d.business_id WHERE d.id = diagnostic_distributions.diagnostic_id AND b.user_owner_id = auth.uid())
);

CREATE POLICY "Users can manage their diagnostic pillars" ON public_web.diagnostic_pillars FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public_web.diagnostics d JOIN public_web.businesses b ON b.id = d.business_id WHERE d.id = diagnostic_pillars.diagnostic_id AND b.user_owner_id = auth.uid())
) WITH CHECK (
    EXISTS (SELECT 1 FROM public_web.diagnostics d JOIN public_web.businesses b ON b.id = d.business_id WHERE d.id = diagnostic_pillars.diagnostic_id AND b.user_owner_id = auth.uid())
);

CREATE POLICY "Users can manage their diagnostic pillar data" ON public_web.diagnostic_pillar_data FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public_web.diagnostic_pillars p JOIN public_web.diagnostics d ON d.id = p.diagnostic_id JOIN public_web.businesses b ON b.id = d.business_id WHERE p.id = diagnostic_pillar_data.pillar_id AND b.user_owner_id = auth.uid())
) WITH CHECK (
    EXISTS (SELECT 1 FROM public_web.diagnostic_pillars p JOIN public_web.diagnostics d ON d.id = p.diagnostic_id JOIN public_web.businesses b ON b.id = d.business_id WHERE p.id = diagnostic_pillar_data.pillar_id AND b.user_owner_id = auth.uid())
);

CREATE POLICY "Users can manage their diagnostic recommendations" ON public_web.diagnostic_recommendations FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public_web.diagnostics d JOIN public_web.businesses b ON b.id = d.business_id WHERE d.id = diagnostic_recommendations.diagnostic_id AND b.user_owner_id = auth.uid())
) WITH CHECK (
    EXISTS (SELECT 1 FROM public_web.diagnostics d JOIN public_web.businesses b ON b.id = d.business_id WHERE d.id = diagnostic_recommendations.diagnostic_id AND b.user_owner_id = auth.uid())
);

CREATE POLICY "Users can manage their roadmap nodes" ON public_web.roadmap_nodes FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public_web.roadmaps r JOIN public_web.businesses b ON b.id = r.business_id WHERE r.id = roadmap_nodes.roadmap_id AND b.user_owner_id = auth.uid())
) WITH CHECK (
    EXISTS (SELECT 1 FROM public_web.roadmaps r JOIN public_web.businesses b ON b.id = r.business_id WHERE r.id = roadmap_nodes.roadmap_id AND b.user_owner_id = auth.uid())
);

CREATE POLICY "Users can manage their roadmap edges" ON public_web.roadmap_edges FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public_web.roadmaps r JOIN public_web.businesses b ON b.id = r.business_id WHERE r.id = roadmap_edges.roadmap_id AND b.user_owner_id = auth.uid())
) WITH CHECK (
    EXISTS (SELECT 1 FROM public_web.roadmaps r JOIN public_web.businesses b ON b.id = r.business_id WHERE r.id = roadmap_edges.roadmap_id AND b.user_owner_id = auth.uid())
);
