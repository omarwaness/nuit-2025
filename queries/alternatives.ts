import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

/**
 * Fetch all alternatives ordered by upvotes
 */
export async function getAlternatives() {
  const { data, error } = await supabase
    .from("alternatives")
    .select("*")
    .order("upvotes", { ascending: false });

  if (error) {
    console.error("Error fetching alternatives:", error);
    return [];
  }
  return data;
}

/**
 * Fetch a single alternative by ID
 */
export async function getAlternativeById(id: number) {
  const { data, error } = await supabase
    .from("alternatives")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching alternative with id ${id}:`, error);
    return null;
  }
  return data;
}

/**
 * Upvote an alternative
 */
export async function upvoteAlternative(id: number) {
  const { data, error } = await supabase
    .from("alternatives")
    .update({ upvotes: supabase.rpc('increment', { col: 'upvotes' }) }) // optional: increment
    .eq("id", id);

  if (error) {
    console.error(`Error upvoting alternative ${id}:`, error);
    return null;
  }
  return data;
}
