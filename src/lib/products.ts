import { supabase } from "@/lib/supabase";
import type { Product } from "@/types/product";
import { createProductSlug } from "@/lib/utils";

type ProductRow = {
    id: string;
    slug: string;
    sku: string | null;
    name_pl: string;
    name_uk: string;
    description_pl: string;
    description_uk: string;
    price: number;
    image_url: string | null;
    image_urls: string[] | null;
    category: string;
    stock: number;
    is_available: boolean;
};

function mapProductRowToProduct(product: ProductRow): Product {
    return {
        id: product.slug,
        slug: product.slug,
        sku: product.sku ?? "",
        name: {
            pl: product.name_pl,
            uk: product.name_uk,
        },
        description: {
            pl: product.description_pl,
            uk: product.description_uk,
        },
        price: Number(product.price),
        images:
            product.image_urls && product.image_urls.length > 0
                ? product.image_urls
                : product.image_url
                    ? [product.image_url]
                    : [],
        category: product.category,
        stock: product.stock,
        isAvailable: product.is_available,
    };
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_available", true)
        .eq("is_featured", true)
        .order("featured_order", { ascending: true })
        .limit(limit);

    if (error) {
        throw new Error(error.message);
    }

    return (data as ProductRow[]).map(mapProductRowToProduct);
}

export async function getProducts(limit = 24): Promise<Product[]> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("is_available", { ascending: false })
        .order("stock", { ascending: false })
        .order("created_at", { ascending: true })
        .limit(limit);

    if (error) {
        throw new Error(error.message);
    }

    return (data as ProductRow[]).map(mapProductRowToProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) {
        return null;
    }

    return mapProductRowToProduct(data as ProductRow);
}

export async function getAdminProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
        .order("name_pl", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return (data as ProductRow[]).map(mapProductRowToProduct);
}

export async function searchProducts({
    query,
    category,
    page = 1,
    limit = 24,
}: {
    query?: string;
    category?: string;
    page?: number;
    limit?: number;
}): Promise<{
    products: Product[];
    totalCount: number;
    totalPages: number;
}> {
    const normalizedQuery = query?.trim() ?? "";

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let request = supabase
        .from("products")
        .select("*", { count: "exact" });

    if (normalizedQuery) {
        request = request.or(
            `name_pl.ilike.%${normalizedQuery}%,name_uk.ilike.%${normalizedQuery}%,description_pl.ilike.%${normalizedQuery}%,description_uk.ilike.%${normalizedQuery}%,category.ilike.%${normalizedQuery}%`,
        );
    }

    if (category && category !== "all") {
        request = request.eq("category", category);
    }

    const { data, error, count } = await request
        .order("is_available", { ascending: false })
        .order("stock", { ascending: false })
        .order("created_at", { ascending: true })
        .range(from, to);

    if (error) {
        throw new Error(error.message);
    }

    const totalCount = count ?? 0;
    const totalPages = Math.ceil(totalCount / limit);

    return {
        products: (data as ProductRow[]).map(mapProductRowToProduct),
        totalCount,
        totalPages,
    };
}

export async function updateProductStock(
    productId: string,
    stock: number,
): Promise<void> {
    const { error } = await supabase
        .from("products")
        .update({
            stock,
            is_available: stock > 0,
        })
        .eq("slug", productId);

    if (error) {
        throw new Error(error.message);
    }
}

export async function updateProductPrice(
    productId: string,
    price: number,
): Promise<void> {
    const { error } = await supabase
        .from("products")
        .update({
            price,
        })
        .eq("slug", productId);

    if (error) {
        throw new Error(error.message);
    }
}

export type CreateProductInput = {
    slug: string;
    name_pl: string;
    name_uk: string;
    description_pl: string;
    description_uk: string;
    price: number;
    image_url?: string;
    image_urls?: string[];
    category: string;
    stock: number;
    is_available: boolean;
};

export async function createProduct(
    product: CreateProductInput,
): Promise<Product> {
    const { data, error } = await supabase
        .from("products")
        .insert(product)
        .select("*")
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return mapProductRowToProduct(data as ProductRow);
}

export async function deleteProduct(productId: string): Promise<void> {
    const { error } = await supabase
        .from("products")
        .delete()
        .eq("slug", productId);

    if (error) {
        throw new Error(error.message);
    }
}

export async function updateProductAvailability(
    productId: string,
    isAvailable: boolean,
): Promise<void> {
    const { error } = await supabase
        .from("products")
        .update({
            is_available: isAvailable,
        })
        .eq("slug", productId);

    if (error) {
        throw new Error(error.message);
    }
}

export async function updateProduct(
    slug: string,
    product: Partial<CreateProductInput>,
): Promise<void> {
    const { error } = await supabase
        .from("products")
        .update(product)
        .eq("slug", slug);

    if (error) {
        throw new Error(error.message);
    }
}

export async function uploadProductImage(file: File): Promise<string> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error } = await supabase.storage
        .from("product-images")
        .upload(filePath, file);

    if (error) {
        throw new Error(error.message);
    }

    const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

    return data.publicUrl;
}

export async function generateUniqueSlug(
    productName: string,
): Promise<string> {
    const baseSlug = createProductSlug(productName);

    let slug = baseSlug;
    let counter = 2;

    while (true) {
        const { data } = await supabase
            .from("products")
            .select("slug")
            .eq("slug", slug)
            .maybeSingle();

        if (!data) {
            return slug;
        }

        slug = `${baseSlug}-${counter}`;
        counter++;
    }
}