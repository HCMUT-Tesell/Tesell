import React, { useState } from 'react'
import plus_icon from '../assets/icons/plus.png'
import subtract_icon from '../assets/icons/subtract.png'
import { useContext } from 'react';
import { StoreContext } from './context/StoreContext';

const formatCurrency = (number) => {
  return number.toLocaleString().replaceAll(",", ".");
}
const CartItem = (product) => {

  const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);
  return (
    <div className='md:pb-[18px]'>
      <div className='bg-[#E8F3FB] flex min-w-[180px] min-h-12 gap-1 max-w-[180px] md:block md:min-w-[305px] md:min-h-[168px] md:pb-[18px]'>
        <div className='md:flex md:flex-row md:items-center md:justify-between'>
          <img src={product.image} className='w-12 h-12 md:w-[100px] md:h-[100px]' alt="" />
          <div className='hidden md:block md:w-[200px] md:truncate'><span className='md:font-bold md:text-[16px] md:text-black'>{product.productName}</span></div>
        </div>
        <div className='flex flex-col gap-0.5 items-center justify-center md:gap-0 md:min-h-[70px] md:flex md:flex-row md:justify-between md:items-center'>
          <div className='flex md:hidden'>
            <span className='text-[10px] truncate w-[120px] text-black'>{product.productName}</span>
          </div>
          <div className='flex md:w-[124px] md:h-8'>
            <div className='bg-none md:bg-[#93C8ED] flex h-3 rounded-xl items-center justify-center md:h-[40px] md:rounded-3xl  md:items-center md:gap-[8px] p-3'>
              <div className='size-5 md:size-6 md:items-center'>
                <img src={subtract_icon} className='cursor-pointer size-3 mx-0.5 my-0.5 md:size-4 md:mx-1 md:my-1' alt="" onClick={() =>  removeFromCart(product._id) } />
              </div>
              <span className='py-1 w-4 text-[8px] md:p-0 md:text-[18px] md:w-[56px] text-black'>{cartItems[product._id]}</span>
              <div className='size-4 md:size-6'>
                <img src={plus_icon} className='cursor-pointer size-3 mx-0.5 my-0.5 md:size-4 md:mx-1 md:my-1' alt=""  onClick={() => addToCart(product._id)}/>
              </div>
            </div>
          </div>
          <span className='text-[#FF0000] text-[8px] md:pr-[24px] md:font-body md:font-bold md:text-[14px]'>{formatCurrency(product.sellPrice*cartItems[product._id])}</span>
        </div>
      </div>
      <div className='border-[1px] border-[#c5eee8] md:border-[1px] md:border-black md:w-[285px]  md:rounded-sm md:my-18'></div>
    </div>
  )
}
export default CartItem
export { formatCurrency }