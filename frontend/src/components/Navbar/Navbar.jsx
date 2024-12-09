import React, { useContext } from 'react'
import { useState } from 'react'
import './Navbar.css'
import logo_circle from '../../assets/logo_white.png'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import Cart from '../Cart'
import Login from '../Login/Login';
import { StoreContext } from '../context/StoreContext';

const Navbar = ({setShowLogin}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isNotiVisible, setIsNotiVisible] = useState(false);
  const {token, setToken} = useContext(StoreContext);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const toggleNoti = () => {
    setIsNotiVisible(!isNotiVisible);
  }

  return (
    <div className='Navbar'>
        <img src={logo_circle} alt="" className="logo" />

        <div className="button-danh-muc">
          Danh mục sản phẩm 
          <MenuOutlinedIcon/>
        </div>
        
<div className="search-bar-container">
    <div className="sb-text"> Tìm kiếm sản phẩm </div>
    <input type="text" placeholder="Search..." className="search-input" />
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
              Loged In
            </div>
        }
        
       </div>
  )
}

export default Navbar