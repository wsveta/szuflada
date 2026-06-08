import { supabase } from "@/lib/supabase";

export type CheckoutProfile = {
    id: string;
    user_id: string;

    first_name: string | null;
    last_name: string | null;
    email: string | null;
    phone: string | null;

    address_line_1: string | null;
    address_line_2: string | null;
    city: string | null;
    postal_code: string | null;
    country: string | null;

    note: string | null;

    created_at: string;
    updated_at: string;
};

export type CheckoutProfileInput = {
    user_id: string;

    first_name: string;
    last_name: string;
    email: string;
    phone: string;

    address_line_1: string;
    address_line_2: string;
    city: string;
    postal_code: string;
    country: string;

    note: string;
};

export async function getCheckoutProfile(
    userId: string,
): Promise<CheckoutProfile | null> {
    const { data, error } = await supabase
        .from("checkout_profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data as CheckoutProfile | null;
}

export async function upsertCheckoutProfile(
    profile: CheckoutProfileInput,
): Promise<CheckoutProfile> {
    const { data, error } = await supabase
        .from("checkout_profiles")
        .upsert(profile, {
            onConflict: "user_id",
        })
        .select("*")
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data as CheckoutProfile;
}