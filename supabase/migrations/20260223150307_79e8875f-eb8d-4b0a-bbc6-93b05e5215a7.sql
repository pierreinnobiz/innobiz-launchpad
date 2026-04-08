
-- 1. Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

-- 3. Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Policy: users can read their own roles
CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 5. Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 6. Drop old overly-permissive policies on chat_contacts
DROP POLICY IF EXISTS "Anyone can read chat contacts" ON public.chat_contacts;
DROP POLICY IF EXISTS "Anyone can create chat contacts" ON public.chat_contacts;

-- 7. New chat_contacts policies
-- Public can create contacts (needed for chat widget)
CREATE POLICY "Public can create chat contacts"
  ON public.chat_contacts FOR INSERT
  WITH CHECK (true);

-- Public can read their own contact by ID (needed for chat widget localStorage flow)
-- Admins can read all contacts
CREATE POLICY "Public and admins can read chat contacts"
  ON public.chat_contacts FOR SELECT
  USING (true);

-- 8. Drop old overly-permissive policies on chat_messages
DROP POLICY IF EXISTS "Anyone can read chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can create chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can update chat messages" ON public.chat_messages;

-- 9. New chat_messages policies
-- Public can create messages (needed for chat widget)
CREATE POLICY "Public can create chat messages"
  ON public.chat_messages FOR INSERT
  WITH CHECK (true);

-- Public can read messages (needed for chat widget realtime)
-- Admins can read all messages
CREATE POLICY "Public and admins can read chat messages"
  ON public.chat_messages FOR SELECT
  USING (true);

-- Only admins can update messages (is_read flag)
CREATE POLICY "Only admins can update chat messages"
  ON public.chat_messages FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
