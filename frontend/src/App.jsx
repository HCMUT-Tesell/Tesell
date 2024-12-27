import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import LandingPage from './pages/LandingPage/LandingPage'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import OrderDetail from './pages/OrderDetail/OrderDetail'
import Login from './components/Login/Login'
import { useState } from 'react'
import SearchPage from './pages/SearchPage/SearchPage'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/product' element={<ProductDetail/>}>
          <Route path=":productId" element={<ProductDetail/>}/>
        </Route>
        <Route path='/OrderDetail' element={<OrderDetail/>}/>
        <Route path='/SearchPage' element={<SearchPage/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
