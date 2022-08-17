import React, {useEffect} from 'react';
import './App.css';
import ProductDetails from './pages/[slug]'
import Home from './pages/Home'
import {Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import store  from './redux/store';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import StripeCont from './components/api/StripeCont'
function App() {
  useEffect(() => {
    document.title = 'Online Store'
  }, [])
  return (
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/payment' element={<StripeCont />} />
          <Route path='/product/:id/' element={<ProductDetails />} />
          <Route path='/product/:id/product/:id/' element={<ProductDetails />} />
          <Route path='/product/:id/product/:id/product/:id' element={<ProductDetails />} />
          <Route path='/product/:id/product/:id/product/:id/product/:id' element={<ProductDetails />} />
        </Routes>
        <Footer />
      </Provider>
      
  );
}

export default App;
