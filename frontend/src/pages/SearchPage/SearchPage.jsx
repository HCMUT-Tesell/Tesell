// import './LandingPage.css'
import Banner from "../../components/Banner/banner"
import Catalog from "../../components/Catalog"
import Criteria from '../../components/Criteria'
import ProductSearchList from "../../components/Search/ProductSearchList"
import ProductFilter from '../../components/testFlowbite'
import CurrencyInput from "../../components/Footer/Footer"

const SearchPage = () => {
  const [searchParams] = useSearchParams(); // Lấy query params từ URL
  const searchQuery = searchParams.get('search') || ''; // Lấy giá trị từ "search"
  
  return (
    <div className='flex flex-col'>
      <div className='p-8 flex flex-row gap-4'>
        <div className='w-fit'> 
          <Catalog/>
        </div>
        <div className='flex flex-col w-full gap-4'>
          <div className='w-full h-full bg-blue-700 rounded-lg'>
            <ProductFilter/>
          </div>
          <div className='w-full h-full'>
            <ProductSearchList searchQuery={searchQuery} />
          </div>
        </div>
      </div>
      {/* <div className='rounded-xl'><ProductFilter></ProductFilter></div> */}
      {/* <div><CurrencyInput></CurrencyInput></div> */}
    </div>

  )
}

export default SearchPage
