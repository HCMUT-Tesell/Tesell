import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductFilter from './ProductFilter';
import ProductCard from '../Item/ProductCard';

const ProductSearchList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm từ API
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi khi gọi API

  const [selectedSort, setSelectedSort] = useState(''); // Lọc theo sắp xếp
  const [priceRange, setPriceRange] = useState({ min: '', max: '' }); // Lọc theo giá
  const [activePriceRange, setActivePriceRange] = useState({ min: '', max: '' });
  
  // Build URL API
  const buildApiUrl = () => {
    let url = `http://localhost:8000/api/product/getAllProduct?search=${encodeURIComponent(searchQuery)}`;

    if (selectedSort) {
      url += `&sort=${encodeURIComponent(selectedSort)}`;
    }

    if (priceRange.min) {
      url += `&minPrice=${priceRange.min}`;
    }

    if (priceRange.max) {
      url += `&maxPrice=${priceRange.max}`;
    }

    return url;
  };

  // Hàm gọi API
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = buildApiUrl();
      const response = await axios.get(url);
      setProducts(response.data.products || []);
    } catch (err) {
      console.error('Lỗi khi gọi API:', err);
      setError('Không thể tải dữ liệu sản phẩm.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByPrice = () => {
    setActivePriceRange({ ...priceRange });
  }

  // Gọi API khi searchQuery, selectedSort hoặc priceRange thay đổi
  useEffect(() => {
    if (!searchQuery) return; // Nếu không có searchQuery, không gọi API
    fetchProducts();
  }, [searchQuery, selectedSort, activePriceRange]); // Theo dõi các thay đổi

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col p-3 gap-4">
      {/* Bộ lọc sản phẩm */}
      <ProductFilter
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        onFilterByPrice={handleFilterByPrice}
      />

      {/* Danh sách sản phẩm */}
      <div className="flex flex-wrap justify-between">
        {products.length > 0 ? (
          products.map((item, index) => (
            <ProductCard
              key={index}
              id={item._id}
              productName={item.productName}
              description={item.description}
              image={item.image}
              imageUrl = {item.imageUrl}
              sellPrice={item.sellPrice}
              category={item.category}
              stockProductCount={item.stockProductCount}
              rating={item.rating}
              numberReviews={item.numberReviews}
              brand={item.brand}
            />
          ))
        ) : (
          <div>Không có sản phẩm nào phù hợp.</div>
        )}
      </div>
    </div>
  );
};

export default ProductSearchList;
