import { supabase } from "@/lib/supabase";

export type Order = {
    id: number;
    order_code: string;
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
        .select("id, order_code, status, total_amount, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data as Order[];
}

export async function getOrderByCode(
    orderCode: string,
    userId: string,
): Promise<OrderDetails | null> {
    const { data: order, error: orderError } = await supabase
        .from("orders")
        .select("id, order_code, status, total_amount, created_at")
        .eq("order_code", orderCode)
        .eq("user_id", userId)
        .maybeSingle();

    if (orderError) {
        throw new Error(orderError.message);
    }

    if (!order) {
        return null;
    }

    const { data: items, error: itemsError } = await supabase
        .from("order_items")
        .select("id, product_slug, product_name, quantity, unit_price")
        .eq("order_id", order.id);

    if (itemsError) {
        throw new Error(itemsError.message);
    }

    return {
        ...(order as Order),
        items: items as OrderItem[],
    };
}

export async function getOrderById(
    orderId: number,
    userId: string,
): Promise<OrderDetails | null> {
    const { data: order, error: orderError } = await supabase
        .from("orders")
        .select("id, order_code, status, total_amount, created_at")
        .eq("id", orderId)
        .eq("user_id", userId)
        .maybeSingle();

    if (orderError) {
        throw new Error(orderError.message);
    }

    if (!order) {
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

export async function getAllOrders({
    page = 1,
    limit = 10,
}: {
    page?: number;
    limit?: number;
} = {}): Promise<{
    orders: Order[];
    totalCount: number;
    totalPages: number;
}> {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
        .from("orders")
        .select("id, order_code, status, total_amount, created_at", {
            count: "exact",
        })
        .order("created_at", { ascending: false })
        .range(from, to);

    if (error) {
        throw new Error(error.message);
    }

    const totalCount = count ?? 0;
    const totalPages = Math.ceil(totalCount / limit);

    return {
        orders: data as Order[],
        totalCount,
        totalPages,
    };
}

export async function updateOrderStatus(
    orderId: number,
    status: string,
): Promise<void> {
    const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId);

    if (error) {
        throw new Error(error.message);
    }
}

export async function getAdminOrderById(
    orderId: number,
): Promise<OrderDetails | null> {
    const { data: order, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .maybeSingle();

    if (orderError) {
        throw new Error(orderError.message);
    }

    if (!order) {
        return null;
    }

    const { data: items, error: itemsError } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId);

    if (itemsError) {
        throw new Error(itemsError.message);
    }

    return {
        ...(order as Order),
        items: items as OrderItem[],
    };
}