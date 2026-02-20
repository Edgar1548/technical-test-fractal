import { useState } from "react";
import type { OrderProduct } from "@/features/orders/types";

export default function useProductModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<OrderProduct | null>(null);

  const openCreate = () => {
    setEditingProduct(null);
    setIsOpen(true);
  };

  const openEdit = (product: OrderProduct) => {
    setEditingProduct(product);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return {
    isOpen,
    initialValue: editingProduct
      ? { product_id: editingProduct.product_id, qty: editingProduct.qty }
      : undefined,
    editingProduct: editingProduct,
    openCreate,
    openEdit,
    close,
  };
}