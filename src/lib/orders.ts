import { supabase } from "@/lib/supabase";

export type Order = {
    id: number;
    status: string;
    total_amount: number;
    created_at: string;
};

export type OrderItem = {
    id: number;
    product_slug: string;
    product_name: string;
    quantity: number;
    unit_price: number;
};

export type OrderDetails = Order & {
    items: OrderItem[];
};

export async function getUserOrders(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
        .from("orders")
        .select("id, status, total_amount, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data as Order[];
}

export async function getOrderById(
    orderId: number,
    userId: string
): Promise<OrderDetails | null> {
    const { data: order, error: orderError } = await supabase
        .from("orders")
        .select("id, status, total_amount, created_at")
        .eq("id", orderId)
        .eq("user_id", userId)
        .single();

    if (orderError || !order) {
        return null;
    }

    const { data: items, error: itemsError } = await supabase
        .from("order_items")
        .select("id, product_slug, product_name, quantity, unit_price")
        .eq("order_id", orderId);

    if (itemsError) {
        throw new Error(itemsError.message);
    }

    return {
        ...(order as Order),
        items: items as OrderItem[],
    };
}