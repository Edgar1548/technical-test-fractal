import { apiClient } from "@/core/api/apiClient"
import { normalizeProduct } from "@/shared/helpers/normalize";
import type { Product } from "../types"

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await apiClient.get("/api/products");
        const data: Product[] = response.data;

        if (!Array.isArray(data)) {
            return [];
        }
        return data.map((product: Product) => (normalizeProduct(product)));

        return data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
};
