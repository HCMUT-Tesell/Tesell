import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { useContext} from 'react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
const ProductCard = ({ 
  id, 
  productName, 
  description, 
  image,
  imageUrl,
  buyPrice,
  sellPrice,
  category,
  stockProductCount,
  storedProduct,
  rating,
  numberReviews,
  isFeature,
  brand }) => {

  // console.log(id);
  
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const navigate = useNavigate();

  //Hàm chuyển đến trang chi tiết sản phẩm
  const handleNavigate = () => {
    navigate(`/product/${id}`);

    // handleClicked();
  }

  const handleClicked = () => {
    console.log(id)
  }

  return (
    <div className="w-[236px] h-[400px] border border-gray-300 rounded-lg p-4 my-5 flex flex-col items-center shadow-sm transform hover:scale-110 hover:cursor-pointer" onClick={handleNavigate} >
      {/* Hình ảnh sản phẩm */}
      <Link to={`/ProductDetail/${id}`}><img src={imageUrl} alt={productName} onClick={window.scrollTo(0, 0)} className="w-[200px] h-[200px] object-cover rounded-md"/></Link>
      
      {/* Tên sản phẩm */}
      <div className="w-[188px] min-h-[32px] h-fit mt-2 text-center text-sm font-semibold text-gray-800">
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
