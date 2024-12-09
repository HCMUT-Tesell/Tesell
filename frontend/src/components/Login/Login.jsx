import React, { useContext, useEffect } from 'react'
import './Login.css'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import logo from '../../assets/logo.png'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';


const Login = ({setShowLogin}) => {
    const {url,setToken} = useContext(StoreContext);

    const [currState, setCurrState] = useState("Login");
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
        if (currState==="Login"){
            newUrl+="/api/user/login"
        } else{
            newUrl+="/api/user/signUp"
        }
        const response = await axios.post(newUrl, data)

        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            setShowLogin(false)
        }else{
            alert(response.data.message)
        }
    }

//NOTE: two states: Login and Sign Up
  return (
    <div className='Login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div  className="login-popup-title" >
                <img src={logo} alt="" />
               <CloseIcon onClick={()=>setShowLogin(false)} />
            </div>
            <div className="state">
            <h2>{currState}</h2>
            </div>
            <div className="login-popup-input">
                {currState === "Sign Up" ? (
                    <>
                    <div className='sign-up-input-name'>
                        <input name='firstName'onChange={onchangeHandler} value={data.firstName} type="text" placeholder='Your first name'/>
                        <input name='lastName' onChange={onchangeHandler} value={data.lastName} type="text" placeholder='Your last name'/>
                    </div>
                    <div className="sex-birth">
                        <input name='sex' onChange={onchangeHandler} value={data.sex} type="text" placeholder='Your sex'/>
                        <input name='birthDay' onChange={onchangeHandler} value={data.birthDay} type="date" placeholder='Your birthday'/>
                    </div>
                    <input name='address' onChange={onchangeHandler} value={data.address} type="text" placeholder='Your address'/>
                    <div className="phone-cccd">
                        <input name='cccd' onChange={onchangeHandler} value={data.cccd} type="text" placeholder='Your Citizen ID number'/>
                       <input name='phone' onChange={onchangeHandler} value={data.phone} type="tel" placeholder='Phone number'/>
                    </div>

                    </>
                ) : null}
                <input name='email' onChange={onchangeHandler} value={data.email} type="email" placeholder='Your mail'/>
                <input name='password' onChange={onchangeHandler} value={data.password} type="password" placeholder='Your password'/>
            </div>
            <button type='submit' className='log-button'>
                <div>
                   {currState==="Sign Up"?"Create account":"Login"}
                </div>
               <div><ArrowForwardIcon/></div>
            </button>
            <div className='ask'> 
            {currState==="Login"?
            <p>Bạn chưa có tải khoản? <span onClick={()=>setCurrState("Sign Up")}>Tạo tài khoản mới</span></p>:
            <p>Đã có tài khoản? <span onClick={()=>setCurrState("Login")} >Đăng nhập</span></p>
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