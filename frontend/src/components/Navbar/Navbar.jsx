import React from 'react'
import './Navbar.css'
import Button from '../button/button'
import logo_circle from '../../assets/logo_white.png'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';

const Navbar = () => {
  return (
    <div className='Navbar'>
        <img src={logo_circle} alt="" className="logo" />

        <div className="button-danh-muc">
          Danh mục sản phẩm 
          <MenuOutlinedIcon/>
        </div>
        

        <div className="search-bar-container">
            <div className="sb-text"> Tìm kiếm sản phẩm </div>
            <SearchOutlinedIcon/>
        </div>

        <div className="button-hotline">
          <PhoneAndroidOutlinedIcon/>
          Hotline: +84 123 465 232
        </div>


        <NotificationsNoneOutlinedIcon sx={{ color:'white' }} />
        <ShoppingCartOutlinedIcon sx={{ color:'white' }} />
        <div className="button-signin">
         <b> Sign in<KeyboardDoubleArrowRightRoundedIcon/></b>
        </div>  
       </div>
  )
}

export default Navbar