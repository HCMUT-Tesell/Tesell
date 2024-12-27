/* eslint-disable react/prop-types */
import { createContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const [notiMsg, setNotiMsg] = useState("");

  useEffect(() => {
    const checkAlreadyLogin = () => {
      const userId = localStorage.getItem('userId');
      if (userId === '676d642a863b4c90008a8bd3') setIsAdmin(true);
    }

    checkAlreadyLogin();
  }, [])

  const auth = async (email, password) => {
    if (email === "" || password === "") {
      setNotiMsg("Bạn phải điền đầy đủ thông tin");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/user/login", {
        email: email,
        password: password
      });
    
      if (response.status === 200 && response.data.success) {
        const userId = response.data._id;

        try {
          const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
          console.log(response.data);

          const isAdmin = response.data.isAdmin;

          if (isAdmin) {
            setNotiMsg("Đăng nhập thành công");
            localStorage.setItem("userId", userId);
            setIsAdmin(true);
          } else {
            setNotiMsg("Tài khoản của bạn không/chưa được cấp quyền quản lý")
          }
        } catch (error) {
          console.log("Đã có lỗi xảy ra!")
        }
      }

    } catch (error) {
      // console.error(error);
      setNotiMsg("Sai thông tin đăng nhập")
    }
  }

  const logOut = () => {
    setIsAdmin(false);
    setNotiMsg("Bạn đã đăng xuất")
    localStorage.removeItem("userId");
  }

  const contextValue = {
    isAdmin,
    auth,
    notiMsg,
    setNotiMsg,
    logOut
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}
export default StoreContextProvider;