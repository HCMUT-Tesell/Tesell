import './LandingPage.css'
import Banner from "../../components/Banner/banner"
import Catalog from "../../components/Catalog"
import Criteria from '../../components/Criteria'
import ProductList from '../../components/Item/ProductList'
import ProductFilter from '../../components/Search/ProductFilter'
import CurrencyInput from "../../components/Footer/Footer"
import React, {useState} from 'react'
const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('bestselling');
  return (
    <div className='flex flex-col'>
      <Banner/>
      <div className='p-8 flex flex-row gap-4'>
        <div className='w-fit'> 
          <Catalog onCategoryChange={setSelectedCategory}/>
        </div>
        <div className='flex flex-col w-full gap-4'>
          <div className='w-full h-20 bg-blue-700 rounded-lg'>
            <Criteria/>
          </div>
          <div className='w-full h-full'>
            <ProductList category={selectedCategory}/>
          </div>
        </div>
      </div>
    </div>

  )
}

export default LandingPage
