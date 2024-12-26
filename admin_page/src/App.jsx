import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthPage from './AuthPage.jsx';
import { useContext } from "react";
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

  if (!isAdmin)  {
    return (
      <AuthPage/>
    )
  }
  else {
    return (
      <div className='h-screen w-screen flex items-center justify-center'>
        <button className='border rounded-lg px-3 py-2' onClick={() => logOut()}>Log Out</button>
      </div>
    )
  }
}

export default App
