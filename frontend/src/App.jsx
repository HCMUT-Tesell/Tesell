import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import LandingPage from './pages/LandingPage/LandingPage'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import OrderDetail from './pages/OrderDetail/OrderDetail'
import Login from './components/Login/Login'
import React from 'react'
import { useState } from 'react'
import CategoryPage from './pages/CategoryPage/CategoryPage'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/ProductDetail' element={<ProductDetail/>}/>
        <Route path='/OrderDetail' element={<OrderDetail/>}/>
        <Route path='/CategoryPage' element={<CategoryPage/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
