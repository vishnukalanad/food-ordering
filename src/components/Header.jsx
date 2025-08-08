import logoImg from '../assets/tomato.webp';
import { MdShoppingCart } from "react-icons/md";
import CartContext from "../store/CartContext.jsx";
import {useContext} from "react";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
    const cartCtx = useContext(CartContext)
    const totalItems = cartCtx.items.reduce((totalItems, items) => {
        return totalItems + items.quantity
    }, 0)

    const userContext = useContext(UserProgressContext)
    return<header>
        <div className="container w-full mx-auto px-4 sm:px-6 lg:px-8 position-relative">
            <div className="py-2"></div>
            <div className="px-4 flex gap-2 justify-between items-center py-4 rounded-xl bg-white">
                <div className="left-section flex gap-2 items-center">
                    <div className="logo">
                        <img className="h-8 w-8 rounded-xl" src={logoImg} alt="Logo" />
                    </div>
                    <p className="text-lg font-medium">Tomato</p>
                </div>
                <div className="right-section">
                    <button className="action flex items-center cursor-pointer" onClick={() => userContext.showCart()}>
                       <MdShoppingCart className="h-5 w-5 text-gray-700" /> <span className="text-sm px-1">My cart (<span className="font-bold">{totalItems}</span>)</span>
                    </button>
                </div>
            </div>
        </div>
    </header>
}