
-- Fix 1: Add missing DELETE and UPDATE policies for admin operations
CREATE POLICY "Admins can delete contacts"
ON public.chat_contacts FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contacts"
ON public.chat_contacts FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete messages"
ON public.chat_messages FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Fix 2: Create a safe client-facing wrapper that only checks the caller's own role
CREATE OR REPLACE FUNCTION public.check_my_role(_role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), _role)
$$;
