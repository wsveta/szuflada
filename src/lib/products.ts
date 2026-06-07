import { supabase } from "@/lib/supabase";
import type { Product } from "@/types/product";

type ProductRow = {
  id: string;
  slug: string;
  name_pl: string;
  name_uk: string;
  description_pl: string;
  description_uk: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
  is_available: boolean;
};

function mapProductRowToProduct(product: ProductRow): Product {
  return {
    id: product.slug,
    slug: product.slug,
    name: {
      pl: product.name_pl,
      uk: product.name_uk,
    },
    description: {
      pl: product.description_pl,
      uk: product.description_uk,
    },
    price: Number(product.price),
    image: product.image_url,
    category: product.category,
    stock: product.stock,
    isAvailable: product.is_available,
  };
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

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

export async function searchProducts({
  query,
  category,
}: {
  query?: string;
  category?: string;
}): Promise<Product[]> {
  const normalizedQuery = query?.trim() ?? "";

  let request = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  if (normalizedQuery) {
    request = request.or(
      `name_pl.ilike.%${normalizedQuery}%,name_uk.ilike.%${normalizedQuery}%,description_pl.ilike.%${normalizedQuery}%,description_uk.ilike.%${normalizedQuery}%,category.ilike.%${normalizedQuery}%`
    );
  }

  if (category && category !== "all") {
    request = request.eq("category", category);
  }

  const { data, error } = await request;

  if (error) {
    throw new Error(error.message);
  }

  return (data as ProductRow[]).map(mapProductRowToProduct);
}