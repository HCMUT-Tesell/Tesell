import React, { useContext, useEffect } from 'react'
import './Login.css'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import logo from '../../assets/logo.png'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';


const Login = ({setShowLogin}) => {
    const {url,setToken} = useContext(StoreContext);

    const [currState, setCurrState] = useState("Đăng nhập");
    const [data, setData] = useState({
        "email":"",
        "password":"",
        "firstName":"",
        "lastName":"",
        "sex":"",
        "address":"",
        "cccd":"",
        "birthDay":"",
        "phone":""
      })
    const onchangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }


    const onLogin = async(event)=>{
        event.preventDefault();
        let newUrl=url;
        if (currState==="Đăng nhập"){
            newUrl+="/api/user/login"
        } else{
            newUrl+="/api/user/signUp"
        }
        const response = await axios.post(newUrl, data)

        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("ID", response.data._id)
            setShowLogin(false)
        }else{
            alert(response.data.message)
        }
    }

//NOTE: two states: Đăng nhập and Đăng kí
  return (
    <div className='Login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div  className="login-popup-title" >
                <img src={logo} alt="" />
               <CloseIcon onClick={()=>setShowLogin(false)} className='hover:cursor-pointer'/>
            </div>
            <div className="state">
            <h2>{currState}</h2>
            </div>
            <div className="login-popup-input">
                {currState === "Đăng kí" ? (
                    <>
                    <div className='sign-up-input-name'>
                        <input name='firstName'onChange={onchangeHandler} value={data.firstName} type="text" placeholder='Họ'/>
                        <input name='lastName' onChange={onchangeHandler} value={data.lastName} type="text" placeholder='Tên'/>
                    </div>
                    <div className="sex-birth">
                        <input name='sex' onChange={onchangeHandler} value={data.sex} type="text" placeholder='Giới tính (Nam/Nữ)'/>
                        <input name='birthDay' onChange={onchangeHandler} value={data.birthDay} type="date" placeholder='Ngày sinh'/>
                    </div>
                    <input name='address' onChange={onchangeHandler} value={data.address} type="text" placeholder='Địa chỉ'/>
                    <div className="phone-cccd">
                        <input name='cccd' onChange={onchangeHandler} value={data.cccd} type="text" placeholder='Số CCCD/Passport'/>
                       <input name='phone' onChange={onchangeHandler} value={data.phone} type="tel" placeholder='Số điện thoại'/>
                    </div>

                    </>
                ) : null}
                <input name='email' onChange={onchangeHandler} value={data.email} type="email" placeholder='Địa chỉ mail'/>
                <input name='password' onChange={onchangeHandler} value={data.password} type="password" placeholder='Mật khẩu'/>
            </div>
            <button type='submit' className='log-button'>
                <div>
                   {currState==="Đăng kí"?"Tạo tài khoản":"Đăng nhập"}
                </div>
               <div><ArrowForwardIcon/></div>
            </button>
            <div className='ask'> 
            {currState==="Đăng nhập"?
            <p>Bạn chưa có tải khoản? <span onClick={()=>setCurrState("Đăng kí")}>Tạo tài khoản mới</span></p>:
            <p>Đã có tài khoản? <span onClick={()=>setCurrState("Đăng nhập")} >Đăng nhập</span></p>
            }
            </div>
            <div className="use-term">
                <input type="checkbox" required/>
                <p>Bằng việc tiếp tục, tôi đồng ý với điều khoản sử dụng và chính sách quyền riêng tư của trang web.</p>
            </div>

           
        </form>

    </div>
  )
}

export default Login