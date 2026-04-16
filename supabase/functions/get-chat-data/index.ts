import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { type } = body;

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // === CREATE CONTACT ===
    if (type === "create-contact") {
      const { firstName, lastName, email, phone } = body;

      // Validate inputs
      if (!firstName || typeof firstName !== "string" || firstName.trim().length === 0 || firstName.length > 100) {
        return jsonResponse({ error: "Invalid first name (max 100 chars)" }, 400);
      }
      if (!lastName || typeof lastName !== "string" || lastName.trim().length === 0 || lastName.length > 100) {
        return jsonResponse({ error: "Invalid last name (max 100 chars)" }, 400);
      }
      if (!email || typeof email !== "string" || email.length > 320 || !emailRegex.test(email)) {
        return jsonResponse({ error: "Invalid email" }, 400);
      }
      if (!phone || typeof phone !== "string" || phone.trim().length === 0 || phone.length > 50) {
        return jsonResponse({ error: "Invalid phone (max 50 chars)" }, 400);
      }

      const { data, error } = await supabaseAdmin
        .from("chat_contacts")
        .insert({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
        })
        .select("id, first_name, last_name, email, phone, secret_token")
        .single();

      if (error || !data) {
        return jsonResponse({ error: "Failed to create contact" }, 500);
      }

      // Return contact data and secret_token (client stores token for ownership proof)
      return jsonResponse({
        data: {
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
        },
        secretToken: data.secret_token,
      });
    }

    // === SEND MESSAGE ===
    if (type === "send-message") {
      const { contactId, secretToken, message } = body;

      if (!contactId || !uuidRegex.test(contactId)) {
        return jsonResponse({ error: "Invalid contact ID" }, 400);
      }
      if (!secretToken || !uuidRegex.test(secretToken)) {
        return jsonResponse({ error: "Invalid token" }, 400);
      }
      if (!message || typeof message !== "string" || message.trim().length === 0 || message.length > 5000) {
        return jsonResponse({ error: "Invalid message (max 5000 chars)" }, 400);
      }

      // Verify ownership
      const { data: contact } = await supabaseAdmin
        .from("chat_contacts")
        .select("id")
        .eq("id", contactId)
        .eq("secret_token", secretToken)
        .maybeSingle();

      if (!contact) {
        return jsonResponse({ error: "Unauthorized" }, 403);
      }

      const { error } = await supabaseAdmin
        .from("chat_messages")
        .insert({
          contact_id: contactId,
          sender: "user",
          message: message.trim(),
        });

      if (error) {
        return jsonResponse({ error: "Failed to send message" }, 500);
      }

      return jsonResponse({ success: true });
    }

    // === READ CONTACT ===
    if (type === "contact") {
      const { contactId, secretToken } = body;

      if (!contactId || !uuidRegex.test(contactId)) {
        return jsonResponse({ error: "Invalid contact ID" }, 400);
      }
      if (!secretToken || !uuidRegex.test(secretToken)) {
        return jsonResponse({ error: "Invalid token" }, 400);
      }

      const { data } = await supabaseAdmin
        .from("chat_contacts")
        .select("id, first_name, last_name, email, phone")
        .eq("id", contactId)
        .eq("secret_token", secretToken)
        .maybeSingle();

      if (!data) {
        return jsonResponse({ data: null });
      }

      return jsonResponse({ data });
    }

    // === READ MESSAGES ===
    if (type === "messages") {
      const { contactId, secretToken } = body;

      if (!contactId || !uuidRegex.test(contactId)) {
        return jsonResponse({ error: "Invalid contact ID" }, 400);
      }
      if (!secretToken || !uuidRegex.test(secretToken)) {
        return jsonResponse({ error: "Invalid token" }, 400);
      }

      // Verify ownership
      const { data: contact } = await supabaseAdmin
        .from("chat_contacts")
        .select("id")
        .eq("id", contactId)
        .eq("secret_token", secretToken)
        .maybeSingle();

      if (!contact) {
        return jsonResponse({ error: "Unauthorized" }, 403);
      }

      const { data } = await supabaseAdmin
        .from("chat_messages")
        .select("id, contact_id, sender, message, created_at")
        .eq("contact_id", contactId)
        .order("created_at", { ascending: true })
        .limit(200);

      return jsonResponse({ data: data || [] });
    }

    return jsonResponse({ error: "Invalid type" }, 400);
  } catch {
    return jsonResponse({ error: "An unexpected error occurred." }, 500);
  }
});
