import { useParams, useNavigate } from "react-router-dom";
import { } from "react-router-dom";
import { useState } from "react";
import { useOrderData } from "./useOrderData";
import useOrderProducts from "./useOrderProducts";
import useOrderSubmit from "./useOrderSubmit";
import useProductModal from "./useProductModal";
import { useOrderDraft } from "./useOrderDraft";

function useAddEditOrder() {
    const { id } = useParams();
    const navigate = useNavigate();
    const numericId = id ? Number(id) : null;

    const [orderNumber, setOrderNumber] = useState("");
    const modal = useProductModal();

    const {
        catalog,
        order,
        setOrder,
        isEditMode,
        isCompletedOrder,
    } = useOrderData(numericId);

    const {
        localProducts,
        setLocalProducts,
        tableProducts,
        productsCount,
        totalPrice,
        draftDate,
    } = useOrderDraft(catalog, order?.products);

    const displayProducts = isEditMode
        ? order?.products ?? []
        : tableProducts;

    const actionProducts = useOrderProducts({
        isEditMode,
        isCompletedOrder,
        catalog,
        setOrder,
        setLocalProducts,
        editingProduct: modal.editingProduct,
    });

    const submit = useOrderSubmit({
        isEditMode,
        numericId,
        order,
        orderNumber,
        displayProducts,
        localProducts,
        navigate,
    });


    return {
        isEditMode,
        isCompletedOrder,
        orderNumber,
        setOrderNumber,
        displayProducts,
        draftDate,
        totals: {
            productsCount,
            totalPrice,
        },
        isLoading: submit.isLoading,
        actions: {
            ...actionProducts,
            submit: submit.submit,
            goBack: () => navigate(-1),
            catalog,
        },
        modal,
    };
}

export default useAddEditOrder