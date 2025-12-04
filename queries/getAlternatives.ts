// lib/queries/getAlternatives.ts
import { createClient } from "@/lib/supabase/client";

export async function getAlternatives() {
  const supabase = createClient();

  const { data, error } = await supabase.from("alternatives").select("*");

  if (error) {
    console.error("Error fetching alternatives:", error);
    return [];
  }

  return data;
}
