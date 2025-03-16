import { SupabaseClient } from "@supabase/supabase-js";

export const supabase = new SupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export const testConnection = () => {
    supabase
        .from("contactus")
        .select("*")
        .then((res) => {
        console.log("Connection to Supabase successful", res);
        })
        .catch((err) => {
        console.error("Error connecting to Supabase", err);
        });
}