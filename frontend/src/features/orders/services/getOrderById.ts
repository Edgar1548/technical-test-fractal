import { apiClient } from "@/core/api/apiClient";
import type { Order } from "../types";
import { normalizeOrder } from "@/shared/helpers/normalize";
export const getOrderById = async (id: number): Promise<Order | null> => {
  try {
    const response = await apiClient.get(`/api/orders/${id}`);
    const data = response.data;

    if (!data || Array.isArray(data)) {
      return null;
    }
    const normalized = normalizeOrder(data);
    return normalized;

  } catch (error) {
    console.error("Error fetching order by id:", error);
    return null;
  }
};