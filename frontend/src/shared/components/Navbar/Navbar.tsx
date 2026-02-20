import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
            </div>

            <div className="navbar-right">
                <NavLink
                    to="/my-orders"
                    className={({ isActive }) =>
                        isActive ? "nav-button active" : "nav-button"
                    }
                >
                    My Orders
                </NavLink>

                <NavLink
                    to="/products"
                    className={({ isActive }) =>
                        isActive ? "nav-button active" : "nav-button"
                    }
                >
                    Products
                </NavLink>
            </div>
        </nav>
    );
}
