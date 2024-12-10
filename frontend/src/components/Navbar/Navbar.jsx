import React, { useContext } from 'react'
import { useState } from 'react'
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
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const Navbar = ({setShowLogin}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isNotiVisible, setIsNotiVisible] = useState(false);
  const {token, setToken} = useContext(StoreContext);
  const url="http://localhost:8000";

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const toggleNoti = () => {
    setIsNotiVisible(!isNotiVisible);
  }



// HUHU Nó sai ở đâu á, chổ này là tui có ID để đi tìm rồi nè: localStorage.getItem("ID"), mà tìm nàm shaooooo?
  const getUserPro5ById = async () => {
    try {
        const response = await axios.get(`${url}/api/user/${localStorage.getItem("ID")}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` // Thêm token vào header
            }
        });
        return response.data.firstName;
    } catch (error) {
        console.error("Error fetching user profile:", error.message);
    }
};

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

        <div className="button-hotline">
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
            <div onClick={()=>setShowLogin(true)} className="button-signin" >
               <h > Sign in</h>
            </div> :
            <div onClick={()=>setShowLogin(true)} className="profile" >
              <div className="loged-indicator">
                <ToggleOnRoundedIcon/></div> 
                Đã đăng nhập
              <ul className="pro5-dropdown">
                <li>Đặng Tuấn</li> 
                {/* Tên người dùng sẽ hiển thị ở đây*/}
                <hr />
                <ArrowOutwardRoundedIcon/>
                <li>Đăng xuất</li>
              </ul>
            </div>
        }
        
       </div>
  )
}

export default Navbar