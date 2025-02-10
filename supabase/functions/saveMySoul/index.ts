// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

console.log("Hello from Functions!")

Deno.serve(async (req) => {
  try {
    const { name } = await req.json();

    console.log("Received name:", name);

    // Prepare a message for Discord
    const discordWebhookUrl = "https://discord.com/api/webhooks/1338562339024408636/98W6G-u2Y43T8ourPXPFOWmRCC_xtm2f0_6Aux9G_BjyLNKZwh78WbLy6uOL_wRWyA0B"; // Replace with your actual webhook URL
    const message = {
      content: `🔥 Supabase function 'saveMySoul' executed!\n\n👤 Name: ${name}\n⏳ Timestamp: ${new Date().toISOString()}`
    };

    // Send a POST request to Discord
    const discordResponse = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    });

    if (!discordResponse.ok) {
      console.error("Failed to send message to Discord:", await discordResponse.text());
    }

    // Respond to Supabase
    return new Response(
      JSON.stringify({ message: `Hello ${name}!`, status: "Logged to Discord" }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing request:", error);

    return new Response(
      JSON.stringify({ error: "Invalid request payload" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/savemysoul' \
    --header 'Authorization: Bearer ' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
