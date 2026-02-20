import { useMemo, useState } from "react";
import type { Product } from "@/features/products/types";
import type { OrderProduct, OrderProductPayload } from "@/features/orders/types";

const getTodayDate = (): string =>
  new Date().toLocaleDateString();

export const useOrderDraft = (catalog: Product[], initialProducts: OrderProduct[] = []) => {
  const [localProducts, setLocalProducts] = useState<OrderProductPayload[]>([]);

  const tableProducts = useMemo(() => {
    if (initialProducts.length > 0) {
      return initialProducts;
    }

    return localProducts.map((item, index) => {
      const product = catalog.find((catalogItem) => catalogItem.id === item.product_id);
      const unitPrice = product?.unit_price ?? 0;

      return {
        id: index + 1,
        product_id: item.product_id,
        name: product?.name ?? "Unknown",
        unit_price: unitPrice,
        qty: item.qty,
        total_price: unitPrice * item.qty,
      } satisfies OrderProduct;
    });
  }, [catalog, initialProducts, localProducts]);

  const { totalPrice, productsCount } = useMemo(() => {
    return tableProducts.reduce(
      (acc, item) => {
        acc.totalPrice += item.total_price;
        acc.productsCount += item.qty;
        return acc;
      },
      { totalPrice: 0, productsCount: 0 }
    );
  }, [tableProducts]);



  return {
    localProducts,
    setLocalProducts,
    tableProducts,
    productsCount,
    totalPrice,
    draftDate: getTodayDate(),
  };
};
