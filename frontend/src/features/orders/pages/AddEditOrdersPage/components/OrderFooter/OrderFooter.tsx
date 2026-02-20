import "./OrderFooter.css";

type OrderFooterProps = {
  isEditMode: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
  disableSubmit?: boolean;
};

function OrderFooter({
  isEditMode,
  onCancel,
  onSubmit,
  isLoading = false,
  disableSubmit = false,
}: OrderFooterProps) {
  return (
    <div className="order-form__footer">
      <button className="btn btn--secondary" onClick={onCancel}>
        Cancel
      </button>

      <button className="btn btn--primary" onClick={onSubmit} disabled={isLoading || disableSubmit}>
        {isLoading ? "Saving..." : isEditMode ? "Update order" : "Create order"}
      </button>
    </div>
  );
}

export default OrderFooter;
