"use server";

import { supabase } from "../../supabase.config";
import { openai } from "../../utils/openai/admin";

/* -------------------------------- embedding ------------------------------- */
export async function generateEmbedding(text: string): Promise<number[]> {
  if (!text) throw new Error("Text input is required");

  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-large", // Ensure model matches stored embeddings
      input: text,
      dimensions: 512, // Match your vector size in Supabase
    });
    console.log("json", JSON.stringify(response, null, 2))

    return response.data[0].embedding; // Return the embedding array
  } catch (error: any) {
    console.error("OpenAI Embedding Error:", error);
    throw new Error(error.message || "Failed to generate embedding");
  }
}


/* ------------------------------ hybrid search ----------------------------- */
export async function hybridSearch(query: string) {
  if (!query) return { error: "No query provided" };

  try {
    // 🔥 Use utility function to generate the embedding
    const queryEmbedding = await generateEmbedding(query);

    // 🔥 Call Supabase hybrid_search function
    const { data, error } = await supabase.rpc("hybrid_search", {
      query_text: query,
      query_embedding: queryEmbedding,
      match_count: 10,
    });

    if (error) throw error;

    return { data };
  } catch (error: any) {
    console.error("Hybrid Search Error:", error);
    return { error: error.message };
  }
}
