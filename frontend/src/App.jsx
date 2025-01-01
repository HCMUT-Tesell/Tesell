import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import LandingPage from './pages/LandingPage/LandingPage'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import OrderDetail from './pages/OrderDetail/OrderDetail'
import Login from './components/Login/Login'
import { useState } from 'react'
import SearchPage from './pages/SearchPage/SearchPage'
import Payment from './pages/PaymentPage/Payment'
import PurchaseHistory from './pages/PurchaseHistory/PurchaseHistory'
import PurchaseHistoryDetail from './pages/PurchaseHistoryDetail/PurchaseHistoryDetail'
import SuccessPayment from './pages/SuccessPayment/SuccessPayment'

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
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/PurchaseHistory' element={<PurchaseHistory/>}/>
        <Route path="/PurchaseHistory/:orderId" element={<PurchaseHistoryDetail/>}/>
        <Route path='/success-payment' element={<SuccessPayment/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
