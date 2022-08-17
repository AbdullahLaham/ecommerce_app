import React from 'react';
import {useSelector} from 'react-redux';
import HeroBanner from '../components/HeroBanner';
import Product from '../components/Product';
import FooterBanner from '../components/FooterBanner'

function Home() {
  const products = useSelector(state => state?.products)
  const banner = useSelector(state => state?.banner)
  console.log('pp', products, banner)
  return (
    <>
      <HeroBanner />
      <div>
          <h2 className='products-heading'>Best Selling Product</h2>
          <p >Speakers of many varients</p>
        </div>

        <div className='products-container'>
          {products ? products.map((product) => <Product key={product._id} product={product} />) : ''}
      </div>
      <FooterBanner footerBanner={banner && banner[0]} />

    </>
  )
}

export default Home