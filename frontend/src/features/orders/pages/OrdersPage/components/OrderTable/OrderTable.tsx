import { useNavigate } from "react-router-dom";
import type { Status } from "@/core/types";
import type { Order } from "@/features/orders/types";
import GenericTable from "@/shared/components/GenericTable/GenericTable";
import "./OrderTable.css";

type OrderListProps = {
    orders: Order[];
    onDeleteOrder: (orderId: number) => void;
    onChangeStatus: (orderId: number, status: Status) => void;
};

const STATUS_LABELS: Record<Status, string> = {
    pending: "Pending",
    inProgress: "InProgress",
    completed: "Completed",
};

function OrderTable({ orders, onDeleteOrder, onChangeStatus }: OrderListProps) {
    const navigate = useNavigate();

    const columns = [
        { header: "ID", accessor: "id" as keyof Order },
        { header: "Order #", accessor: "order_number" as keyof Order },
        {
            header: "Date",
            render: (order: Order) => new Date(order.date).toLocaleDateString(),
        },
        {
            header: "# Products",
            render: (order: Order) => order.products_count ?? 0,
        },
        {
            header: "Final price",
            render: (order: Order) => `$${order.total.toFixed(2)}`,
        },
        {
            header: "Options",
            render: (order: Order) => {
                const isCompleted = order.status === "completed";

                return (
                    <div className="orders_table__actions">
                        <select
                            className="orders_table__status"
                            value={order.status}
                            onChange={(event) => onChangeStatus(order.id, event.target.value as Status)}
                        >
                            {Object.entries(STATUS_LABELS).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <button
                            className="orders_table__action edit"
                            disabled={isCompleted}
                            onClick={() => navigate(`/orders/${order.id}`)}
                        >
                            Edit
                        </button>
                        <button
                            className="orders_table__action delete"
                            disabled={isCompleted}
                            onClick={() => onDeleteOrder(order.id)}
                        >
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    return <GenericTable<Order> data={orders} columns={columns} />;
}
export default OrderTable