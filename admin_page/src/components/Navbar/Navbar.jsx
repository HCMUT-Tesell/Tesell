import React from 'react'
import './Navbar.css'
import logo_circle from '../../assets/logo_white.png'
import {useNavigate } from 'react-router-dom';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import DevicesOtherRoundedIcon from '@mui/icons-material/DevicesOtherRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';

const Navbar = () => {
    const navigate = useNavigate();

  return (
    <div className="navbar">
        <div className="navbar-left">
            <img src={logo_circle} alt="" className="logo hover:cursor-pointer" onClick={() => navigate("/")}  />
        </div>
        <div className="navbar-center">
            <div className="device hover:cursor-pointer" onClick={() => navigate("/")}>
                <DevicesOtherRoundedIcon/>
                <li>Product</li>
            </div>
            <div className="user hover:cursor-pointer">
                <PeopleAltRoundedIcon/>
                <li>User</li>
            </div>
            <div className="manager hover:cursor-pointer">
                <ManageAccountsRoundedIcon/>
                <li>Mananger</li>
            </div>
            <div className="orders hover:cursor-pointer">
                <ViewListRoundedIcon/>
                <li>Orders</li>
            </div>
        </div>
        <div className="navbar-right">
            <div className="noti">
                <NotificationsNoneOutlinedIcon sx={{ color: 'white' }} />
            </div>
            <div className="account">
                <img src={logo_circle} alt="" className="logo"  />
            </div>
        </div>
    </div>
  )
}

export default Navbar