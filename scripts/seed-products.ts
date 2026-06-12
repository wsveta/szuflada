import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { productsForSupabase } from "../src/data/products";

loadEnvConfig(process.cwd());

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
    process.env.SUPABASE_SECRET_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
}

if (!supabaseKey) {
    throw new Error(
        "Missing SUPABASE_SECRET_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
    );
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedProducts() {
    const { data, error } = await supabase
        .from("products")
        .upsert(productsForSupabase, {
            onConflict: "slug",
        })
        .select();

    if (error) {
        console.error("Seed error:", error);
        return;
    }

    console.log(`Products seeded: ${data.length}`);
}

seedProducts();
