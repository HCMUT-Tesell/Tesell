import './App.css'
import Navbar from "./components/Navbar/Navbar"
import Banner from "./components/Banner/banner"
import Catalog from "./components/Catalog"
import Criteria from './components/Criteria'
import ProductList from './components/Item/ProductList'

const App = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-2'>
        <Navbar/>
        <Banner/>
      </div>
      <div className='p-8 flex flex-row gap-4'>
        <div className='w-fit'> 
          <Catalog/>
        </div>
        <div className='flex flex-col w-full gap-4'>
          <div className='w-full h-20 bg-blue-700 rounded-lg'>
            <Criteria/>
          </div>
          <div className='w-full h-full'>
            <ProductList/>
            <ProductList/>
            <ProductList/>
            <ProductList/>
            <ProductList/>
          </div>
        </div>
      </div>
      
    </div>

  )
}

export default App
