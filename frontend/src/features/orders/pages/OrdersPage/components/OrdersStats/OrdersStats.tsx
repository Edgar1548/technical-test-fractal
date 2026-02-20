import OrdersStatsItem from "../OrdersStatsItem/OrdersStatsItem"
import "./OrdersStats.css"
type OrdersStatsProps = {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
};
function OrdersStats({ total, pending, inProgress, completed }: OrdersStatsProps) {
    return (
        <div className="orders-stats">
            <OrdersStatsItem number={String(total)} label="TOTAL ORDERS" />
            <OrdersStatsItem number={String(pending)} label="PENDING" />
            <OrdersStatsItem number={String(inProgress)} label="IN PROGRESS" />
            <OrdersStatsItem number={String(completed)} label="COMPLETED" />
        </div>
    );
}

export default OrdersStats