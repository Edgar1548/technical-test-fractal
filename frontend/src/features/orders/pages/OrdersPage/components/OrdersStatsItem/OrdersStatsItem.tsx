import "./OrdersStatsItem.css"

function OrdersStatsItem({ number, label }: { number: string; label: string }) {
    return (
        <div className="orders-stats__item">
            <h3>{number}</h3>
            <span>{label}</span>
        </div>
    );
}

export default OrdersStatsItem