import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface QualificationFormRequest {
  company: string;
  website?: string;
  country: string;
  market: string;
  channels: string[];
  salesRange: string;
  timing: string;
  objective: string;
  message?: string;
}

const FROM_ADDRESS = "Tolia Qualification <noreply@innobiz-tolia.com>";
const TO_ADDRESS = "pierre.innobiz@gmail.com";

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: QualificationFormRequest = await req.json();
    const {
      company, website, country, market, channels,
      salesRange, timing, objective, message,
    } = body;

    if (!company || !country || !market || !salesRange || !timing || !objective) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (
      company.length > 200 || country.length > 100 ||
      (website && website.length > 500) ||
      (message && message.length > 5000)
    ) {
      return new Response(
        JSON.stringify({ error: "Input exceeds maximum length." }),
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

    const row = (label: string, value: string) =>
      `<tr><td style="padding:8px 0;color:#64748b;width:180px;vertical-align:top;">${label}</td><td style="padding:8px 0;color:#1e293b;font-weight:500;">${value}</td></tr>`;

    const channelsStr = channels && channels.length ? channels.join(", ") : "—";

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [TO_ADDRESS],
        subject: `🎯 Nouveau lead qualifié – ${sanitize(company)} (${sanitize(country)})`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
            <div style="background:#1a365d;color:white;padding:20px;border-radius:8px 8px 0 0;">
              <h1 style="margin:0;font-size:22px;">🎯 Nouveau lead qualifié – Tolia</h1>
            </div>
            <div style="background:#f8fafc;padding:24px;border:1px solid #e2e8f0;border-top:none;">
              <h2 style="color:#1a365d;margin-top:0;font-size:16px;">Société</h2>
              <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
                ${row("Société", sanitize(company))}
                ${website ? row("Site web", `<a href="${sanitize(website)}" style="color:#3b82f6;">${sanitize(website)}</a>`) : ""}
                ${row("Pays", sanitize(country))}
              </table>

              <h2 style="color:#1a365d;font-size:16px;">Marché</h2>
              <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
                ${row("Activité", sanitize(market))}
                ${row("Canaux", sanitize(channelsStr))}
              </table>

              <h2 style="color:#1a365d;font-size:16px;">Potentiel projet</h2>
              <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
                ${row("Volume annuel", sanitize(salesRange))}
                ${row("Timing", sanitize(timing))}
                ${row("Objectif", sanitize(objective))}
              </table>

              ${message ? `
                <h2 style="color:#1a365d;font-size:16px;">Message</h2>
                <div style="background:white;padding:12px;border:1px solid #e2e8f0;border-radius:6px;color:#1e293b;white-space:pre-wrap;">${sanitize(message)}</div>
              ` : ""}
            </div>
            <div style="background:#1a365d;color:white;padding:14px;border-radius:0 0 8px 8px;text-align:center;">
              <p style="margin:0;font-size:13px;">Tolia by INNOBIZ – Formulaire de qualification</p>
            </div>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorBody = await emailResponse.text();
      console.error("Resend API error:", errorBody);
      return new Response(
        JSON.stringify({ error: "Failed to send notification.", details: errorBody }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-qualification-form function:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
