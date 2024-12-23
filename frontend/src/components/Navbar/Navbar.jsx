import React, { useContext, useState, useEffect } from "react";
import './Navbar.css'
import logo_circle from '../../assets/logo_white.png'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import ToggleOnRoundedIcon from '@mui/icons-material/ToggleOnRounded';
import Cart from '../Cart'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import Login from '../Login/Login';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const Navbar = ({setShowLogin}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isNotiVisible, setIsNotiVisible] = useState(false);
  const {token, setToken} = useContext(StoreContext);
  const url="http://localhost:8000";
  const [user, setUser] = useState(null);
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const toggleNoti = () => {
    setIsNotiVisible(!isNotiVisible);
  }
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("ID");
    setToken(null);
    setShowLogin(false);
}

const copyPhoneToClipboard =() =>{

  navigator.clipboard.writeText("0123465232");
  alert("Đã sao chép số hotline: 0123465232 và bộ nhớ tạm");
}

 // Hàm lấy thông tin người dùng
 const getUserPro5ById = async () => {
  try {
    const userId = localStorage.getItem("ID");
    const response = await axios.get(`${url}/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Thêm token vào header
      },
    });
    setUser(response.data); // Lưu thông tin người dùng
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error.message);
  }
};


// Gọi API khi component được mount
useEffect(() => {
  if (token) {
    getUserPro5ById();
  }
}, [token]);

  return (
    <div className='Navbar'>
        <img src={logo_circle} alt="" className="logo" />

        <div className="button-danh-muc">
          Danh mục sản phẩm 
          <MenuOutlinedIcon/>
        </div>
        
<div className="search-bar-container">
    <input type="text" placeholder="Tìm kiếm..." className="search-input" />
    <SearchOutlinedIcon/>
</div>

        <div className="button-hotline" onClick={()=>copyPhoneToClipboard()}>
          <PhoneAndroidOutlinedIcon/>
          Hotline: +84 123 465 232
        </div>
        <div className='noti-icon' onClick={toggleNoti}><NotificationsNoneOutlinedIcon sx={{ color:'white' }} /></div>
        {isNotiVisible && (
        <div className='noti-popup'>
          <p>Bạn có một đơn hàng cần thanh toán</p>
          <hr/>
          <p>Bạn có một đơn hàng đang trên đường giao</p>
        </div>
      )}
        <div className='cart-button' onClick={togglePopup}><ShoppingCartOutlinedIcon sx={{ color:'white' }} /></div>
        {isPopupVisible && (
          <div className='cart-popup'>
            <Cart/>
          </div>
        )}

        {!token?
            <div onClick={()=>setShowLogin(true)} className="button-signin items-center justify-center transition-all" >
               <h > Sign in</h>
            </div> :
            <div onClick={()=>setShowLogin(true)} className="profile " >
              <div className="loged-indicator">
                <ToggleOnRoundedIcon/>
                <p className="log-state">Đã đăng nhập</p>
                </div> 

              <ul className="pro5-dropdown">
              {user && (
              <li className="user-name">
                {user.firstName} {user.lastName} {/* Hiển thị tên người dùng */}
              </li>
            )}
                <hr />
                
                <li onClick={()=>logout()}>Đăng xuất <ArrowOutwardRoundedIcon/> </li>
              </ul>
            </div>
        }
        
       </div>
  )
}

export default Navbar