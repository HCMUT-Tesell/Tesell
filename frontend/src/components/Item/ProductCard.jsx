import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { useState, useEffect } from 'react';

const ProductCard = ({product}) => {

 const [cartItems, setCartItems] = useState({});
const addToCart = (productName) => {
    if (!cartItems[productName]) {
      setCartItems((prev)=>({...prev, [productName]: 1}));
    }
    else {
      setCartItems((prev)=>({...prev, [productName]: prev[productName] + 1}));
    }

}
const removeFromCart = (productName) => {
  setCartItems((prev)=>({...prev, [productName]: prev[productName] - 1}));
}
useEffect(() => {
  console.log(cartItems);
}, [cartItems]);

  return (
    <div className="w-[236px] h-[385px] border border-gray-300 rounded-lg p-4 flex flex-col items-center m-3">
      {/* Hình ảnh sản phẩm */}
      <img src={product.image} alt={product.productName} className="w-[200px] h-[200px] object-cover rounded-md"/>

      {/* Tên sản phẩm */}
      <div className="w-[188px] h-[32px] mt-2 text-center text-sm font-semibold text-gray-800 overflow-hidden">
        {product.productName}
      </div>

      {/* Đánh giá sao */}
      <div className="w-[95px] h-[19px] mt-2 text-yellow-400 text-lg flex justify-center">
        {'⭐'.repeat(product.rating)}
        {'☆'.repeat(5 - product.rating)}
      </div>

      {/* Giá tiền */}
      <div className="w-[128px] h-[28px] mt-2 text-red-500 text-lg font-bold text-center">
        {product.sellPrice.toLocaleString('vi-VN')}₫
      </div>

      {/* Nút Thêm vào giỏ hàng */}
    {!cartItems[product.productName] ? (
      <div
        onClick={() => 
          addToCart(product.productName)
        }
        className="w-[200px] h-[40px] mt-2 bg-blue-500 text-white rounded-md flex items-center justify-center cursor-pointer"
      >
        <AddShoppingCartIcon />
        <span className="ml-2">Thêm vào giỏ hàng</span>
      </div>
    ) : (
      <div className="w-[200px] h-[40px] mt-2 bg-blue-500 text-white rounded-md flex items-center justify-center cursor-pointer">
        <div
          onClick={() => removeFromCart(product.productName)}
          className="w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
        >
          <RemoveCircleRoundedIcon />
        </div>
        <span className="mx-4">{cartItems[product.productName]}</span>
        <div
          onClick={() => addToCart(product.productName)}
          className="w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
        >
          <AddCircleRoundedIcon />
        </div>
      </div>
    )
    }
    </div>
  );
};

export default ProductCard;
