import { apiClient } from "@/core/api/apiClient";
import type { Order, UpdateOrderDTO } from "../types";
import { normalizeOrder } from "@/shared/helpers/normalize";

export const updateOrder = async (id: number, form: UpdateOrderDTO): Promise<Order | null> => {
  try {
    const response = await apiClient.put(`/api/orders/${id}/status`, form);
    const data: Order = response.data;
    const normalize = normalizeOrder(data);
    return normalize;
  } catch (error) {
    console.error("Error updating order:", error);
    return null;
  }
};
