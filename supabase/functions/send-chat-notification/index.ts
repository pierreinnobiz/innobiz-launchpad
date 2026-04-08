import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ChatNotificationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  contactId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: ChatNotificationRequest = await req.json();
    const { firstName, lastName, email, phone, message, contactId } = body;

    // Input validation
    if (!firstName || !lastName || !email || !contactId || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (message.length > 5000 || firstName.length > 200 || lastName.length > 200 || email.length > 320) {
      return new Response(
        JSON.stringify({ error: "Input exceeds maximum length." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Verify the contact exists in the database
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: contact, error: contactError } = await supabaseAdmin
      .from("chat_contacts")
      .select("id")
      .eq("id", contactId)
      .maybeSingle();

    if (contactError || !contact) {
      // Return success to prevent contact ID enumeration
      console.warn('[Security] Notification attempt to non-existent contact:', contactId);
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return new Response(
        JSON.stringify({ error: "Service configuration error." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize inputs for HTML email to prevent injection
    const sanitize = (str: string) =>
      str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    const safeFirst = sanitize(firstName);
    const safeLast = sanitize(lastName);
    const safeEmail = sanitize(email);
    const safePhone = sanitize(phone || "");
    const safeMessage = sanitize(message);
    const safeContactId = sanitize(contactId);

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Tolia Chat <onboarding@resend.dev>",
        to: ["pierre.innobiz@gmail.com"],
        subject: `💬 Nouveau message chat de ${safeFirst} ${safeLast}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1a365d; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">💬 Nouveau message chat</h1>
            </div>
            <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none;">
              <h2 style="color: #1a365d; margin-top: 0;">Informations du contact</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b; width: 120px;">Prénom :</td><td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${safeFirst}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Nom :</td><td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${safeLast}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Email :</td><td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #3b82f6;">${safeEmail}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Téléphone :</td><td style="padding: 8px 0;"><a href="tel:${safePhone}" style="color: #3b82f6;">${safePhone}</a></td></tr>
              </table>
              <div style="margin-top: 24px; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <p style="color: #64748b; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase;">Message :</p>
                <p style="color: #1e293b; margin: 0; font-size: 16px; line-height: 1.5;">${safeMessage}</p>
              </div>
              <p style="margin-top: 24px; color: #64748b; font-size: 12px;">ID Contact : ${safeContactId}</p>
            </div>
            <div style="background: #1a365d; color: white; padding: 16px; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; font-size: 14px;">Tolia by INNOBIZ</p>
            </div>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorBody = await emailResponse.text();
      console.error("Resend API error:", errorBody);

      // Avoid surfacing a hard failure to the chat UX for provider configuration issues
      if (emailResponse.status === 401 && errorBody.includes("API key is invalid")) {
        return new Response(
          JSON.stringify({ success: false, warning: "Email provider API key is invalid." }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to send notification." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-chat-notification function:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
