import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductFilter = () => {
  const [selectedSort, setSelectedSort] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedBrand, setSelectedBrand] = useState('');
  

  const brands = ['Samsung', 'Apple', 'Xiaomi', 'Oppo', 'Vivo'];

  
  const handleSortChange = (sort) => {
    setSelectedSort(sort);
    // Thêm logic để sắp xếp sản phẩm dựa trên selectedSort
  };

  const formatNumber = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const rawValue = value.replace(/\./g, ''); // Xóa các chấm hiện có
    if (!isNaN(rawValue)) { // chỉ cho nhập số
      setPriceRange({ ...priceRange, [name]: formatNumber(rawValue) });
    }
    // Thêm logic để lọc sản phẩm theo phạm vi giá
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    // Thêm logic để lọc sản phẩm theo thương hiệu đã chọn
  };

  return (
    <div className="p-4 min-w-10 bg-blue-50 rounded shadow-md">
      <div className="mb-4">
        
        <div className="flex gap-2">
        <h2 className="text-lg font-semibold mb-2">Sắp xếp theo:</h2>
          <button
            className={`px-4 py-2 border rounded ${selectedSort === 'outstand' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleSortChange('outstand')}
          >
            Nổi bật
          </button>
          <button
            className={`px-4 py-2 border rounded ${selectedSort === 'hotselling' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleSortChange('hotselling')}
          >
            Bán chạy
          </button>
          <button
            className={`px-4 py-2 border rounded ${selectedSort === 'sale' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleSortChange('sale')}
          >
            Đang giảm giá
          </button>
          <button
            className={`px-4 py-2 border rounded ${selectedSort === 'newest' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleSortChange('newest')}
          >
            Hàng mới
          </button>
          <div className="relative">
            <button
              className={`px-4 py-2 border rounded ${selectedSort.includes('price') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handleSortChange('')}
            >
              Giá
            </button>
            <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-md">
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => handleSortChange('price_desc')}
              >
                Cao đến thấp
              </button>
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => handleSortChange('price_asc')}
              >
                Thấp đến cao
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold mb-2">Lọc theo giá:</h2>
          <input
            type="number"
            name="min"
            placeholder="Từ"
            value={priceRange.min}
            onChange={handlePriceChange}
            className="w-42 px-2 py-1 border rounded"
          />
          <span>-</span>
          <input
            type="number"
            name="max"
            placeholder="Đến"
            value={priceRange.max}
            onChange={handlePriceChange}
            className="w-24 px-2 py-1 border rounded"
          />
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <div className="flex gap-2">
          <h2 className="text-lg font-semibold mb-2">Chọn hãng:</h2>
          {brands.map((brand) => (
            <button
              key={brand}
              className={`px-4 py-2 border rounded ${selectedBrand === brand ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handleBrandSelect(brand)}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default ProductFilter;


// const [products, setProducts] = useState([]);

// useEffect(() => {
//   const fetchFilteredProducts = async () => {
//     try {
//       // Tạo query string từ các trạng thái
//       const query = new URLSearchParams({
//         sort: selectedSort || '', // Nếu không chọn sort, giữ trống
//         brand: selectedBrand || '', // Nếu không chọn brand, giữ trống
//         minPrice: priceRange.min.replace(/\./g, '') || '', // Xóa dấu chấm
//         maxPrice: priceRange.max.replace(/\./g, '') || '', // Xóa dấu chấm
//       });

//       // Gọi API bằng axios
//     const response = await axios.get(`http://localhost:8000/api/product/getAllProduct?${query.toString()}`);

//       // Cập nhật danh sách sản phẩm
//       const data = response.data;
//       setProducts(data.products || []);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };
//   // Gọi API chỉ khi có một trong các trạng thái thay đổi
//   fetchFilteredProducts();
// }, [selectedSort, priceRange, selectedBrand]);


// {/* Display Filtered Products */}
// <div className="mt-4">
// <h2 className="text-lg font-semibold mb-2">Kết quả:</h2>
// <ul>
//   {products.map((product) => (
//     <li key={product.id} className="py-2 border-b">
//       {product.name} - {formatNumber(product.price.toString())} đ
//     </li>
//   ))}
// </ul>
// </div>