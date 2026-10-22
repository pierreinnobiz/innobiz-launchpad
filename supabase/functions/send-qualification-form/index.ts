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
  website?: string;
  address?: string;
  address_street?: string;
  address_postal_code?: string;
  address_city?: string;
  role?: string;
  phone?: string;
  // 17/10/2026 : « Votre projet en une phrase » (facultatif, étape 2 du formulaire d'échantillon)
  message?: string;
  // 21/10/2026 : champ piège anti-robots (invisible sur le site) ; rempli = envoi ignoré
  hp?: string;
  project_type?: "stock_order" | "white_label" | "exploring" | "unset";
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
  // 22/10/2026 : langue du site lue par le visiteur (fr, en, es) pour l'email de remerciement
  lang?: string;
}

const FROM_ADDRESS = "Tolia Sample <noreply@innobiz-tolia.com>";
const TO_ADDRESS = "pierre.innobiz@gmail.com";

// Email de remerciement envoyé au demandeur quand il confirme son adresse (accord de Pierre du 22/10/2026, point V7 :
// signé « L'équipe Tolia by Innobiz », réponses vers contact@innobiz.fr), dans la langue du site qu'il lisait.
const MERCI_FROM = "Tolia by Innobiz <noreply@innobiz-tolia.com>";
const MERCI_REPLY_TO = "contact@innobiz.fr";
const MERCI: Record<"fr" | "en" | "es", { subject: string; hello: (n: string) => string; lines: string[]; talk: string; question: string; bye: string; team: string; footer: string }> = {
  fr: {
    subject: "Votre échantillon Tolia est en préparation",
    hello: (n) => `Bonjour${n ? " " + n : ""},`,
    lines: ["Merci pour votre demande. Votre échantillon Tolia sera expédié de France sous 5 jours ouvrés, à cette adresse :", "Nous vous écrirons sous un jour ouvré pour parler de votre projet."],
    talk: "Vous préférez en parler de vive voix ? Simon Desbuisson vous propose 30 minutes en visio pour voir Tolia en direct :",
    question: "Une question, ou une erreur dans l'adresse ? Répondez simplement à cet email.",
    bye: "Bien cordialement,", team: "L'équipe Tolia by Innobiz", footer: "Tolia by Innobiz · Jacou, France · www.innobiz-tolia.com",
  },
  en: {
    subject: "Your Tolia sample is being prepared",
    hello: (n) => `Hello${n ? " " + n : ""},`,
    lines: ["Thank you for your request. Your Tolia sample will ship from France within 5 business days, to this address:", "We will write to you within one business day to talk about your project."],
    talk: "Would you rather talk it through? Simon Desbuisson offers you 30 minutes by video call to see Tolia live:",
    question: "A question, or a mistake in the address? Simply reply to this email.",
    bye: "Kind regards,", team: "The Tolia by Innobiz team", footer: "Tolia by Innobiz · Jacou, France · www.innobiz-tolia.com",
  },
  es: {
    subject: "Su muestra de Tolia está en preparación",
    hello: (n) => `Hola${n ? ", " + n : ""}:`,
    lines: ["Gracias por su solicitud. Su muestra de Tolia se enviará desde Francia en un plazo de 5 días hábiles a esta dirección:", "Le escribiremos en un día hábil para hablar de su proyecto."],
    talk: "¿Prefiere hablarlo de viva voz? Simon Desbuisson le propone 30 minutos por videollamada para ver Tolia en directo:",
    question: "¿Una pregunta o un error en la dirección? Simplemente responda a este email.",
    bye: "Atentamente,", team: "El equipo de Tolia by Innobiz", footer: "Tolia by Innobiz · Jacou, Francia · www.innobiz-tolia.com",
  },
};

const PROJECT_LABEL: Record<string, string> = {
  stock_order: "Stock order (500+ units)",
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
    // Anti-spam (21/10/2026) : un robot remplit le champ caché « hp » ; on répond « ok » sans rien enregistrer ni envoyer
    if (typeof body.hp === "string" && body.hp.trim() !== "") {
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    const {
      stage = "shipping",
      name, company, email, country, website, address,
      address_street, address_postal_code, address_city,
      role, phone, project_type, message,
      utm_source, utm_medium, utm_campaign, utm_term, utm_content,
      referrer, landing_page, lang,
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
      (website && website.length > 300) ||
      (address && address.length > 500) ||
      (role && role.length > 200) ||
      (phone && phone.length > 50) ||
      (message && message.length > 1000)
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
                ${website ? row("Site web", sanitize(website)) : ""}
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
                ${message ? row("Projet", sanitize(message).replace(/\n/g, "<br>")) : ""}
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

    // 22/10/2026 : un email qui ne part pas n'empêche plus l'envoi au CRM (avant : réponse 500 et demande perdue)
    const emailOk = emailResponse.ok;
    if (!emailOk) {
      const errorBody = await emailResponse.text();
      console.error("Resend API error:", errorBody);
    }

    // Alerte par email quand le CRM n'a pas reçu une adresse confirmée (pas de Slack dans ce projet)
    const alerteCrm = async (raison: string) => {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: FROM_ADDRESS,
            to: [TO_ADDRESS],
            subject: `⚠️ Échantillon NON transmis au CRM – ${sanitize(company || name || email)}`,
            html: `<div style="font-family:Arial,sans-serif;max-width:640px;">
              <p><strong>Cette demande d'échantillon n'est pas arrivée dans le CRM.</strong> À saisir à la main.</p>
              <p>Raison : ${sanitize(raison)}</p>
              <table style="border-collapse:collapse;">
                ${row("Nom", sanitize(name || ""))}${row("Société", sanitize(company || ""))}${row("Email", sanitize(email))}
                ${row("Pays", sanitize(country || ""))}${row("Adresse", sanitize(address || "").replace(/\n/g, "<br>"))}
                ${row("Téléphone", sanitize(phone || ""))}${row("Projet", sanitize(projectLabel))}
              </table></div>`,
          }),
        });
      } catch (e) {
        console.error("Alerte CRM impossible :", e);
      }
    };
    let crmOk = false;

    // --- CRM push (étape 2 uniquement : adresse confirmée) ---
    // Une erreur du CRM déclenche une alerte par email ; la réponse reste 200 si l'email de notification est parti.
    if (stage === "shipping" && address && String(address).trim().length > 0) {
      try {
        const sampleSecret = Deno.env.get("SAMPLE_REQUEST_SECRET");
        if (!sampleSecret) {
          console.error("SAMPLE_REQUEST_SECRET is not set — skipping CRM push");
          await alerteCrm("clé secrète du CRM absente côté serveur");
        } else {
          const streetPart = (address_street ?? "").trim();
          const postalPart = (address_postal_code ?? "").trim();
          const cityPart = (address_city ?? "").trim();
          const secondLine = [postalPart, cityPart].filter(Boolean).join(" ");
          const composedCrmAddress = (streetPart || postalPart || cityPart)
            ? [streetPart, secondLine].filter(Boolean).join("\n")
            : (address ?? "");


          const crmResponse = await fetch(
            "https://prospectiontolia.netlify.app/api/sample-request",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-sample-secret": sampleSecret,
              },
              body: JSON.stringify({
                name: name ?? "",
                email,
                company: company ?? "",
                country: country ?? "",
                address: composedCrmAddress,
                role: role ?? "",
                phone: phone ?? "",
                website: website ?? "",
                project_type: project_type ?? "",
                source: utm_source ?? "",
                utm_source: utm_source ?? "",
                utm_medium: utm_medium ?? "",
                utm_campaign: utm_campaign ?? "",
                utm_content: utm_content ?? "",
                referrer: referrer ?? "",
                landing_page: landing_page ?? "",
              }),
            },
          );
          const crmText = await crmResponse.text().catch(() => "");
          console.log("CRM push status:", crmResponse.status, "body:", crmText.slice(0, 500));
          if (!crmResponse.ok) {
            console.error("CRM push non-OK:", crmResponse.status, crmText);
            await alerteCrm(`le CRM a répondu ${crmResponse.status}`);
          } else {
            crmOk = true;
          }
        }
      } catch (crmError) {
        console.error("CRM push failed:", crmError);
        await alerteCrm("le CRM ne répond pas");
      }
    }
    // --- fin CRM push ---

    // la demande n'est enregistrée nulle part : le site affiche « l'envoi n'a pas fonctionné » et le visiteur réessaie
    if (!emailOk && !crmOk) {
      return new Response(
        JSON.stringify({ error: "Failed to send notification." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Email de remerciement au demandeur (étape 2 seulement, adresse confirmée) ; un échec ne bloque pas la réponse
    if (stage === "shipping" && address && String(address).trim().length > 0) {
      try {
        const L = lang === "en" || lang === "es" ? lang : "fr";
        const T = MERCI[L];
        const prenom = String(name || "").trim().split(/\s+/)[0] || "";
        const lien = `https://calendly.com/simon-innobiz/30min?utm_source=email&utm_medium=merci_echantillon&utm_content=lang_${L}`;
        const adresse = [sanitize(String(address)).replace(/\n/g, "<br>"), country ? sanitize(String(country)) : ""].filter(Boolean).join("<br>");
        const p = (t: string) => `<p style="margin:0 0 14px;">${t}</p>`;
        const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.55;color:#2b211b;max-width:600px;">
          ${p(sanitize(T.hello(prenom)))}
          ${p(sanitize(T.lines[0]))}
          <p style="margin:0 0 14px;padding:10px 14px;background:#f6efe6;border-radius:8px;">${adresse}</p>
          ${p(sanitize(T.lines[1]))}
          ${p(sanitize(T.talk) + `<br><a href="${lien}" style="color:#8c592c;">${lien.split("?")[0]}</a>`)}
          ${p(sanitize(T.question))}
          ${p(sanitize(T.bye) + "<br>" + sanitize(T.team))}
          <p style="margin:18px 0 0;font-size:12px;color:#7a6f63;">${sanitize(T.footer)}</p>
        </div>`;
        const r = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({ from: MERCI_FROM, to: [email], reply_to: MERCI_REPLY_TO, subject: T.subject, html }),
        });
        if (!r.ok) console.error("Email de remerciement non envoyé :", r.status, await r.text().catch(() => ""));
      } catch (e) {
        console.error("Email de remerciement impossible :", e);
      }
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
