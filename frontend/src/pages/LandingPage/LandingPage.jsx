import './LandingPage.css'
import Banner from "../../components/Banner/banner"
import Catalog from "../../components/Catalog"
import Criteria from '../../components/Criteria'
import ProductList from '../../components/Item/ProductList'
import FbComponent from '../../components/testFlowbite'
import Footer from "../../components/Footer/Footer"

const LandingPage = () => {
  return (
    <div className='flex flex-col'>
      <Banner/>
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
          </div>
        </div>
      </div>
      {/* <div className='rounded-xl'><FbComponent></FbComponent></div> */}
      {/* <div><Footer></Footer></div> */}
    </div>

  )
}

export default LandingPage
