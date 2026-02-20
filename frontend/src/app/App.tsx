import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "@/shared/components/Navbar/Navbar";

import OrdersPage from "@/features/orders/pages/OrdersPage/OrdersPage";
import AddEditOrdersPage from "@/features/orders/pages/AddEditOrdersPage/AddEditOrdersPage";
import CatalogProductsPage from "@/features/products/pages/CatalogProductPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/my-orders" replace />} />
        <Route path="/my-orders" element={<OrdersPage />} />
        <Route path="/add-order" element={<AddEditOrdersPage />} />
        <Route path="/orders/:id" element={<AddEditOrdersPage />} />
        <Route path="/products" element={<CatalogProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

