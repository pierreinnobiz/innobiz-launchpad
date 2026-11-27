-- 27/11/2026 — audit sécurité du site (accord de Pierre du 27/11/2026)

-- 1. Journal anti-abus du formulaire d'échantillon (empreintes SHA-256 seulement, pas d'IP ni d'email en clair).
--    Lu et écrit uniquement par la fonction serveur send-qualification-form (rôle service_role).
CREATE TABLE IF NOT EXISTS public.form_rate_events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  kind TEXT NOT NULL,
  key_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS form_rate_events_lookup ON public.form_rate_events (kind, key_hash, created_at);
ALTER TABLE public.form_rate_events ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.form_rate_events FROM anon, authenticated;
GRANT ALL ON public.form_rate_events TO service_role;

-- 2. Aligne le dépôt sur la base en production : ces anciennes règles (écriture ouverte à tous)
--    n'existent déjà plus en production ; sans effet si elles sont absentes.
DROP POLICY IF EXISTS "Public can create chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Public can create chat contacts" ON public.chat_contacts;
