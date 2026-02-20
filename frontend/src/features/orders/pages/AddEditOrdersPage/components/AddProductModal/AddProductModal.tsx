import { useState } from "react";
import type { Product } from "@/features/products/types";
import type { OrderProductPayload } from "@/features/orders/types";
import "./AddProductModal.css";

interface AddProductModalProps {
  products: Product[];
  initialValue?: OrderProductPayload;
  onConfirm: (product: OrderProductPayload) => void;
  onClose: () => void;
}

function AddProductModal({ products, initialValue, onConfirm, onClose }: AddProductModalProps) {
  const [selectedProductId, setSelectedProductId] = useState<number | "">(initialValue?.product_id ?? "");
  const [quantity, setQuantity] = useState<number>(initialValue?.qty ?? 1);

  const handleConfirm = () => {
    if (!selectedProductId || quantity <= 0) {
      return;
    }

    onConfirm({
      product_id: Number(selectedProductId),
      qty: quantity,
    });
    onClose();
  };

  return (
    <div className="add-product-modal">
      <div className="add-product-modal__overlay" onClick={onClose} />

      <div className="add-product-modal__content">
        <div className="add-product-modal__header">
          <h2>{initialValue ? "Edit Product" : "Add Product"}</h2>
          <button className="add-product-modal__close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="add-product-modal__body">
          <div className="add-product-modal__field">
            <label>Product</label>
            <select
              className="add-product-modal__input"
              value={selectedProductId}
              onChange={(event) => setSelectedProductId(Number(event.target.value))}
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} (${product.unit_price.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          <div className="add-product-modal__field">
            <label>Qty</label>
            <input
              className="add-product-modal__input"
              type="number"
              min={1}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />
          </div>
        </div>

        <div className="add-product-modal__footer">
          <button className="btn btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn--primary" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
