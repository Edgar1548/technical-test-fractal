import { apiClient } from "@/core/api/apiClient";

export const deleteOrder = async (id: number): Promise<boolean> => {
  try {
    await apiClient.delete(`/api/orders/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting order:", error);
    return false;
  }
};
