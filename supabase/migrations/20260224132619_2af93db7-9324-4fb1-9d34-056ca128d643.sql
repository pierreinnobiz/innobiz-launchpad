
-- Add secret token for contact ownership verification
ALTER TABLE public.chat_contacts ADD COLUMN secret_token uuid NOT NULL DEFAULT gen_random_uuid();

-- Add length constraints
ALTER TABLE public.chat_contacts ADD CONSTRAINT first_name_length CHECK (length(first_name) <= 100);
ALTER TABLE public.chat_contacts ADD CONSTRAINT last_name_length CHECK (length(last_name) <= 100);
ALTER TABLE public.chat_contacts ADD CONSTRAINT email_length CHECK (length(email) <= 320);
ALTER TABLE public.chat_contacts ADD CONSTRAINT phone_length CHECK (length(phone) <= 50);
ALTER TABLE public.chat_messages ADD CONSTRAINT message_length CHECK (length(message) <= 5000);
