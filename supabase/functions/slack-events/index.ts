import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

async function verifySlackSignature(
  req: Request,
  body: string,
  signingSecret: string
): Promise<boolean> {
  const timestamp = req.headers.get("x-slack-request-timestamp");
  const slackSignature = req.headers.get("x-slack-signature");
  if (!timestamp || !slackSignature) return false;

  // Reject requests older than 5 minutes
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp)) > 300) return false;

  const sigBaseString = `v0:${timestamp}:${body}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(signingSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(sigBaseString)
  );
  const hexSignature =
    "v0=" +
    Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

  return hexSignature === slackSignature;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SLACK_SIGNING_SECRET = Deno.env.get("SLACK_SIGNING_SECRET");
    if (!SLACK_SIGNING_SECRET) {
      throw new Error("SLACK_SIGNING_SECRET is not configured");
    }

    const bodyText = await req.text();

    // Verify Slack signature
    const isValid = await verifySlackSignature(req, bodyText, SLACK_SIGNING_SECRET);
    if (!isValid) {
      console.error("Invalid Slack signature");
      return new Response("Invalid signature", { status: 401 });
    }

    const payload = JSON.parse(bodyText);

    // Handle URL verification challenge
    if (payload.type === "url_verification") {
      return new Response(JSON.stringify({ challenge: payload.challenge }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Handle event callbacks
    if (payload.type === "event_callback") {
      const event = payload.event;

      // Only process messages that are thread replies (have thread_ts different from ts)
      // and are not from bots
      if (
        event.type === "message" &&
        event.thread_ts &&
        event.thread_ts !== event.ts &&
        !event.bot_id &&
        !event.subtype
      ) {
        const threadTs = event.thread_ts;
        const replyText = event.text;

        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // Find the contact associated with this thread
        const { data: contact, error: contactError } = await supabase
          .from("chat_contacts")
          .select("id")
          .eq("slack_thread_ts", threadTs)
          .maybeSingle();

        if (contactError) {
          console.error("Error finding contact:", contactError);
          return new Response("OK", { status: 200 });
        }

        if (!contact) {
          console.log("No contact found for thread_ts:", threadTs);
          return new Response("OK", { status: 200 });
        }

        // Insert the reply as an admin message
        const { error: insertError } = await supabase
          .from("chat_messages")
          .insert({
            contact_id: contact.id,
            sender: "admin",
            message: replyText,
          });

        if (insertError) {
          console.error("Error inserting message:", insertError);
        } else {
          console.log("Slack reply inserted for contact:", contact.id);
        }
      }
    }

    return new Response("OK", { status: 200 });
  } catch (error: any) {
    console.error("Error in slack-events:", error);
    return new Response("Internal error", { status: 500 });
  }
});
