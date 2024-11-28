import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import LandingPage from './pages/LandingPage/LandingPage'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import OrderDetail from './pages/OrderDetail/OrderDetail'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/ProductDetail' element={<ProductDetail/>}/>
        <Route path='/OrderDetail' element={<OrderDetail/>}/>
      </Routes>
    </div>
  )
}

export default App
