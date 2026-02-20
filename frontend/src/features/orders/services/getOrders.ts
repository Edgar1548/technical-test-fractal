import { apiClient } from "@/core/api/apiClient"
import type { Order } from "../types"
import { normalizeOrder } from "@/shared/helpers/normalize";
export const getOrders = async (): Promise<Order[]> => {
    try {
        const response = await apiClient.get("/api/orders");
        const data = response.data;
        if (!Array.isArray(data)) {
            return [];
        }
        return data.map((order: Order) => (normalizeOrder(order)));

    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
};
