import './App.css'
import Button from './components/button/button'
import Sign_out from './assets/Sign_out_icon/Sign_out_svg'

function App() {
  const handleClick = () => {
    console.log('button was clicked!');
  };

  return (
    <div>
      <Button label={'Click me!'} onClick={handleClick} hasIcon={true} icon={Sign_out()} icon_position={'right'}></Button>
    </div>
  )
}

export default App
