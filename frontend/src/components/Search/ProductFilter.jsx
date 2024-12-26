import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastOutlinedIcon from '@mui/icons-material/SouthEastOutlined';

const ProductFilter = ({ selectedSort, setSelectedSort, priceRange = { min: '', max: '' }, setPriceRange, onFilterByPrice }) => {
  const handleSortChange = (sort) => {
    setSelectedSort(sort); // Cập nhật trạng thái sắp xếp
  };

  const handlePriceChange = (e) => {
    setPriceRange({ ...priceRange, [e.target.name]: e.target.value }); // Cập nhật khoảng giá
  };

  const handleFilterClick = () => {
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
            value={priceRange.min}
            onChange={handlePriceChange}
            className="w-44 px-2 py-1 border rounded"
          />
          đ
          <span> - </span>
          <input
            type="number"
            name="max"
            placeholder="Đến"
            value={priceRange.max}
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
