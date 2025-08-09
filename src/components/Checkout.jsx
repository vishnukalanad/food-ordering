import Modal from "./Modal.jsx";
import {useActionState, useContext} from "react";
import CartContext from "../store/CartContext.jsx";
import {formatCurrency} from "../utils/formatting.js";
import Input from "./Input.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import {MdEdit} from "react-icons/md";
import useHttp from "../hooks/useHttp.js";

const requestOptions = {method: 'POST', headers: {'Content-Type': 'application/json'}}

export default function Checkout() {
    const ctx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);
    const items = ctx.items;

    const totalPrice = items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price
    }, 0)

    function handleClose() {
        userCtx.hideCheckout();
    }

    function handleComplete() {
        userCtx.hideCheckout();
        ctx.clearCart();
    }

    function handleGoToCart() {
        userCtx.showCart();
    }

    function handleSubmit(prevState, fd) {
        const fdObj = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: items,
                customer: fdObj,
            }
        }))
    }

    const [formState, formAction, pending] = useActionState(handleSubmit, null)

    const {error, data, sendRequest} = useHttp(`${process.env.REACT_APP_API_URL}/orders`, requestOptions, [])

    if (data?.message && !error) {
        return <Modal open={userCtx.progress === 'checkout'} onClose={handleClose}>
            <h2 className="text-green-800 font-medium text-lg">Order successful</h2>
            <p className="text-gray-700 text-sm mt-3">Order will be delivered in 20 minutes! <span
                className="text-blue-900 italic font-medium">Bon appétit</span>!</p>

            <div className="flex justify-end mt-4">
                <button type="button" className="text-red-700 text-sm cursor-pointer" onClick={handleComplete}>
                    Close
                </button>
            </div>
        </Modal>
    }

    return <Modal open={userCtx.progress === 'checkout'} onClose={userCtx.progress === 'checkout' ? handleClose : null}>
        <form action={formAction}>
            <h2 className="text-lg font-medium">
                Checkout
            </h2>
            <p className="text-sm mt-3 flex items-center gap-2">
                Total amount: <span className="font-bold">{formatCurrency.format(totalPrice)}</span>
                <button
                    className="w-[24px] h-[24px] cursor-pointer flex items-center justify-center rounded-full bg-gray-200 active:bg-gray-400"
                    type="button" onClick={handleGoToCart}><MdEdit/></button>
            </p>

            <p className="mt-3 mb-6 text-sm italic text-gray-500">Please fill all the relevant details and continue.</p>

            <Input label="Name" id="name" type="text" placeholder="John Doe"/>
            <Input label="Email" id="email" type="email" placeholder="john@example.com"/>
            <Input label="Street" id="street" type="text" placeholder="123 Main St"/>
            <Input label="City" id="city" type="text" placeholder="Anytown"/>
            <Input label="Postal code" id="postal-code" type="text" placeholder="12345"/>

            {
                error && <div className="bg-red-100 rounded-xl p-2 mt-4"><p className="text-red-700 text-center">Error
                    : {error}</p></div>
            }

            {
                pending ? <p className="text-right mt-6 text-blue-900">Processing...</p> :
                    <div className="flex gap-3 justify-end items-center mt-6">
                        <button type="button" className="text-red-700 text-sm cursor-pointer" onClick={handleClose}>
                            Close
                        </button>
                        <button
                            className="bg-blue-200 px-2 py-2 rounded-lg font-medium text-sm text-blue-900 cursor-pointer">
                            Place order
                        </button>
                    </div>
            }

        </form>
    </Modal>
}