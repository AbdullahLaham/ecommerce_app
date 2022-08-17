import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineShopping} from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import Cart from './Cart';
import {setShowCart} from '../redux/fetchProducts/fetchAction';
function Navbar() {
  const qty = useSelector(state => state?.qty)
  const totalQuantities = useSelector(state => state?.totalQuantities)
  const showCart = useSelector(state => state?.showCart)
  const cartItems = useSelector(state => state?.cartItems)
  // const [totalItems, setTotalItems] = useState(0)
  const dispatch = useDispatch();

  return (
    <div className='navbar-container'>
        <p className='logo'>
            <Link to='/'>JSX Headphones</Link>
        </p>
        <button type='button' className='cart-icon' onClick={() => dispatch(setShowCart(!showCart))} >
            <AiOutlineShopping />
            <span className='cart-item-qty'>{totalQuantities}</span>
        </button>
        {showCart ? <Cart /> : ''}
        
    </div>
  )
}

export default Navbar