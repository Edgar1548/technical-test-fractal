import { useEffect, useState } from "react";
import GenericTable from "@/shared/components/GenericTable/GenericTable";
import ProductModal from "@/features/products/components/ProductModal/ProductModal";
import { createProduct } from "@/features/products/services/createProduct";
import { deleteProduct } from "@/features/products/services/deleteProduct";
import { getProducts } from "@/features/products/services/getProducts";
import { updateProduct } from "@/features/products/services/updateProduct";
import type { Product } from "../types";
import "./CatalogProductsPage.css";

function CatalogProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response.length > 0 ? response : []);
    };

    void fetchProducts();
  }, []);

  const closeModal = () => {
    setEditingProduct(null);
    setName("");
    setPrice(0);
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!name.trim() || price <= 0) {
      window.alert("Name and unit price are required.");
      return;
    }

    const payload = { name: name.trim(), unit_price: price };

    if (editingProduct) {
      const updated = await updateProduct(editingProduct.id, payload);
      setProducts((previous) =>
        previous.map((product) =>
          product.id === editingProduct.id ? updated ?? { ...product, ...payload } : product,
        ),
      );
      closeModal();
      return;
    }

    const created = await createProduct(payload);
    setProducts((previous) => [...previous, created ?? { id: Date.now(), ...payload }]);
    closeModal();
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Do you want to delete this product?");
    if (!confirmed) {
      return;
    }

    const deleted = await deleteProduct(id);
    if (deleted) {
      setProducts((previous) => previous.filter((product) => product.id !== id));
      return;
    }

    setProducts((previous) => previous.filter((product) => product.id !== id));
  };

  return (
    <div className="catalog">
      <div className="catalog__header">
        <h1>Products</h1>
        <button
          className="nav-button"
          onClick={() => {
            setEditingProduct(null);
            setName("");
            setPrice(0);
            setIsModalOpen(true);
          }}
        >
          + New Product
        </button>
      </div>

      <GenericTable<Product>
        data={products}
        columns={[
          { header: "ID", accessor: "id" },
          { header: "Name", accessor: "name" },
          {
            header: "Unit price",
            render: (product) => <span className="td-strong">${product.unit_price.toFixed(2)}</span>,
          },
          {
            header: "Options",
            render: (product) => (
              <div className="orders_table__actions">
                <button
                  className="orders_table__action edit"
                  onClick={() => {
                    setEditingProduct(product);
                    setName(product.name);
                    setPrice(product.unit_price);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button className="orders_table__action delete" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </div>
            ),
          },
        ]}
      />

      <ProductModal
        isOpen={isModalOpen}
        editingProduct={editingProduct}
        name={name}
        price={price}
        onNameChange={setName}
        onPriceChange={setPrice}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default CatalogProductsPage;
