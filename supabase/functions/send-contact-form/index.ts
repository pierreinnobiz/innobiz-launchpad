import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactFormRequest {
  name: string;
  company: string;
  role?: string;
  email: string;
  website?: string;
  segment?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: ContactFormRequest = await req.json();
    const { name, company, role, email, website, segment } = body;

    if (!name || !company || !email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (name.length > 200 || company.length > 200 || email.length > 320) {
      return new Response(
        JSON.stringify({ error: "Input exceeds maximum length." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const isValidUrl = (url: string) => {
      try {
        const parsed = new URL(url);
        return ["https:", "http:"].includes(parsed.protocol);
      } catch {
        return false;
      }
    };
    if (website && !isValidUrl(website)) {
      return new Response(
        JSON.stringify({ error: "Invalid website URL." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
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

    const sanitize = (str: string) =>
      str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    const safeName = sanitize(name);
    const safeCompany = sanitize(company);
    const safeRole = sanitize(role || "");
    const safeEmail = sanitize(email);
    const safeWebsite = sanitize(website || "");
    const safeSegment = sanitize(segment || "");

    const segmentLabels: Record<string, string> = {
      he: "Marque d'huiles essentielles",
      "diffuseur-home": "Diffuseurs & Home Fragrance",
      dnvb: "DNVB / E-commerce Aroma",
      autre: "Autre",
      "deck-request": "Demande de présentation (fast-track)",
    };

    // 1. Internal notification email
    const internalEmailPromise = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Tolia Contact <noreply@innobiz-tolia.com>",
        to: ["pierre.innobiz@gmail.com"],
        subject: `📅 Nouvelle demande de présentation – ${safeName} (${safeCompany})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1a365d; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">📅 Nouvelle demande de présentation</h1>
            </div>
            <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none;">
              <h2 style="color: #1a365d; margin-top: 0;">Informations du contact</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b; width: 140px;">Nom complet :</td><td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${safeName}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Société :</td><td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${safeCompany}</td></tr>
                ${safeRole ? `<tr><td style="padding: 8px 0; color: #64748b;">Fonction :</td><td style="padding: 8px 0; color: #1e293b;">${safeRole}</td></tr>` : ""}
                <tr><td style="padding: 8px 0; color: #64748b;">Email :</td><td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #3b82f6;">${safeEmail}</a></td></tr>
                ${safeWebsite ? `<tr><td style="padding: 8px 0; color: #64748b;">Site web :</td><td style="padding: 8px 0;"><a href="${safeWebsite}" style="color: #3b82f6;">${safeWebsite}</a></td></tr>` : ""}
                ${safeSegment ? `<tr><td style="padding: 8px 0; color: #64748b;">Segment :</td><td style="padding: 8px 0; color: #1e293b;">${segmentLabels[segment || ""] || safeSegment}</td></tr>` : ""}
              </table>
            </div>
            <div style="background: #1a365d; color: white; padding: 16px; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; font-size: 14px;">Tolia by INNOBIZ – Formulaire de contact</p>
            </div>
          </div>
        `,
      }),
    });

    // 2. Deck email to user (only for deck-request segment)
    const userEmailPromise = segment === "deck-request"
      ? fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Tolia by INNOBIZ <noreply@innobiz-tolia.com>",
            to: [email],
            subject: "Your Tolia brand deck",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
                <div style="background: #faf8f5; padding: 32px 24px; border-radius: 8px 8px 0 0; text-align: center;">
                  <h1 style="margin: 0; font-size: 26px; color: #1a365d; font-weight: 700;">Tolia</h1>
                  <p style="margin: 8px 0 0; font-size: 14px; color: #64748b;">by INNOBIZ</p>
                </div>
                <div style="background: #ffffff; padding: 32px 24px; border: 1px solid #e2e8f0; border-top: none;">
                  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px;">Hello,</p>
                  <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px;">Thank you for your interest in Tolia. Here is your brand deck with everything you need to evaluate the programme:</p>

                  <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0;">
                    <h2 style="font-size: 18px; color: #1a365d; margin: 0 0 16px;">What is inside</h2>
                    <ul style="padding-left: 20px; margin: 0; line-height: 1.8;">
                      <li>Product overview & key differentiators</li>
                      <li>White-label programme terms</li>
                      <li>Stock order pricing (300+ units)</li>
                      <li>Case studies & market proof</li>
                      <li>Next steps to get started</li>
                    </ul>
                  </div>

                  <div style="text-align: center; margin: 32px 0;">
                    <a href="https://www.innobiz-tolia.com" style="display: inline-block; background: #1a365d; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-size: 15px; font-weight: 600;">Visit the Tolia website</a>
                  </div>

                  <p style="font-size: 14px; line-height: 1.6; color: #64748b; margin: 24px 0 0;">If you have any questions or would like to schedule a personalised demo, simply reply to this email.</p>
                </div>
                <div style="background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none; text-align: center;">
                  <p style="margin: 0; font-size: 12px; color: #94a3b8;">INNOBIZ SARL · 8 rue Louis Breguet, 34830 Jacou, France</p>
                  <p style="margin: 4px 0 0; font-size: 12px; color: #94a3b8;"><a href="https://www.innobiz-tolia.com" style="color: #3b82f6;">www.innobiz-tolia.com</a></p>
                </div>
              </div>
            `,
          }),
        })
      : Promise.resolve(new Response(JSON.stringify({ skipped: true }), { status: 200 }));

    const [internalResponse, userResponse] = await Promise.all([internalEmailPromise, userEmailPromise]);

    if (!internalResponse.ok) {
      const errorBody = await internalResponse.text();
      console.error("Resend API error (internal):", errorBody);

      if (internalResponse.status === 401 && errorBody.includes("API key is invalid")) {
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

    if (segment === "deck-request" && !userResponse.ok) {
      const errorBody = await userResponse.text();
      console.error("Resend API error (user deck):", errorBody);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-form function:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
