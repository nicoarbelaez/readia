-- Create DELETE policy for public_web.businesses so authenticated users can delete their own businesses
DROP POLICY IF EXISTS "Los usuarios pueden eliminar sus propios negocios" ON public_web.businesses;

CREATE POLICY "Los usuarios pueden eliminar sus propios negocios" ON public_web.businesses
    FOR DELETE TO authenticated USING (
        user_owner_id = auth.uid()
    );
