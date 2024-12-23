
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm từ API
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi khi gọi API

  const [cart, setCart] = useState([]);

  // Hàm gọi API để lấy dữ liệu sản phẩm
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/product/getAllProduct?page=1&limit=10')
      .then((response) => {
        const apiProducts = response.data.products.map((product) => ({
          id: product._id,
          name: product.productName,
          image: product.imageUrl,
          price: product.sellPrice,
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
  }, []); // useEffect chỉ gọi một lần khi component được render lần đầu tiên

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };
  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-wrap p-8 justify-between">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;


// import huawei from '../../assets/images/huawei-pura.png'
// import iphone from '../../assets/images/4.jpg'
// import samsung_gala from '../../assets/images/samsung-galaxy-z-fold.png'
// import samsung_s24 from '../../assets/images/1.jpg'

  // const products = [
  //   {
  //     id: 1,
  //     image: huawei,
  //     name: 'Huawei Pura 70 Ultra',
  //     rating: 4,
  //     price: 25000000,
  //   },
  //   {
  //     id: 2,
  //     image: samsung_s24,
  //     name: 'Samsung S24 Ultra',
  //     rating: 5,
  //     price: 24000000,
  //   },
  //   {
  //     id: 3,
  //     image: iphone,
  //     name: 'Iphone 16 Pro Max',
  //     rating: 4,
  //     price: 3449000,
  //   },
  //   {
  //       id: 4,
  //       image: samsung_gala,
  //       name: 'Samsung Galaxy Z Fold6',
  //       rating: 4,
  //       price: 52999000,
  //     },
  // ];