import { FETCH_BANNER, FETCH_PRODUCTS, SEND_PRODUCT, SEND_IMAGES, SHOW_CART, CART_ITEMS, TOTAL_PRICE, TOTAL_QUANTITIES, INC_QTY, DEC_QTY } from "./fetchTypes";
export const fetchBanner = (data) => {
    // console.log('fff', data)
    return {
        type: FETCH_BANNER,
        payload: data,
    }
}
export const fetchProducts = (data) => {
    // console.log(data)
    return {
        type: FETCH_PRODUCTS,
        payload: data,
    }
}
export const sendProduct = (data) => {
    // console.log(data);
    return {
        type:  SEND_PRODUCT,
        payload: data,
    }
} 
export const sendImages = (data) => {
    // console.log(data);
    return {
        type:  SEND_IMAGES,
        payload: data,
    }
}
export const incQty = () => {
    console.log('data');
    return {
        type:  INC_QTY,
    }
}
export const decQty = () => {
    console.log('data');
    return {
        type:  DEC_QTY,
    }
}
export const setTotalPrice = (data) => {
    return {
        type: TOTAL_PRICE,
        payload: data,
    }
}

export const setShowCart = () => {
    return {
        type: SHOW_CART,
    }
}

export const setCartItems = (data) => {
    return {
        type: CART_ITEMS,
        payload: data,
    }
}
export const setTotalQuantities = (data) => {
    return {
        type: TOTAL_QUANTITIES,
        payload: data,
    }
}
