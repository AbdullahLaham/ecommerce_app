import React, {useRef} from 'react'
import {Link} from 'react-router-dom';
import {AiOutlineMinus, AiOutlinePlus, AiOutlineShopping, AiOutlineLeft} from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { urlFor } from '../lib/client';
import { setCartItems, setShowCart, setTotalPrice, setTotalQuantities } from '../redux/fetchProducts/fetchAction';
import getStripe from '../lib/getStripe';
import {useNavigate} from 'react-router-dom'
// import axios from '../axios'
function Cart() {
    const cartRef = useRef();
    const showCart = useSelector(state => state?.showCart);
    const cartItems = useSelector(state => state?.cartItems);
    const totalPrice = useSelector(state => state?.totalPrice);
    const totalQuantities = useSelector(state => state?.totalQuantities)
    const qty = useSelector(state => state?.qty);
    const dispatch = useDispatch();
    console.log('cartItems', cartItems, totalPrice);
    // navigate
    const navigate = useNavigate()
    let foundProduct;
    let index;
    console.log('totalQuantities', totalQuantities)
    // managing the cart items quantity
    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id == id);
        index = cartItems.findIndex(foundProduct => foundProduct._id === id);
        const newCartItems = cartItems.filter(item => {
            return item?._id !== id;
        });
        if (value === 'inc') {
            
            dispatch(setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct?.quantity + 1}]))
            dispatch(setTotalPrice(totalPrice + foundProduct?.totalPrice))
            dispatch(setTotalQuantities(totalQuantities + 1))

        } else if (value == 'dec') {
            if (foundProduct?.quantity > 1) {
                dispatch(setTotalQuantities(totalQuantities - 1));
                dispatch(setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct?.quantity - 1}]))
                dispatch(setTotalPrice(totalPrice - foundProduct?.totalPrice))
            }
        }

    }
    // Deleting an item from the cartItems
    const onRemove = (id) => {
        foundProduct = cartItems.find((item) => item._id == id);
        const newCartItems = cartItems.filter(item => {
            return item?._id !== id
        })
        dispatch(setCartItems(newCartItems))
        dispatch(setTotalPrice(totalPrice - foundProduct?.totalPrice))
        dispatch(setTotalQuantities(totalQuantities - foundProduct?.quantity));
    }
    // payment handeling
    const handleCheckout = async () => {
        // const stripe = await getStripe();
        // const response = await fetch('/api/stripe',  {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(cartItems)
        // })
        // if (response.statusCode == 500) return ;
        // const data = await response.json();
        // toast.loading('Redirecting...')
        // stripe.redirectToCheckout({sessionId: data?.id})
        navigate('/payment')
    }

  return (
    <div className='cart-wrapper' ref={cartRef}>
        <div className='cart-container'>
            <button type='button' className='cart-heading' onClick={() => dispatch(setShowCart())}>
                <AiOutlineLeft />
                <span className='heading'>Your cart</span>
                <span className='cart-num-items'>{cartItems.length} (items)</span>

            </button>
            {cartItems.length < 1 && (
                <div className='empty-cart'>
                    <AiOutlineShopping size={150}/>
                    <h3>your shopping bag is empty</h3>
                    <Link to='/'>
                        <button type='button' onClick={() => dispatch(setShowCart())} className='btn'>
                            Continu Shopping
                        </button>
                    </Link>
                </div>
            )}
            <div className='product-container'>
                {cartItems.length >= 1 && cartItems.map((item, index) => {
                    return <div className='product' key={item?._id}>
                        <img src={urlFor(item?.image[0])} className='cart-product-image' />
                        <div className='item-desc'>
                            <div className='flex top'>
                                <h4>{item?.name}</h4>
                                <h4>{item?.price}</h4>
                            </div>
                            <div className='flex bottom'>
                                <div>
                                    <p className='quantity-desc'>
                                        <span className="minus" onClick={ () =>{ toggleCartItemQuantity(item._id, 'dec')}}><AiOutlineMinus /></span>
                                        <span className='num' onClick={() => console.log('clicked')}>{item?.quantity}</span>
                                        <span className="plus" onClick={ () =>{ toggleCartItemQuantity(item._id, 'inc')}}><AiOutlinePlus /></span>
                                    </p>
                                </div>
                                <button className='remove-item' onClick={() => onRemove(item._id)} ><TiDeleteOutline /></button>
                            </div>
                            
                        </div>
                    </div> 
                })}
            </div>
            {cartItems.length >= 1 && (
                <div className='cart-bottom'>
                    <div className='total'>
                        <h3>Subtotal:</h3>
                        <h3>{totalPrice}</h3>
                    </div>
                    <div className='btn-container'>
                        <button type='button' className='btn' onClick={() => handleCheckout()}>
                            Pay With stripe
                        </button>

                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default Cart