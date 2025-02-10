// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

console.log('Hello from Functions!');

Deno.serve(async req => {
  const { name } = await req.json();
  const data = {
    message: `Hello ${name}!`,
  };

  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/sos' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
// Function to keep the project alive
// async function keepAlive() {
//   try {
//     const response = await fetch(Deno.env.get("SUPABASE_URL") + "/rest/v1/", {
//       headers: {
//         "apikey": Deno.env.get("SUPABASE_ANON_KEY") || "",
//       }
//     });
//     console.log("Keep-alive ping sent:", response.status);
//   } catch (error) {
//     console.error("Keep-alive error:", error);
//   }
// }

// // Run keep-alive every week (in milliseconds)
// setInterval(keepAlive, 7 * 24 * 60 * 60 * 1000);
