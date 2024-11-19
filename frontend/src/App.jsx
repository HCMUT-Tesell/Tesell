import './App.css'
import Button from './components/button/button'
import Sign_out from './assets/Sign_out_icon/Sign_out_svg'
import Catalog from './components/Catalog';
import CartItem from './components/CartItem';
import Cart from './components/Cart'

function App() {
  const handleClick = () => {
    console.log('button was clicked!');
  };

  return (
    <div>
      {/* <Catalog/> */}
      {/* <CartItem/> */}
      <Cart/>
      {/* <Button label={'Click me!'} onClick={handleClick} icon_left={Sign_out()} icon_right={Sign_out()}></Button> */}
    </div>
  )
}

export default App
