
-- Drop the overly permissive SELECT policies
DROP POLICY IF EXISTS "Public and admins can read chat contacts" ON public.chat_contacts;
DROP POLICY IF EXISTS "Public and admins can read chat messages" ON public.chat_messages;

-- Create admin-only SELECT policies
CREATE POLICY "Only admins can read chat contacts"
ON public.chat_contacts
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can read chat messages"
ON public.chat_messages
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));
