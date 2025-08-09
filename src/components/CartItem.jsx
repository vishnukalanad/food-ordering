import {formatCurrency} from "../utils/formatting.js";
import {MdAdd, MdRemove} from "react-icons/md";
import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";

export default function CartItem({item}) {
    const ctx = useContext(CartContext);

    function handleAddItem() {
        ctx.addItem(item);
    }

    function handleRemoveItem() {
        ctx.removeItem(item.id);
    }
    return <li className="flex justify-between text-sm font-medium py-2 border-b border-gray-200" key={item.id}>
        <div className="flex items-center gap-2">
            <img src={`${import.meta.env.VITE_API_URL}/${item.image}`} alt="item-image" className="h-[2rem] w-[2rem] rounded-xl" />
            <span>{item.name}</span>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={handleRemoveItem} className="w-[24px] h-[24px] cursor-pointer flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-200">
                <MdRemove className="text-gray-700" />
            </button>
            <span>{formatCurrency.format(item.price)}
                <span className="text-xs text-gray-500 font-bold">(x{item.quantity})</span>
            </span>
            <button onClick={handleAddItem} className="w-[24px] h-[24px] cursor-pointer flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-200">
                <MdAdd className="text-gray-700" />
            </button>
        </div>
    </li>
}