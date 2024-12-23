import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { useContext} from 'react';
import { StoreContext } from '../../context/StoreContext';

const ProductCard = ({id, productName, description, image,
  imageUrl,
  buyPrice,
  sellPrice,
  category,
  stockProductCount,
  storedProduct,
  rating,
  numberReviews,
  isFeature,
  brand}) => {

  const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);

  return (
    <div className="w-[236px] h-[385px] border border-gray-300 rounded-lg p-4 flex flex-col items-center m-1">
      {/* Hình ảnh sản phẩm */}
      <img src={image} alt={productName} className="w-[200px] h-[200px] object-cover rounded-md"/>

      {/* Tên sản phẩm */}
      <div className="w-[188px] h-[32px] mt-2 text-center text-sm font-semibold text-gray-800 overflow-hidden">
        {productName}
      </div>

      {/* Đánh giá sao */}
      <div className="w-[95px] h-[19px] mt-2 text-yellow-400 text-lg flex justify-center">
        {'⭐'.repeat(rating)}
        {'☆'.repeat(5 - rating)}
      </div>

      {/* Giá tiền */}
      <div className="w-[128px] h-[28px] mt-2 text-red-500 text-lg font-bold text-center">
        {sellPrice.toLocaleString('vi-VN')}₫
      </div>

      {/* Nút Thêm vào giỏ hàng */}
    {!cartItems[id] ? (
      <div
        onClick={() => 
          addToCart(id)
        }
        className="w-[200px] h-[40px] mt-2 bg-blue-500 text-white rounded-md flex items-center justify-center cursor-pointer"
      >
        <AddShoppingCartIcon />
        <span className="ml-2">Thêm vào giỏ hàng</span>
      </div>
    ) : (
      <div className="w-[100px] h-[40px] mt-2 bg-green-500 p-2 text-white rounded-full flex items-center justify-center cursor-pointer">
        <div
          onClick={() => removeFromCart(id)}
          className="w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
        >
          <RemoveCircleRoundedIcon />
        </div>
        <span className="mx-4">{cartItems[id]}</span>
        <div
          onClick={() => addToCart(id)}
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
