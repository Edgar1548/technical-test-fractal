import { apiClient } from "@/core/api/apiClient"
import type { CreateOrderDTO, Order } from "../types"
import { normalizeOrder } from "@/shared/helpers/normalize";
export const createOrder = async (form: CreateOrderDTO): Promise<Order | null> => {
    try {
        console.log(form);
        const response = await apiClient.post("/api/orders", {

            order_number: form.order_number,
            products: form.products
        });
        const data = response.data;
        const normalized = normalizeOrder(data);
        return normalized;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return null;
    }
};