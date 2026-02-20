import { useCallback, useEffect, useMemo, useState } from "react";
import type { Status } from "@/core/types";
import type { Order } from "@/features/orders/types";
import { deleteOrder } from "@/features/orders/services/deleteOrder";
import { getOrders } from "@/features/orders/services/getOrders";
import { updateOrder } from "@/features/orders/services/updateOrder";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getOrders();
      console.log(response);
      setOrders(response);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchOrders();
  }, [fetchOrders]);

  const handleDeleteOrder = useCallback(async (orderId: number) => {
    const deleted = await deleteOrder(orderId);
    if (deleted) {
      setOrders((previous) => previous.filter((order) => order.id !== orderId));
    }
  }, []);

  const handleChangeOrderStatus = useCallback(async (orderId: number, status: Status) => {
    const targetOrder = orders.find((order) => order.id === orderId);
    if (!targetOrder) {
      return;
    }

    const updated = await updateOrder(Number(orderId), {
      order_number: targetOrder.order_number,
      products: targetOrder.products?.map((product) => ({
        product_id: product.product_id,
        qty: product.qty,
      })) ?? [],
      status,
    });

    if (updated) {
      setOrders((previous) =>
        previous.map((order) => (order.id === orderId ? { ...order, status } : order)),
      );
    }
  }, [orders]);

  const stats = useMemo(() => {
    const pending = orders.filter((order) => order.status === "pending").length;
    const inProgress = orders.filter((order) => order.status === "inProgress").length;
    const completed = orders.filter((order) => order.status === "completed").length;

    return {
      total: orders.length,
      pending,
      inProgress,
      completed,
    };
  }, [orders]);

  return {
    orders,
    isLoading,
    stats,
    handleDeleteOrder,
    handleChangeOrderStatus,
    refreshOrders: fetchOrders,
  };
};
