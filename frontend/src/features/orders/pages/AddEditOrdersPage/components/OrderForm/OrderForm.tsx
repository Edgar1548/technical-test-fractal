import "./OrderForm.css";

type OrderFormProps = {
  orderNumber: string;
  date: string;
  productsCount: number;
  total: number;
  onOrderNumberChange: (value: string) => void;
  isReadOnly?: boolean;
};

function OrderForm({
  orderNumber,
  date,
  productsCount,
  total,
  onOrderNumberChange,
  isReadOnly = false,
}: OrderFormProps) {
  return (
    <section className="order-form__card">
      <h2 className="order-form__section-title">General information</h2>

      <div className="order-form__grid">
        <div className="order-form__field">
          <label>Order #</label>
          <input
            type="text"
            value={orderNumber}
            onChange={(event) => onOrderNumberChange(event.target.value)}
            disabled={isReadOnly}
          />
        </div>

        <div className="order-form__field">
          <label>Date</label>
          <input type="text" value={date} disabled />
        </div>

        <div className="order-form__field">
          <label># Products</label>
          <input type="text" value={productsCount} disabled />
        </div>

        <div className="order-form__field">
          <label>Final price</label>
          <input type="text" value={`$${total.toFixed(2)}`} disabled />
        </div>
      </div>
    </section>
  );
}

export default OrderForm;
