import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="w-[236px] h-[385px] border border-gray-300 rounded-lg p-4 flex flex-col items-center shadow-sm">
      {/* Hình ảnh sản phẩm */}
      <img src={product.image} alt={product.name} className="w-[200px] h-[200px] object-cover rounded-md"/>

      {/* Tên sản phẩm */}
      <div className="w-[188px] h-[32px] mt-2 text-center text-sm font-semibold text-gray-800 overflow-hidden">
        {product.name}
      </div>

      {/* Đánh giá sao */}
      <div className="w-[95px] h-[19px] mt-2 text-yellow-400 text-lg flex justify-center">
        {'⭐'.repeat(product.rating)}
        {'☆'.repeat(5 - product.rating)}
      </div>

      {/* Giá tiền */}
      <div className="w-[128px] h-[28px] mt-2 text-red-500 text-lg font-bold text-center">
        {product.price.toLocaleString('vi-VN')}₫
      </div>

      {/* Nút Thêm vào giỏ hàng */}
      <button
        className="w-[190px] h-[44px] mt-4 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition"
        onClick={() => onAddToCart(product)}
      >
        Thêm vào giỏ hàng
        <AddShoppingCartIcon className="ml-1"/>
      </button>
    </div>
  );
};

export default ProductCard;
