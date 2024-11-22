// import './App.css'
import ImageSlider from './components/ImageSlider/ImageSlider';

const App = () => {
  const slides = [
    {url: 'https://salt.tikicdn.com/cache/w750/ts/tikimsp/eb/82/75/30a41db3f38baed0b9030aa36c389786.png', title: 'banner_1'},
    {url: 'https://salt.tikicdn.com/cache/w750/ts/tikimsp/6f/22/ff/731399a35bb57b48332f02e3c23c332b.jpg', title: 'banner_2'},
    {url: 'https://salt.tikicdn.com/cache/w750/ts/tikimsp/de/34/e6/90c23c3dd30a786e1f2306c6dfc51c6b.jpg', title: 'banner_3'},
    {url: 'https://salt.tikicdn.com/cache/w750/ts/tikimsp/d1/21/10/b76c83c8ecbb664b9ec458dc35ee4269.jpg', title: 'banner_4'},
  ]
  const containerStyles = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };

  return (
    <div className='p-4 w-screen h-screen bg-white' >
      <div style={containerStyles}>
        <ImageSlider slides={slides}/>
      </div>
    </div>
  )
}

export default App
