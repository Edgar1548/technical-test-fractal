import type { Product } from "@/features/products/types";
import "./ProductModal.css";

type ProductModalProps = {
  isOpen: boolean;
  editingProduct: Product | null;
  name: string;
  price: number;
  onNameChange: (value: string) => void;
  onPriceChange: (value: number) => void;
  onClose: () => void;
  onSubmit: () => Promise<void>;
};

function ProductModal({
  isOpen,
  editingProduct,
  name,
  price,
  onNameChange,
  onPriceChange,
  onClose,
  onSubmit,
}: ProductModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="product-modal__backdrop" role="presentation" onClick={onClose}>
      <div className="product-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <h2 className="product-modal__title">{editingProduct ? "Edit Product" : "Add Product"}</h2>

        <div className="product-modal__fields">
          <input
            className="product-modal__input"
            placeholder="Product name"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
          /> 
          <input
            className="product-modal__input"
            type="number"
            min={0}
            step="0.01"
            placeholder="Unit price"
            value={price === 0 ? undefined : price}
            onChange={(event) => onPriceChange(Number(event.target.value))}
          />
        </div>

        <div className="product-modal__actions">
          <button className="catalog__btn" onClick={onClose}>
            Cancel
          </button>
          <button className="catalog__btn catalog__btn--primary" onClick={() => void onSubmit()}>
            {editingProduct ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;