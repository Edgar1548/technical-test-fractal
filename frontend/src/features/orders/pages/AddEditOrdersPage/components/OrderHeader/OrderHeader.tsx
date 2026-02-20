import "./OrderHeader.css"

type OrderHeaderProps = {
    isEditMode: boolean;
    onClickAction: () => void;
};

function OrderHeader({ isEditMode, onClickAction }: OrderHeaderProps) {
    return (
        <div className="order-form__header">
            <div>
                <h1>
                    {isEditMode ? "Edit Order" : "Add Order"}
                </h1>
            </div>

            <button
                className="btn btn--secondary"
                onClick={onClickAction}
            >
                Volver
            </button>
        </div>
    )
}

export default OrderHeader