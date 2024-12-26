// import './LandingPage.css'
import Banner from "../../components/Banner/banner"
import Catalog from "../../components/Catalog"
import Criteria from '../../components/Criteria'
import ProductSearchList from "../../components/Search/ProductSearchList"
import ProductFilter from '../../components/Search/ProductFilter'
import CurrencyInput from "../../components/Footer/Footer"
import { useSearchParams } from 'react-router-dom';
import {useState} from 'react'
const SearchPage = () => {
  const [searchParams] = useSearchParams(); // Lấy query params từ URL
  const searchQuery = searchParams.get('search') || ''; // Lấy giá trị từ "search"
  const [selectedCategory, setSelectedCategory] = useState('bestselling');
  return (
    <div className='flex flex-col'>
      <div className='p-8 flex flex-row gap-4'>
        <div className='w-fit'> 
          <Catalog onCategoryChange={setSelectedCategory}/>
        </div>
        <div className='flex flex-col w-full h-full gap-4'>
            <ProductSearchList category={selectedCategory} searchQuery={searchQuery} />
        </div>
      </div>
    </div>

  )
}

export default SearchPage
