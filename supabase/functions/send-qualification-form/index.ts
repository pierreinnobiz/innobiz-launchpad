import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface SampleRequest {
  name?: string;
  company?: string;
  email: string;
  country: string;
  address?: string;
  role?: string;
  phone?: string;
  project_type?: "stock_order" | "white_label" | "exploring";
}

const FROM_ADDRESS = "Tolia Sample <noreply@innobiz-tolia.com>";
const TO_ADDRESS = "pierre.innobiz@gmail.com";

const PROJECT_LABEL: Record<string, string> = {
  stock_order: "Stock order (300+ units)",
  white_label: "White-label production (3,000+ units)",
  exploring: "Just exploring",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: SampleRequest = await req.json();
    const { name, company, email, country, address, role, phone, project_type } = body;

    if (!email || !country) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (
      email.length > 320 ||
      (name && name.length > 200) ||
      (company && company.length > 200) ||
      country.length > 100 ||
      (address && address.length > 500) ||
      (role && role.length > 200) ||
      (phone && phone.length > 50)
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

    const projectLabel = project_type ? (PROJECT_LABEL[project_type] || project_type) : "—";

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [TO_ADDRESS],
        subject: `📦 Nouvelle demande d'échantillon – ${sanitize(company || name || email)} (${sanitize(country)})`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
            <div style="background:#B17743;color:white;padding:20px;border-radius:8px 8px 0 0;">
              <h1 style="margin:0;font-size:22px;">📦 Nouvelle demande d'échantillon Tolia</h1>
            </div>
            <div style="background:#f8fafc;padding:24px;border:1px solid #e2e8f0;border-top:none;">
              <h2 style="color:#B17743;margin-top:0;font-size:16px;">Contact</h2>
              <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
                ${name ? row("Nom", sanitize(name)) : ""}
                ${company ? row("Société", sanitize(company)) : ""}
                ${role ? row("Poste", sanitize(role)) : ""}
                ${row("Email", `<a href="mailto:${sanitize(email)}" style="color:#3b82f6;">${sanitize(email)}</a>`)}
                ${phone ? row("Téléphone", sanitize(phone)) : ""}
              </table>

              <h2 style="color:#B17743;font-size:16px;">Livraison</h2>
              <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
                ${row("Pays", sanitize(country))}
                ${address ? row("Adresse", sanitize(address)) : ""}
              </table>

              <h2 style="color:#B17743;font-size:16px;">Intérêt projet</h2>
              <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
                ${row("Type", sanitize(projectLabel))}
              </table>
            </div>
            <div style="background:#B17743;color:white;padding:14px;border-radius:0 0 8px 8px;text-align:center;">
              <p style="margin:0;font-size:13px;">Tolia by INNOBIZ – Demande d'échantillon</p>
            </div>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorBody = await emailResponse.text();
      console.error("Resend API error:", errorBody);
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
    console.error("Error in send-qualification-form function:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
