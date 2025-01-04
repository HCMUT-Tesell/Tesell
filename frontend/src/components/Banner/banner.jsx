import { Carousel } from "flowbite-react";
import banner18 from '../../assets/images/banner_18.png';
import banner8 from '../../assets/images/banner_8.jpg';
import banner11 from '../../assets/images/banner_11.jpg';
import banner12 from '../../assets/images/banner_12.jpg';
import banner16 from '../../assets/images/banner_16.jpg';
const Banner = () => {
    return (
      <div className="flex flex-row p-8 grid-cols-2 gap-4">
      <Carousel slideInterval={3000} pauseOnHover className="h-[380px]">
        <img className="h-full rounded-xl" src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/f8/21/e5/e7476c38292ff3afc6748fdca9a09e26.png.webp" alt="..." />
        <img className="h-full rounded-xl" src="https://file.hstatic.net/200000722513/file/thang_12_laptop_gaming_web_slider_800x400.png" alt="..." />
        <img className="h-full rounded-xl" src="https://file.hstatic.net/200000722513/file/uu_dai_soc_banner_web_slider_800x400.png" alt="..." />       
        <img className="h-full rounded-xl" src={banner18} alt="..." />
        <img className="h-full rounded-xl" src={banner12} alt="..." />
      </Carousel>
      <Carousel slideInterval={3000} pauseOnHover className="h-[380px]" >
        <img className="h-full rounded-xl" src="https://file.hstatic.net/200000722513/file/thang_12_laptop_gaming_nvidia_ld_800x400.png" alt="..." />
        <img className="h-full rounded-xl" src="https://file.hstatic.net/200000722513/file/thang_10_banner_man_hinh_web_slider_800x400.png" alt="..." />   
        <img className="h-full rounded-xl" src={banner16} alt="..." />
        <img className="h-full rounded-xl" src={banner8} alt="..." />
        <img className="h-full rounded-xl" src={banner11} alt="..." />
        
      </Carousel>
    </div>
      );

};

export default Banner;