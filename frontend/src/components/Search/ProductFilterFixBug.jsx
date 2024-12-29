// đang muốn nhập giá tiền vào sau 3 chữ số sẽ có dấu chấm ngăn cách để thể hiện rõ giá tiền
// bị lỗi khi nhập quá 6 chữ số sẽ mất đi phần nhập và fix chưa được
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastOutlinedIcon from '@mui/icons-material/SouthEastOutlined';
import { useState } from 'react';

const ProductFilter = ({ selectedSort, setSelectedSort, setPriceRange, onFilterByPrice }) => {
  const [rawPriceRange, setRawPriceRange] = useState({ min: "", max: "" });
  const formatCurrency = (number) => {
    return number.toLocaleString().replaceAll(",", ".");
  };
  
  const parseCurrencyInput = (input) => {
    const sanitizedInput = input.replace(/[^\d]/g, ""); // Loại bỏ ký tự không hợp lệ
    return sanitizedInput ? parseInt(sanitizedInput, 10) : ""; // Trả về số hoặc chuỗi rỗng
  };
  
  const handleSortChange = (sort) => {
    setSelectedSort(sort); // Cập nhật trạng thái sắp xếp
  };

  // const handlePriceChange = (e) => {
  //   setPriceRange({ ...priceRange, [e.target.name]: e.target.value }); // Cập nhật khoảng giá
  // };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = parseCurrencyInput(value); // Làm sạch giá trị nhập vào
    setRawPriceRange((preRaw) => ({ ...preRaw, [name]: sanitizedValue, }));
    setPriceRange((prevRange) => ({ ...prevRange, [name]: sanitizedValue, })); // Cập nhật priceRange chỉ khi nhấn nút "Lọc"
  };

  const handleFilterClick = () => {
    setPriceRange({
      min: formatCurrency(rawPriceRange.min),
      max: formatCurrency(rawPriceRange.max),
    });
    onFilterByPrice(); // Gọi API khi nhấn nút "Lọc"
  };

  return (
    <div className="p-4 bg-blue-200 rounded-lg shadow-md">
      {/* Sort Options */}
      <div className="mb-4 ml-2">
        <h2 className="text-lg font-semibold mb-2">Sắp xếp theo:</h2>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 border rounded ${selectedSort === 'rating=5' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleSortChange('rating=5')}
          >
            <TrendingUpIcon className='mr-1'/>
            Nổi bật
          </button>
          <button
            className={`px-4 py-2 border rounded ${selectedSort === 'newest' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleSortChange('newest')}
          >
            <FiberNewOutlinedIcon className='mr-1' />
            Hàng mới
          </button>
          <button
            className={`px-4 py-2 border rounded ${selectedSort === 'price_desc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleSortChange('price_desc')}
          >
            <SouthEastOutlinedIcon className='mr-1'/>
            Giá cao đến thấp
          </button>
          <button
            className={`px-4 py-2 border rounded ${selectedSort === 'price_asc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleSortChange('price_asc')}
          >
            <NorthEastIcon className='mr-1' />
            Giá thấp đến cao
          </button>
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-4 ml-2">
        <h2 className="text-lg font-semibold mb-2">Lọc theo giá:</h2>
        <div className="flex items-center gap-2">
          <input
            type="number"
            name="min"
            placeholder="Từ"
            value={rawPriceRange.min}
            onChange={handlePriceChange}
            className="w-44 px-2 py-1 border rounded"
          />
          đ
          <span> - </span>
          <input
            type="number"
            name="max"
            placeholder="Đến"
            value={rawPriceRange.max}
            onChange={handlePriceChange}
            className="w-44 px-2 py-1 border rounded"
          />
          đ
          <button
          
          onClick={handleFilterClick}
          className="ml-8 px-4 py-2 bg-blue-500 text-white rounded"
        > 
          <FilterAltOutlinedIcon className='mr-1'/>
          Lọc 
        </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
