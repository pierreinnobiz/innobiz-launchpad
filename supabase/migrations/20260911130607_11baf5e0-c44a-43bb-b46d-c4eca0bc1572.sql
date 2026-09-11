GRANT INSERT ON public.chat_messages TO authenticated;

CREATE POLICY "Admins can send chat messages"
ON public.chat_messages
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));