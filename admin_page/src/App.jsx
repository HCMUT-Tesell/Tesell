import Navbar from "./components/navbar/navbar"
import { Route, Routes } from 'react-router-dom'


const App = () => {
  //const url = "http://localhost:4000";
  return (
   // <>
    <div className='app'>
      <Navbar />
      {/* <Routes>
        <Route path="/user" element={<Add url={url}/>}/>
        <Route path="/device" element={<Device url={url}/>}/>
        <Route path="/manager" element={<List url={url}/>}/>
        <Route path="/orders" element={<Orders url={url}/>}/>
      </Routes> */}
    </div>
    //</>
  )
}

export default App
