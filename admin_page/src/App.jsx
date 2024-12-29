import Navbar from "./components/navbar/navbar"
import { Route, Routes } from 'react-router-dom'
import ProductsPage from "./pages/ProductsPage"
import OrdersPage from "./pages/OrdersPage.jsx"
import OrderDetail from "./pages/OrderDetail.jsx"
import { useState, useEffect, useContext } from 'react'
import AuthPage from './pages/AuthPage.jsx';
import { StoreContext } from "./context/StoreContext.jsx";
import Toastify from 'toastify-js'

function App() {
  const { isAdmin, logOut, notiMsg, setNotiMsg } = useContext(StoreContext);

  useEffect(() => {
    const showNoti = (notiMsg) => {
      if (notiMsg) {
        let className = "";
        if (notiMsg !== "Đăng nhập thành công") className = "bg-red-500 text-white absolute right-10 py-2 px-3 rounded-lg";
        else className = "bg-green-500 text-white absolute right-10 py-2 px-3 rounded-lg"
        Toastify({
          className: className,
          text: notiMsg,
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          onClick: function () { } // Callback after click
        }).showToast();
        setNotiMsg("");
      }
    }

    showNoti(notiMsg);
  }, [notiMsg, setNotiMsg])

  if (!isAdmin) {
    return (
      <AuthPage />
    )
  }
  else {
    return (
      // <>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/orders/:orderId" element={<OrderDetail/>}/>
          <Route path="/orders" element={<OrdersPage/>}/>
          {/* <Route path="/user" element={<Add url={url}/>}/>
           <Route path="/manager" element={<List url={url}/>}/>
           <Route path="/orders" element={<Orders url={url}/>}/> */}
        </Routes>
      </div>
      //</>
    )
  }
}

export default App
