import React from 'react'
import { useState } from 'react'
import './Navbar.css'
import Button from '../button/button'
import logo_circle from '../../assets/logo_white.png'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import Cart from '../Cart'

const Navbar = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isNotiVisible, setIsNotiVisible] = useState(false);
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

        <div className="button-signin">
         <b> Sign in<KeyboardDoubleArrowRightRoundedIcon/></b>
        </div>  
       </div>
  )
}

export default Navbar