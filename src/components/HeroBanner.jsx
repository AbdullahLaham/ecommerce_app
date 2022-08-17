import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import { client } from '../lib/client';
import { fetchBanner, fetchProducts } from '../redux/fetchProducts/fetchAction';
import {urlFor} from '../lib/client'
function HeroBanner() {
  const dispatch = useDispatch();
  // let prod;
  // let bann;
  useEffect( () => {
    const fetchData = async () => {
      const query = '*[_type=="product"]';
      const products = await client.fetch(query);
      const bannerQuery = '*[_type=="banner"]';
      const bannerData = await client.fetch(bannerQuery);
    //   console.log('ggg')
      dispatch(fetchProducts(products)); 
      dispatch(fetchBanner(bannerData));
        // prod = products;
        // bann = bannerQuery;
    }
    fetchData()
  } , []);
  const products = useSelector(state => state?.products)
  const banner = useSelector(state => state?.banner)
  console.log('prod', products, 'bann', banner)
  return (
    <div className='hero-banner-container'>
        <div>
            <p className='beats-solo'>{banner ? banner[0]?.smallText : 'pp'}</p>
            <h3>{banner ? banner[0]?.midText : ''}</h3>
            <h3>{banner ? banner[0]?.largeText1 : ''}</h3>
            <img src={banner ? urlFor(banner[0]?.image?.asset?._ref) : ''} alt='headphones' className='hero-banner-image' />
            <div>
                <Link to={`/product/${banner ? banner[0]?.product : ''}`}>
                    <button type='button'>{banner ? banner[0]?.buttonText : ''}</button>
                </Link>
                <div className='desc'>
                  <h5>describtion</h5>
                  <p>{banner ? banner[0]?.desc : ''}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroBanner
