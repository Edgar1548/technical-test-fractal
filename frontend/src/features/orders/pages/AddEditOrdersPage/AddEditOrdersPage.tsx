import AddProductModal from "./components/AddProductModal/AddProductModal";
import OrderFooter from "./components/OrderFooter/OrderFooter";
import OrderForm from "./components/OrderForm/OrderForm";
import OrderHeader from "./components/OrderHeader/OrderHeader";
import OrderProducts from "./components/OrderProducts/OrderProducts";
import useAddEditOrder from "./hooks/useAddEditOrder";
import "./AddEditOrdersPage.css";

function AddEditOrdersPage() {
  const {
    isEditMode,
    isCompletedOrder,
    orderNumber,
    setOrderNumber,
    displayProducts,
    totals,
    draftDate,
    isLoading,
    actions,
    modal
  } = useAddEditOrder();

  return (
    <div className="order-form">
      <OrderHeader isEditMode={isEditMode} onClickAction={actions.goBack} />

      <OrderForm
        orderNumber={orderNumber}
        date={draftDate}
        productsCount={totals.productsCount}
        total={totals.totalPrice}
        onOrderNumberChange={setOrderNumber}
        isReadOnly={isCompletedOrder}
      />

      <OrderProducts
        products={displayProducts}
        onAddProduct={modal.openCreate}
        onEditProduct={modal.openEdit}
        onRemoveProduct={actions.removeProduct}
        isReadOnly={isCompletedOrder}
      />

      <OrderFooter
        isEditMode={isEditMode}
        onCancel={actions.goBack}
        onSubmit={actions.submit}
        isLoading={isLoading}
        disableSubmit={isCompletedOrder}
      />

      {modal.isOpen && (
        <AddProductModal
          products={actions.catalog}
          initialValue={modal.initialValue}
          onConfirm={actions.addOrEditProduct}
          onClose={modal.close}
        />
      )}
    </div>
  );
}

export default AddEditOrdersPage;
