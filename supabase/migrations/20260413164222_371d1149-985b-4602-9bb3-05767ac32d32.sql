-- Explicitly restrict INSERT/UPDATE/DELETE on user_roles to service_role only
-- This prevents any future misconfiguration from allowing privilege escalation

CREATE POLICY "Only service_role can insert roles"
ON public.user_roles
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Only service_role can update roles"
ON public.user_roles
FOR UPDATE
TO service_role
USING (true);

CREATE POLICY "Only service_role can delete roles"
ON public.user_roles
FOR DELETE
TO service_role
USING (true);
