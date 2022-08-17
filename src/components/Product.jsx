import React from 'react'
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import { urlFor } from '../lib/client'
import {sendProduct} from '../redux/fetchProducts/fetchAction'

function Product({product}) {
  const {image, name, slug, price} = product;
  const dispatch = useDispatch()
  return (
    <div>
        <Link to={slug && `product/${slug?.current}/`}>
            <div className='product-card' onClick={() => dispatch(sendProduct(product))} >
                <img 
                    src = {urlFor(image && image[0])}
                    width={250}
                    height={250}
                    className='product-image'
                 />
                 <p className='product-name'> {name}</p>
                 <p className='product-price'>{price}</p>
            </div>

        </Link>
    </div>
  )
}

export default Product