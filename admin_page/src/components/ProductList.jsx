import { useState, useEffect,  } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard'

const ProductList = (prop) => {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm từ API
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi khi gọi API
  useEffect(() => {
    setError(null);
    setLoading(true); // Đánh dấu đang tải dữ liệu
    axios
      .get(`http://localhost:8000/api/product/getAllProduct?limit=100&${prop.category}`)
      .then((response) => {
        setProducts(response.data.products); // Cập nhật danh sách sản phẩm
        setLoading(false); // Đánh dấu đã tải xong
      })
      .catch((err) => {
        console.error('Lỗi khi gọi API:', err); // Ghi log lỗi vào console
        setError('Không thể tải dữ liệu sản phẩm.');
        setLoading(false);
      });
  }, [prop.category]); // Gọi lại api mỗi khi category thay đổi

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>{error}</div>;
  
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {products.map((item, index) => {
         return <ProductCard key={index} product={item} signal={prop.signal} target={prop.target}/>
      })}
    </div>
  );
};

export default ProductList;