import { supabase } from "@/lib/supabase";
import { createProductSlug } from "@/lib/utils";

export type Category = {
    id: number;
    slug: string;
    name_pl: string;
    name_uk: string;
};

export async function getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
        .from("categories")
        .select("id, slug, name_pl, name_uk")
        .order("created_at", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return data as Category[];
}

export async function createCategory(
    category: Omit<Category, "id">,
): Promise<Category> {
    const { data, error } = await supabase
        .from("categories")
        .insert(category)
        .select("id, slug, name_pl, name_uk")
        .single();

    if (error) throw new Error(error.message);

    return data as Category;
}

export async function updateCategory(
    id: number,
    category: Omit<Category, "id">
) {
    const { error } = await supabase
        .from("categories")
        .update(category)
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
}

export async function deleteCategory(id: number) {
    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
}

export async function categoryNameExists(
    namePl: string,
    nameUk: string,
    excludeId?: number
): Promise<boolean> {
    let query = supabase
        .from("categories")
        .select("id")
        .or(
            `name_pl.ilike.${namePl.trim()},name_uk.ilike.${nameUk.trim()}`
        );

    if (excludeId) {
        query = query.neq("id", excludeId);
    }

    const { data, error } = await query.limit(1);

    if (error) {
        throw new Error(error.message);
    }

    return data.length > 0;
}

export async function generateUniqueCategorySlug(
    categoryName: string
): Promise<string> {
    const baseSlug = createProductSlug(categoryName);

    let slug = baseSlug;
    let counter = 2;

    while (true) {
        const { data, error } = await supabase
            .from("categories")
            .select("slug")
            .eq("slug", slug)
            .maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        if (!data) {
            return slug;
        }

        slug = `${baseSlug}-${counter}`;
        counter++;
    }
}

export async function getCategoryProductCount(
    categorySlug: string,
): Promise<number> {
    const { count, error } = await supabase
        .from("products")
        .select("id", {
            count: "exact",
            head: true,
        })
        .eq("category", categorySlug);

    if (error) throw new Error(error.message);

    return count ?? 0;
}