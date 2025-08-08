import Modal from "./Modal.jsx";
import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";
import {formatCurrency} from "../utils/formatting.js";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";
import cartContext from "../store/CartContext.jsx";

export default function Cart() {
    const ctx = useContext(CartContext);
    const items = ctx.items;

    const userCtx = useContext(UserProgressContext);

    function handleCartClose() {
        userCtx.hideCart();
    }

    function handleCheckout() {
        userCtx.hideCart();
        userCtx.showCheckout();
    }

    const totalPrice = items.reduce((totalPrice, item) => {return totalPrice + item.quantity * item.price}, 0)
    return <Modal className={""} open={userCtx.progress === 'cart'}>
        <div className="flex flex-col justify-between h-full">
            <div>
                <h2 className="text-lg font-medium">Your Cart</h2>
                <ul className="mt-3">
                    {
                        items.map(item => <CartItem key={item.id} item={item} />)
                    }
                </ul>
            </div>
            <div className={"flex justify-between items-center" + (items.length > 0 ? ' mt-4' : '') + (items.length > 0 ? ' mt-4' : '')}>
                <p>{items.length > 0 ? 'Total' : 'No items in cart!'}</p>
                {items.length > 0 && <p> {formatCurrency.format(totalPrice)} </p>}
            </div>
            <div className="mt-4 flex gap-4 justify-end">
                <button className="text-red-700 text-sm cursor-pointer" onClick={handleCartClose}>Close</button>
                {
                    items.length > 0 && <button className="bg-blue-200 px-2 py-1 rounded-lg font-medium text-sm text-blue-900 cursor-pointer" onClick={handleCheckout}>Checkout</button>
                }
            </div>
        </div>
    </Modal>
}