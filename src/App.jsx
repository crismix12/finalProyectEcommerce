import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoadingScreen from './components/LoadingScreen'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'
import { getProductsThunk } from './store/slices/products.slice'
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './components/ProtectedRoutes'
import { getCartProductsThunk } from './store/slices/cartProducts.slice'
import Register from './pages/Register'
function App() {

  const isLoading = useSelector((state) => state.isLoading)
  const dispatch = useDispatch();

  useEffect(()=>{ 
    dispatch(getProductsThunk());
    dispatch(getCartProductsThunk());
  },[])

  return (
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Container className='mt-5'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/productDetail/:id" element={<ProductDetail/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>

          <Route element={<ProtectedRoutes/>}>
            <Route path="/purchases" element={<Purchases/>}/>
          </Route>
          
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
