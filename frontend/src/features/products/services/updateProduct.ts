import { apiClient } from "@/core/api/apiClient";
import { normalizeProduct } from "@/shared/helpers/normalize";
import type { Product, ProductPayload } from "../types";

export const updateProduct = async (id: number, payload: ProductPayload): Promise<Product | null> => {
  try {
    const response = await apiClient.put(`/api/products/${id}`, payload);
    const data = response.data;
    const normalize = normalizeProduct(data);
    return normalize;
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
};
