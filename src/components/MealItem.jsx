import {MdAdd, MdAddShoppingCart, MdShoppingCart} from "react-icons/md";
import {formatCurrency} from "../utils/formatting.js";
import CartContext from "../store/CartContext.jsx";
import {useContext} from "react";

export default function MealItem({data}) {
    const  cartCtx = useContext(CartContext);
    function handleAddToCart() {
        cartCtx.addItem(data);
    }
    return <div className="flex  flex-col lg:flex-row lg:items-center p-4 bg-white rounded-xl">
        <div className="flex-shrink-0">
            <img src={`${import.meta.env.VITE_API_URL}/${data.image}`} alt="item-image" className="h-[5rem] w-[5rem] rounded-xl" />
        </div>

        <div className="flex justify-between lg:px-2">
            <div className="pr-2 lg:pr-4">
                <p className="text mt-3 lg:mt-0">{data.name}</p>
                <p className="text-xs mt-1">{data.description}</p>
            </div>

            <div className="flex flex-col items-center justify-between lg:items-end lg:px-2">
                <button onClick={handleAddToCart} className="bg-gray-300 rounded-full flex items-center justify-center mt-3 p-2 cursor-pointer lg:mt-0">
                    <MdAddShoppingCart className="h-[18px] w-[18px] text-stone-800" />
                </button>
                <p className="text-xl font-medium text-gray-600 mt-3 lg:mt-0">{formatCurrency.format(data.price)}</p>
            </div>
        </div>
    </div>
}