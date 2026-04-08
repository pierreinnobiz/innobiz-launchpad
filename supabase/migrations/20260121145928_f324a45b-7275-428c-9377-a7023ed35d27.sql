-- Create table for chat contacts (leads)
CREATE TABLE public.chat_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for chat messages
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID NOT NULL REFERENCES public.chat_contacts(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'admin')),
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables (public access for chat - no auth required)
ALTER TABLE public.chat_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contacts (for lead capture)
CREATE POLICY "Anyone can create chat contacts" 
ON public.chat_contacts 
FOR INSERT 
WITH CHECK (true);

-- Allow reading own contact by id (visitor will have their contact_id)
CREATE POLICY "Anyone can read chat contacts" 
ON public.chat_contacts 
FOR SELECT 
USING (true);

-- Allow anyone to insert messages
CREATE POLICY "Anyone can create chat messages" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (true);

-- Allow reading messages for a contact
CREATE POLICY "Anyone can read chat messages" 
ON public.chat_messages 
FOR SELECT 
USING (true);

-- Allow updating messages (for read status)
CREATE POLICY "Anyone can update chat messages" 
ON public.chat_messages 
FOR UPDATE 
USING (true);

-- Enable realtime for chat messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;