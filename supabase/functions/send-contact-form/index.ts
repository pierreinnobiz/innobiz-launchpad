// 27/11/2026 : fonction désactivée (audit sécurité).
// Le site ne l'appelle plus : le formulaire d'échantillon passe par send-qualification-form, qui fait
// aussi le push CRM. Restée en ligne, elle permettait à n'importe qui de faire envoyer un email
// « brand deck » depuis innobiz-tolia.com à n'importe quelle adresse, sans champ piège ni limite.
// L'ancien code est dans l'historique git (commit 4dc2a84 et antérieurs).
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve((req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  return new Response(JSON.stringify({ error: "This endpoint has been retired." }), {
    status: 410,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
});
