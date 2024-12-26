import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { StoreContext } from './context/StoreContext';
import Toastify from 'toastify-js'


function AuthPage() {
    const { auth, notiMsg, setNotiMsg } = useContext(StoreContext);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // useEffect(() => {
    //     const showNoti = (notiMsg) => {
    //         if (notiMsg) {
    //             Toastify({
    //                 className: "bg-red-500 text-white absolute right-10 py-2 px-3 rounded-lg",
    //                 text: notiMsg,
    //                 duration: 3000,
    //                 gravity: "top", // `top` or `bottom`
    //                 position: "left", // `left`, `center` or `right`
    //                 stopOnFocus: true, // Prevents dismissing of toast on hover
    //                 onClick: function () { } // Callback after click
    //             }).showToast();
    //             setNotiMsg("");
    //         }
    //     }

    //     showNoti(notiMsg);
    // }, [notiMsg, setNotiMsg])

    return (
        <div className='h-screen w-screen flex flex-col gap-8 items-center justify-center'>
            <div className='text-6xl font-bold'>Tesell - Admin Dashboard</div>
            <div className='flex flex-col w-1/5 h-fit gap-3'>
                <input className='border rounded-lg px-3 py-2' type="text" placeholder='email' required onChange={(e) => {setEmail(e.target.value)}} />
                <input className='border rounded-lg px-3 py-2' type="password" placeholder='password' required onChange={(e) => {setPassword(e.target.value)}}/>
                <button className='border border-gray-200 rounded-lg px-3 py-2 text-center bg-blue-200 text-black hover:bg-blue-700 hover:text-white' onClick={() => {auth(email, password)}}>Sign In</button>
            </div>
            <div className='flex flex-col absolute bottom-1 left-2'>
                <p className='text-gray-600'>Email admin là: admin@gmail.com</p>
                <p className='text-gray-600'>Password admin là: admin</p>
            </div>
        </div>
    )
}

export default AuthPage