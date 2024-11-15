import './App.css'
import Button from './components/button/button'

function App() {
  const handleClick = () => {
    console.log('button was clicked!');
  };

  return (
    <div>
      <Button label={'Click me!'} onClick={handleClick}></Button>
    </div>
  )
}

export default App
