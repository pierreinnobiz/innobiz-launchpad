import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { data: isAdmin } = await supabaseAuth.rpc('check_my_role', { _role: 'admin' });
    if (!isAdmin) {
      return new Response(
        JSON.stringify({ error: "Forbidden - Admin access required" }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const fileId = "18Z05L6cePbkaQlixsBSxSCpPvm8rxD7c";
    
    // Step 1: Get the actual download URL by following redirects with confirm=t
    // Google Drive requires cookies from first request for large files
    const initialUrl = `https://drive.google.com/uc?export=download&id=${fileId}&confirm=t`;
    
    console.log("Attempting download from Google Drive...");
    
    const response = await fetch(initialUrl, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      throw new Error(`Download failed with status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "";
    console.log(`Response content-type: ${contentType}`);
    
    // If we got HTML, it means Google is showing a confirmation page
    if (contentType.includes("text/html")) {
      const html = await response.text();
      console.log(`Got HTML page (${html.length} chars), trying to extract download link...`);
      
      // Try to extract the actual download URL from the confirmation page
      const match = html.match(/href="(\/uc\?export=download[^"]+)"/);
      if (match) {
        const confirmUrl = `https://drive.google.com${match[1].replace(/&amp;/g, "&")}`;
        console.log(`Found confirm URL, downloading...`);
        
        const confirmResponse = await fetch(confirmUrl, {
          redirect: "follow",
          headers: { "User-Agent": "Mozilla/5.0" },
        });
        
        if (!confirmResponse.ok) {
          throw new Error(`Confirm download failed: ${confirmResponse.status}`);
        }
        
        const videoData = await confirmResponse.arrayBuffer();
        console.log(`Downloaded ${videoData.byteLength} bytes from confirm URL`);
        
        if (videoData.byteLength < 10000) {
          throw new Error(`File too small (${videoData.byteLength} bytes). Google Drive may be blocking the download. Please upload the video manually to the 'videos' storage bucket.`);
        }
        
        return await uploadToStorage(videoData);
      }
      
      throw new Error("Could not extract download link from Google Drive confirmation page. Please upload the video manually to the 'videos' storage bucket.");
    }

    const videoData = await response.arrayBuffer();
    console.log(`Downloaded ${videoData.byteLength} bytes`);

    if (videoData.byteLength < 10000) {
      throw new Error(`File too small (${videoData.byteLength} bytes). Google Drive may be blocking the download. Please upload the video manually to the 'videos' storage bucket.`);
    }

    return await uploadToStorage(videoData);
  } catch (err: any) {
    console.error("Error:", err.message);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});

async function uploadToStorage(videoData: ArrayBuffer) {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { error } = await supabase.storage
    .from("videos")
    .upload("tolia-hero.mov", videoData, {
      contentType: "video/quicktime",
      upsert: true,
    });

  if (error) {
    throw new Error(`Upload to storage failed: ${error.message}`);
  }

  const { data: urlData } = supabase.storage
    .from("videos")
    .getPublicUrl("tolia-hero.mov");

  return new Response(
    JSON.stringify({ success: true, url: urlData.publicUrl, size: videoData.byteLength }),
    { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
  );
}
