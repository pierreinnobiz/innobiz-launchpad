import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/slack/api";
const SLACK_CHANNEL = "projet-tolia";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const SLACK_API_KEY = Deno.env.get("SLACK_API_KEY");
    if (!SLACK_API_KEY) {
      throw new Error("SLACK_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { firstName, lastName, email, phone, message, contactId } = await req.json();

    if (!firstName || !lastName || !message || !contactId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const gatewayHeaders = {
      "Authorization": `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": SLACK_API_KEY,
      "Content-Type": "application/json; charset=utf-8",
    };

    // Find the #projet-tolia channel using POST
    const channelsRes = await fetch(`${GATEWAY_URL}/conversations.list`, {
      method: "POST",
      headers: gatewayHeaders,
      body: JSON.stringify({ types: "public_channel,private_channel", limit: 200 }),
    });
    const channelsData = await channelsRes.json();
    

    if (!channelsRes.ok) {
      throw new Error(`Slack conversations.list failed [${channelsRes.status}]: ${JSON.stringify(channelsData)}`);
    }

    const toliaChannel = channelsData.channels?.find(
      (ch: any) => ch.name === SLACK_CHANNEL
    );

    if (!toliaChannel) {
      console.error("Channel not found. Available:", channelsData.channels?.map((c: any) => c.name));
      return new Response(
        JSON.stringify({ success: false, warning: `Slack channel #${SLACK_CHANNEL} not found.` }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const sanitize = (s: string) => s.replace(/[&<>"']/g, "");

    // Check if this contact already has a Slack thread
    const { data: contact } = await supabase
      .from("chat_contacts")
      .select("slack_thread_ts")
      .eq("id", contactId)
      .maybeSingle();

    const existingThreadTs = contact?.slack_thread_ts;

    if (existingThreadTs) {
      // Post as a reply in the existing thread
      const replyRes = await fetch(`${GATEWAY_URL}/chat.postMessage`, {
        method: "POST",
        headers: gatewayHeaders,
        body: JSON.stringify({
          channel: toliaChannel.id,
          thread_ts: existingThreadTs,
          text: `💬 *${sanitize(firstName)} ${sanitize(lastName)}:*\n${sanitize(message).substring(0, 2900)}`,
        }),
      });
      const replyData = await replyRes.json();

      if (!replyData.ok) {
        console.error("Slack reply error:", replyData);
        throw new Error(`Slack API failed [${replyRes.status}]: ${JSON.stringify(replyData)}`);
      }
    } else {
      // First message: create a new thread
      const slackMessage = {
        channel: toliaChannel.id,
        text: `💬 Nouveau contact : ${sanitize(firstName)} ${sanitize(lastName)}`,
        blocks: [
          {
            type: "header",
            text: { type: "plain_text", text: `💬 ${sanitize(firstName)} ${sanitize(lastName)}`, emoji: true },
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*Email:*\n${sanitize(email || "")}` },
              { type: "mrkdwn", text: `*Téléphone:*\n${sanitize(phone || "")}` },
            ],
          },
          { type: "divider" },
          {
            type: "section",
            text: { type: "mrkdwn", text: `> ${sanitize(message).substring(0, 2900)}` },
          },
          {
            type: "context",
            elements: [
              { type: "mrkdwn", text: `Répondez dans ce thread pour envoyer un message au visiteur 🔄` },
            ],
          },
        ],
      };

      const postToSlack = async () => {
        return await fetch(`${GATEWAY_URL}/chat.postMessage`, {
          method: "POST",
          headers: gatewayHeaders,
          body: JSON.stringify(slackMessage),
        });
      };

      let postRes = await postToSlack();
      let postData = await postRes.json();

      // If bot is not in channel, try to join
      if (!postData.ok && postData.error === "not_in_channel") {
        console.log("Bot not in channel, attempting to join...");
        const joinRes = await fetch(`${GATEWAY_URL}/conversations.join`, {
          method: "POST",
          headers: gatewayHeaders,
          body: JSON.stringify({ channel: toliaChannel.id }),
        });
        const joinData = await joinRes.json();
        console.log("conversations.join result:", JSON.stringify(joinData));
        
        if (joinData.ok) {
          postRes = await postToSlack();
          postData = await postRes.json();
        } else {
          console.error("Could not join channel. Please invite the bot to #" + SLACK_CHANNEL + " manually.");
        }
      }

      if (!postData.ok) {
        throw new Error(`Slack API failed [${postRes.status}]: ${JSON.stringify(postData)}`);
      }

      // Store the thread_ts for future replies
      if (postData.ts) {
        const { error: updateError } = await supabase
          .from("chat_contacts")
          .update({ slack_thread_ts: postData.ts })
          .eq("id", contactId);

        if (updateError) {
          console.error("Error saving thread_ts:", updateError);
        }
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-slack-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
