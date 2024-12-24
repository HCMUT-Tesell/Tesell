import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';

const ProductList = () => {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm từ API
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi khi gọi API

  const [cart, setCart] = useState([]);

  // Hàm gọi API để lấy dữ liệu sản phẩm
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/product/getAllProduct?page=1&limit=100')
      .then((response) => {
        const apiProducts = response.data.products.map((product) => ({
          id: product._id,
          productName: product.productName,
          image: product.imageUrl,
          sellPrice: product.sellPrice,
          rating: Math.round(product.rating), // Làm tròn rating thành số nguyên
        }));
        setProducts(apiProducts); // Cập nhật danh sách sản phẩm
        setLoading(false); // Đánh dấu đã tải xong
      })
      .catch((err) => {
        console.error('Lỗi khi gọi API:', err); // Ghi log lỗi vào console
        setError('Không thể tải dữ liệu sản phẩm.');
        setLoading(false);
      });
  }, [products]); // useEffect chỉ gọi một lần khi component được render lần đầu tiên

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };
  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-wrap p-8 justify-between ">
      {products.map((item, index) => {
         return <ProductCard key={index} id={item.id} productName={item.productName} description={item.description} image={item.image}
         imageUrl = {item.imageUrl}
         buyPrice = {item.buyPrice}
         sellPrice = {item.sellPrice}
         category = {item.category}
         stockProductCount = {item.stockProductCount}
         storedProduct = {item.storedProduct}
         rating = {item.rating}
         numberReviews  = {item.numberReviews}
         isFeature  = {item.isFeature}
         brand = {item.brand} />
})}
    </div>
  );
};

export default ProductList;
