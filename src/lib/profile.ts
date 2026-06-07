import { supabase } from "@/lib/supabase";
import type { Profile } from "@/types/profile";

export async function getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
        .from("profiles")
        .select("id, email, role")
        .eq("id", userId)
        .single();

    if (error) {
        return null;
    }

    return data as Profile;
}