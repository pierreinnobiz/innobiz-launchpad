import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface SampleRequest {
  stage?: "lead" | "shipping";
  name?: string;
  company?: string;
  email: string;
  country?: string;
  address?: string;
  role?: string;
  phone?: string;
  project_type?: "stock_order" | "white_label" | "exploring" | "unset";
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const FROM_ADDRESS = "Tolia Sample <noreply@innobiz-tolia.com>";
const TO_ADDRESS = "pierre.innobiz@gmail.com";

const PROJECT_LABEL: Record<string, string> = {
  stock_order: "Stock order (300+ units)",
  white_label: "White-label production (3,000+ units)",
  exploring: "Just exploring",
  unset: "Unspecified",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: SampleRequest = await req.json();
    const {
      stage = "shipping",
      name, company, email, country, address, role, phone, project_type,
      utm_source, utm_medium, utm_campaign, utm_term, utm_content,
    } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (stage === "shipping" && (!country || !address)) {
      return new Response(
        JSON.stringify({ error: "Missing required fields for shipping." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (
      email.length > 320 ||
      (name && name.length > 200) ||
      (company && company.length > 200) ||
      (country && country.length > 100) ||
      (address && address.length > 500) ||
      (role && role.length > 200) ||
      (phone && phone.length > 50)
    ) {
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

    const isLead = stage === "lead";
    const subjectPrefix = isLead ? "🆕 Nouveau lead échantillon" : "📦 Adresse échantillon confirmée";
    const headerTitle = isLead ? "🆕 Nouveau lead (étape 1)" : "📦 Adresse de livraison (étape 2)";

    const utmsHtml = [utm_source, utm_medium, utm_campaign, utm_term, utm_content].some(Boolean)
      ? `<h2 style="color:#B17743;font-size:16px;">UTM</h2>
         <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
           ${utm_source ? row("Source", sanitize(utm_source)) : ""}
           ${utm_medium ? row("Medium", sanitize(utm_medium)) : ""}
           ${utm_campaign ? row("Campaign", sanitize(utm_campaign)) : ""}
           ${utm_term ? row("Term", sanitize(utm_term)) : ""}
           ${utm_content ? row("Content", sanitize(utm_content)) : ""}
         </table>`
      : "";

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [TO_ADDRESS],
        subject: `${subjectPrefix} – ${sanitize(company || name || email)}${country ? ` (${sanitize(country)})` : ""}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
            <div style="background:#B17743;color:white;padding:20px;border-radius:8px 8px 0 0;">
              <h1 style="margin:0;font-size:22px;">${headerTitle}</h1>
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

              ${(country || address) ? `<h2 style="color:#B17743;font-size:16px;">Livraison</h2>
              <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
                ${country ? row("Pays", sanitize(country)) : ""}
                ${address ? row("Adresse", sanitize(address)) : ""}
              </table>` : ""}

              <h2 style="color:#B17743;font-size:16px;">Intérêt projet</h2>
              <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
                ${row("Type", sanitize(projectLabel))}
              </table>

              ${utmsHtml}
            </div>
            <div style="background:#B17743;color:white;padding:14px;border-radius:0 0 8px 8px;text-align:center;">
              <p style="margin:0;font-size:13px;">Tolia by INNOBIZ – ${isLead ? "Lead étape 1" : "Confirmation livraison"}</p>
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

    return new Response(JSON.stringify({ success: true, stage }), {
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
