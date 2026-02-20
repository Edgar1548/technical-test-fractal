import type { Order, OrderProduct } from "@/features/orders/types"
import type { Product } from "@/features/products/types";
export const normalizeOrder = (data: Order) => {
    const normalized: Order = {
        ...data,
        total: Number(data.total),
        products: data.products?.map((product: OrderProduct) => ({
            ...product,
            unit_price: Number(product.unit_price),
            qty: Number(product.qty),
            total_price: Number(product.total_price),
        })),
    };
    return normalized;
}

export const normalizeProduct = (data: Product) => {
    const normalized: Product = {
        ...data,
        unit_price: Number(data.unit_price),
    };
    return normalized;
}