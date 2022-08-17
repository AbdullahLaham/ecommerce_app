import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { incQty, decQty, setTotalPrice, setShowCart, setCartItems, setTotalQuantities } from '../redux/fetchProducts/fetchAction';
import {client, urlFor} from '../lib/client'
import {sendImages} from '../redux/fetchProducts/fetchAction'
import toast from 'react-hot-toast'
import {AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar} from 'react-icons/ai'
import Product from '../components/Product';
function ProductDetails() {
    const product = useSelector(state => state?.product);
    const products = useSelector(state => state?.products);
    const banner = useSelector(state => state?.banner);
    const qty = useSelector(state => state?.qty);
    const showCart = useSelector(state => state?.showCart);
    const cartItems = useSelector(state => state?.cartItems);
    const totalPrice = useSelector(state => state?.totalPrice);
    const totalQuantities = useSelector(state => state?.totalQuantities);
    // console.log(qty)
    const dispatch = useDispatch()
    const [index, setIndex] = useState(0);
    const [currentQuantity, setCurrentQuantity] = useState(0)
    // useEffect( () => {
    //     const fetchData = async () => {
    //         const query = `*[_type == "product" && slug.current == '${product ? product?.slug?.current : ''}'][0]`;
    //         const productData = await client.fetch(query);
    //         dispatch(sendImages(productData));            
    //     }
    //     fetchData()
    // }, [])
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(item => item._id === product._id)
    
    if (checkProductInCart) {
      const updateCartItems = cartItems.map(item => {
        if (item._id == product._id) {
          return {
            ...product,
            quantity: item?.quantity + quantity,
            totalPrice: item?.price * (item?.quantity + quantity),
          }
        }
      })
      dispatch(setCartItems(updateCartItems))
    }
    else {
      
      
      dispatch(setCartItems([...cartItems, {...product, quantity: quantity, totalPrice: product.price * quantity}]))
    }
    dispatch(setTotalPrice(totalPrice + product.price * quantity))
    dispatch(setTotalQuantities(totalQuantities + quantity))
    console.log('setTotalQuantities', totalQuantities)
    alert(`${currentQuantity} ${product.name} added to the cart`)
  }
    const {image, name, details, price} = product;
    // console.log('product, ', product)
    // const imagesData = useSelector(state => state?.imagesData)
    // console.log('uuuuuuuuuuuuuu', imagesData)

    
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i == index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price * currentQuantity}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            
            <p className="quantity-desc">
              <span className="minus" onClick={() =>{ dispatch(decQty()); setCurrentQuantity(prevValue => prevValue > 1 ? prevValue - 1 : 1)}}><AiOutlineMinus /></span>
              <span className='num' onClick={() => console.log('clicked')}>{currentQuantity}</span>
              <span className="plus" onClick={() => {dispatch(incQty()); setCurrentQuantity(prevValue => prevValue + 1)}}><AiOutlinePlus /></span>
            </p>
          </div>

          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, currentQuantity)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={() => onAdd(product, currentQuantity)}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {/* {products.map((item) => (
                <Product key={item._id} product={item} />
              ))} */}
              {products.map(product => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export default ProductDetails