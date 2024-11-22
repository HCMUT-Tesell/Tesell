import './App.css'
import Navbar from "./components/Navbar/Navbar"
import Banner from "./components/Banner/banner"
import Catalog from "./components/Catalog"

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
          <div className='w-full h-20 bg-blue-700 rounded-lg'></div>
          <div className='w-full h-full bg-slate-500 rounded-lg'></div>
        </div>
      </div>
      
    </div>

  )
}

export default App
