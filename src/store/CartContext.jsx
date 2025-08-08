import {createContext, useReducer} from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (item) => {},
});

function cartReducer(state, action) {
        const updatedItems = [...state.items];
    if(action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex]
            console.log(existingItem);
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            }

            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems.push({...action.item, quantity: 1});
        }

        return {...state, items: updatedItems};
    }

    if(action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action .id);
        const existingCartItem = state.items[existingCartItemIndex]

        if (existingCartItem.quantity === 1) {
            const updatedItem = [...state.items];
            updatedItem.splice(existingCartItemIndex, 1)
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            }
            updatedItems[existingCartItemIndex] = updatedItem
        }

        return {...state, items: updatedItems}
    }

    return state;
}

export function CartProvider({children}) {
    const [cart, dispatchCart] = useReducer(cartReducer, {items: []});


    function addItem(item) {
        dispatchCart({type: "ADD_ITEM", item: item})
    }

    function removeItem(id) {
        dispatchCart({type: "REMOVE_ITEM", id})
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
    }


    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>;
}

export default CartContext;