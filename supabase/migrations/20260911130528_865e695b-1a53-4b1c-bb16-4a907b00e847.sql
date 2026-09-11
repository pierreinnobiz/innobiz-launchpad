REVOKE SELECT, INSERT, UPDATE, DELETE ON public.chat_contacts FROM anon;
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.chat_messages FROM anon;
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.user_roles FROM anon;

GRANT SELECT, UPDATE, DELETE ON public.chat_contacts TO authenticated;
GRANT SELECT, UPDATE, DELETE ON public.chat_messages TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.chat_contacts TO service_role;
GRANT ALL ON public.chat_messages TO service_role;
GRANT ALL ON public.user_roles TO service_role;