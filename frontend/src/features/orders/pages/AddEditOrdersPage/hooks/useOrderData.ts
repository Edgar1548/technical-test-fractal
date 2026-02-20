import { useEffect, useState } from "react";
import { getProducts } from "@/features/products/services/getProducts";
import { getOrderById } from "@/features/orders/services/getOrderById";
import type { Product } from "@/features/products/types";
import type { Order } from "@/features/orders/types";


export const useOrderData = (numericId: number|null) => {
    const [catalog, setCatalog] = useState<Product[]>([]);
    const [order, setOrder] = useState<Order | null>(null);

    const isEditMode = Boolean(numericId);
    const isCompletedOrder = order?.status === "completed";

    useEffect(() => {
        getProducts().then(setCatalog);
    }, []);

    useEffect(() => {
        if (!numericId) return;
        getOrderById(numericId).then(setOrder);
    }, [numericId]);

    return {
        catalog,
        order,
        setOrder,
        isEditMode,
        isCompletedOrder,
    };
}