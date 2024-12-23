
import { Carousel } from "flowbite-react";
import banner1 from '../assets/images/banner_1.jpg';
import banner2 from '../assets/images/banner_2.png';
import banner3 from '../assets/images/banner_3.jpg';
import banner4 from '../assets/images/banner_4.png';
import banner8 from '../assets/images/banner_8.jpg';
import banner11 from '../assets/images/banner_11.jpg';
import banner12 from '../assets/images/banner_12.jpg';
import banner14 from '../assets/images/banner_14.jpg';
import banner16 from '../assets/images/banner_16.jpg';
const FbComponent = () => {
    return (
      <div className="flex flex-row p-8 grid-cols-2 gap-4">
      <Carousel slideInterval={3000} pauseOnHover className="h-[400px]">
        <img className="h-[380px] rounded-xl border-gray-200" src={banner2} alt="..." />
        <img className="h-[380px] rounded-xl border-gray-200" src={banner3} alt="..." />
        <img className="h-[380px] rounded-xl border-gray-200" src={banner4} alt="..." />
        <img className="h-[380px] rounded-xl border-gray-200" src={banner1} alt="..." />
        <img className="h-[380px] rounded-xl border-gray-200" src={banner3} alt="..." />       
      </Carousel>
      <Carousel slideInterval={3000} pauseOnHover className="h-[400px]" >
        <img className="h-[380px] rounded-xl" src={banner8} alt="..." />
        <img className="h-[380px] rounded-xl" src={banner11} alt="..." />
        <img className="h-[380px] rounded-xl" src={banner12} alt="..." />
        <img className="h-[380px] rounded-xl" src={banner14} alt="..." />
        <img className="h-[380px] rounded-xl" src={banner16} alt="..." />       
      </Carousel>
    </div>
      );

};

export default FbComponent;