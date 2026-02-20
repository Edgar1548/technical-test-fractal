import { apiClient } from "@/core/api/apiClient";
import type { Product, ProductPayload } from "../types";
import { normalizeProduct } from "@/shared/helpers/normalize";

export const createProduct = async (payload: ProductPayload): Promise<Product | null> => {
  try {
    const response = await apiClient.post("/api/products", payload);
    const data = response.data;
    const normalize = normalizeProduct(data);
    return normalize;

  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
};
