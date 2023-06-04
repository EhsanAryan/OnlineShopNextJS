import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const CartContext = createContext({
    globalData: {},
    dispatch: () => { }
});

const initialState = {
    cart: Cookies.get("cart") ? 
    JSON.parse(Cookies.get("cart")) :
    { cartItems: [], checkoutData: {}, paymentMethod: "" }
};

const reducer = (prevState, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            const newItem = action.payload;
            const existingItem = prevState.cart.cartItems.find(item => item.slug === newItem.slug);
            const cartItems = existingItem ?
                prevState.cart.cartItems.map(item => item.slug === existingItem.slug ? newItem : item) :
                [...prevState.cart.cartItems, newItem];

            Cookies.set("cart", JSON.stringify({
                ...prevState.cart,
                cartItems
            }));

            return {
                ...prevState,
                cart: {
                    ...prevState.cart,
                    cartItems
                }
            };

        case "REMOVE_ITEM":
            const newCartItems = prevState.cart.cartItems.filter(item => item.slug !== action.payload.slug);
            
            Cookies.set("cart", JSON.stringify({
                ...prevState.cart,
                cartItems: newCartItems
            }));
            
            return {
                ...prevState,
                cart: {
                    ...prevState.cart,
                    cartItems: newCartItems
                }
            };

        case "ADD_CHECKOUT_DATA":
            return {
                ...prevState,
                cart: {
                    ...prevState.cart,
                    checkoutData: {
                        ...prevState.cart.checkoutData,
                        ...action.payload
                    }
                }
            };

        case "ADD_PAYMENT_METHOD":
            return {
                ...prevState,
                cart: {
                    ...prevState.cart,
                    paymentMethod: action.payload
                }
            };

        default:
            return prevState;
    }
}


const CartContextContainer = ({ children }) => {
    const [globalData, dispatch] = useReducer(reducer, initialState);

    return (
        <CartContext.Provider value={{
            globalData,
            dispatch
        }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextContainer;

