import { useState } from "react";
import { FETCH_BANNER, FETCH_PRODUCTS, SEND_PRODUCT, SEND_IMAGES, SHOW_CART, CART_ITEMS, TOTAL_PRICE, TOTAL_QUANTITIES, INC_QTY, DEC_QTY  } from "./fetchTypes";
// const [showCart, setShowCart] = useState(false)
// const [cartItems, setCartItems] = useState()
// const [totalPrice, setTotalPrice] = useState()
// const [totalQuantities, setTotalQuantities] = useState()
// const [qty, setQty] = useState()
const initialSate = {
    products: [],
    banner: [],
    qty: 1,
    showCart: false,
    cartItems: [],
    totalPrice: 0,
    totalQuantities: 0,
}
export const fetchReducer = (state = initialSate, action) => {
    switch(action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            }
        case FETCH_BANNER:
            return {
                ...state,
                banner: action.payload,
            }
        case SEND_PRODUCT:
            return {
                ...state,
                product: action.payload,
            }
        case SEND_IMAGES:
            return {
                ...state,
                imagesData: action.payload,
            }
        case INC_QTY :
            return {
                ...state,
                qty: state.qty + 1,
            }
        case DEC_QTY:
            return {
                ...state,
                qty: state.qty > 1 ? state.qty - 1 : 1,
            }
        case TOTAL_PRICE:
            return {
                ...state,
                totalPrice: action.payload
            }
        case SHOW_CART:
            return {
                ...state,
                showCart: !state.showCart,
            }
        case CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload
            }
        case TOTAL_QUANTITIES:
            return {
                ...state,
                totalQuantities: action.payload
            }
                                
    }
    
}
