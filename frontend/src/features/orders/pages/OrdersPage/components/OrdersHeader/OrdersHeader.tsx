import { NavLink } from "react-router-dom";
import "./OrdersHeader.css"

function OrdersHeader() {
    return (
        <div className="orders-page__header">

            <h1>My orders</h1>

            <NavLink
                to="/add-order"
                className={({ isActive }) =>
                    isActive ? "nav-button active" : "nav-button"
                }
            >
                + New Order
            </NavLink>

        </div>
    )
}

export default OrdersHeader