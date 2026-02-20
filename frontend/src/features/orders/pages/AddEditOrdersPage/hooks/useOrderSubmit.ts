import { useState } from "react";
import { createOrder } from "@/features/orders/services/createOrder";
import { updateOrder } from "@/features/orders/services/updateOrder";
import type { Order, OrderProduct, OrderProductPayload } from "@/features/orders/types";
interface UseOrderSubmitProps {
  isEditMode: boolean;
  numericId: number | null;
  order: Order | null;
  orderNumber: string;
  displayProducts: OrderProduct[];
  localProducts: OrderProductPayload[];
  navigate: (path: string) => void;
}

export default function useOrderSubmit({
  isEditMode,
  numericId,
  order,
  orderNumber,
  displayProducts,
  localProducts,
  navigate,
}: UseOrderSubmitProps ) {
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    if (!orderNumber.trim() || displayProducts.length === 0) return;

    setIsLoading(true);

    try {
      if (!isEditMode) {
        await createOrder({
          order_number: orderNumber,
          products: localProducts,
        });
      } else if (numericId) {
        await updateOrder(numericId, {
          order_number: orderNumber,
          products: displayProducts.map(p => ({
            product_id: p.product_id,
            qty: p.qty,
          })),
          status: order?.status,
        });
      }

      navigate("/my-orders");
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading };
}