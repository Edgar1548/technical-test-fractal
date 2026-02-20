import { apiClient } from "@/core/api/apiClient";

export const deleteProduct = async (id: number): Promise<boolean> => {
  try {
    await apiClient.delete(`/api/products/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
};
