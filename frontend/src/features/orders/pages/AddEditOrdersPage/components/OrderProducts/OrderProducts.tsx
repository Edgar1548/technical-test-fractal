import type { OrderProduct } from "@/features/orders/types";
import GenericTable from "@/shared/components/GenericTable/GenericTable";
import "./OrderProducts.css";

type OrderProductsProps = {
  products: OrderProduct[];
  onAddProduct: () => void;
  onEditProduct: (product: OrderProduct) => void;
  onRemoveProduct: (product: OrderProduct) => void;
  isReadOnly?: boolean;
};

function OrderProducts({
  products,
  onAddProduct,
  onEditProduct,
  onRemoveProduct,
  isReadOnly = false,
}: OrderProductsProps) {
  const columns = [
    { header: "ID", accessor: "id" as keyof OrderProduct },
    { header: "Name", accessor: "name" as keyof OrderProduct },
    {
      header: "Unit price",
      render: (row: OrderProduct) => `$${row.unit_price.toFixed(2)}`,
    },
    { header: "Qty", accessor: "qty" as keyof OrderProduct },
    {
      header: "Total price",
      render: (row: OrderProduct) => `$${row.total_price.toFixed(2)}`,
    },
    {
      header: "Options",
      render: (row: OrderProduct) => (
        <div className="orders_table__actions">
          <button
            className="orders_table__action edit"
            onClick={() => onEditProduct(row)}
            disabled={isReadOnly}
          >
            ✏️
          </button>
          <button
            className="orders_table__action delete"
            onClick={() => onRemoveProduct(row)}
            disabled={isReadOnly}
          >
            🗑
          </button>
        </div>
      ),
    },
  ];

  return (
    <section className="order-form__card">
      <div className="order-form__section-header">
        <h2 className="order-form__section-title">Order products</h2>

        <button className="btn btn--primary" onClick={onAddProduct} disabled={isReadOnly}>
          + Add product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="order-form__empty">
          <p>No products yet</p>
          <span>Add products using the button above.</span>
        </div>
      ) : (
        <GenericTable<OrderProduct> data={products} columns={columns} />
      )}
    </section>
  );
}

export default OrderProducts;
