import './App.css'
import Button from './components/button/button'
import Sign_out from './assets/Sign_out_icon/Sign_out_svg'
import Catalog from './components/Catalog';
import CartItem from './components/CartItem';
import Cart from './components/Cart'
import InputField from './components/InputField';
import ProductList from './components/Item/ProductList';
import ProductReview from './components/reviewProduct/ProductReview';
import Navbar from './components/Navbar/Navbar';
import Criteria from './components/Criteria';
function App() {
  const handleClick = () => {
    console.log('button was clicked!');
  };

  return (
    <>

    <div>
      <Navbar/>
      <InputField state=''/> 
      <InputField state='disabled'/>
      <InputField state='required'/>
      <ProductList/>
      <ProductReview/>
      <Criteria/>
      {/* <Catalog/> */}
      
      {/* <CartItem/> */}
      {/* <Cart/> */}
      {/* <Button label={'Click me!'} onClick={handleClick} icon_left={Sign_out()} icon_right={Sign_out()}></Button> */}
    </div>
    </>
  )
}

export default App
