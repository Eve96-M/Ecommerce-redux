import { useEffect, useState } from 'react'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Cart from './components/pages/Cart'
import Products from './components/pages/Products'
import Purchases from './components/pages/Purchases'
import MyNavBar from './components/MyNavBar'
import LoadingScreen from './components/LoadingScreen'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk } from './store/slices/product.slice'
import 'boxicons'
import ProtectedRoutes from './components/ProtectedRoutes'
function App() {

  const isLoading = useSelector(state => state.isLoading)

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  return (
    <div className="App">
      <HashRouter>
        <MyNavBar />
        {isLoading && <LoadingScreen />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/purchases" element={<Purchases />} />
          </Route>

          <Route path="/products/:id" element={<Products />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
