import { supabase } from './lib/supabase';


export async function fetchData() {
  try {
    const { data, error } = await supabase.from("products").select("*");
    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
