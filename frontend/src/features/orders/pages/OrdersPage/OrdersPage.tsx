import "./OrderPage.css"
import OrdersStats from "./components/OrdersStats/OrdersStats";
import { useOrders } from "./hooks/useOrder";
import OrderTable from "./components/OrderTable/OrderTable";
import OrdersHeader from "./components/OrdersHeader/OrdersHeader";

function OrdersPage() {
    const { orders, stats, isLoading, handleDeleteOrder, handleChangeOrderStatus } = useOrders();

    const onDeleteOrder = (orderId: number) => {
        const confirmed = window.confirm("Do you want to delete this order?");
        if (!confirmed) {
            return;
        }

        void handleDeleteOrder(orderId);
    };

    return (
        <div className="orders-page">
            <OrdersHeader />
            <OrdersStats {...stats} />
            {isLoading ? (
                <p>Loading orders...</p>
            ) : (
                <OrderTable
                    orders={orders}
                    onDeleteOrder={onDeleteOrder}
                    onChangeStatus={handleChangeOrderStatus}
                />
            )}
        </div>
    );
}




export default OrdersPage