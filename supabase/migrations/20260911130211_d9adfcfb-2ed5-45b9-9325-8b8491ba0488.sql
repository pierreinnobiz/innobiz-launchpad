DROP POLICY IF EXISTS "Only admins can read chat contacts" ON public.chat_contacts;
CREATE POLICY "Only admins can read chat contacts"
ON public.chat_contacts
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Only admins can read chat messages" ON public.chat_messages;
CREATE POLICY "Only admins can read chat messages"
ON public.chat_messages
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));