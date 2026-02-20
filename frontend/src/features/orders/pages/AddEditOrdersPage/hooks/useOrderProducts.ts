import type { Product } from "@/features/products/types";
import type { Order, OrderProductPayload, OrderProduct } from "@/features/orders/types";


interface UseOrderProductsProps {
    isEditMode: boolean;
    isCompletedOrder: boolean;
    editingProduct: OrderProduct | null;
    catalog: Product[];
    setOrder: React.Dispatch<React.SetStateAction<Order | null>>;
    setLocalProducts: React.Dispatch<
        React.SetStateAction<OrderProductPayload[]>
    >;
}

export default function useOrderProducts({
    isEditMode,
    isCompletedOrder,
    editingProduct,
    catalog,
    setOrder,
    setLocalProducts,
}: UseOrderProductsProps) {
    const addOrEditProduct = (payload: OrderProductPayload) => {
        if (isCompletedOrder) return;

        const catalogProduct = catalog.find(p => p.id === payload.product_id);
        if (!catalogProduct) return;


        if (!isEditMode) {

            setLocalProducts(prev => {
                if (editingProduct) {
                    return prev.map((item, index) =>
                        index + 1 === editingProduct.id ? payload : item,
                    );
                }
                return [...prev, payload]

            });
            return;
        }
        setOrder(prev => {
            if (!prev) return prev;

            const updatedProducts = editingProduct
                ? prev.products?.map((product) =>
                    product.id === editingProduct.id
                        ? {
                            ...product,
                            product_id: payload.product_id,
                            name: catalogProduct.name,
                            unit_price: catalogProduct.unit_price,
                            qty: payload.qty,
                            total_price: catalogProduct.unit_price * payload.qty,
                        }
                        : product,
                )
                : [
                    ...prev.products ?? [],
                    {
                        id: (prev.products?.length ?? 0) + 1,
                        product_id: payload.product_id,
                        name: catalogProduct.name,
                        unit_price: catalogProduct.unit_price,
                        qty: payload.qty,
                        total_price: catalogProduct.unit_price * payload.qty,
                    },
                ];


            return {
                ...prev,
                products: updatedProducts,
                total: updatedProducts?.reduce((a, b) => a + b.total_price, 0) ?? 0,
            };
        });
    };

    const removeProduct = (selected: OrderProduct) => {
        if (isCompletedOrder) return;

        if (isEditMode) {
            setOrder(prev => {
                if (!prev) return prev;
                const updated = prev.products?.filter(p => p.id !== selected.id);
                return {
                    ...prev,
                    products: updated,
                    total: updated?.reduce((a, b) => a + b.total_price, 0) ?? 0,
                };
            });
        } else {
            setLocalProducts(prev =>
                prev.filter((_, i) => i + 1 !== selected.id)
            );
        }
    };

    return {
        addOrEditProduct,
        removeProduct,
    };
}