import banner5 from "../../assets/images/banner_5.jpg";
import banner6 from "../../assets/images/banner_6.png";
import banner7 from "../../assets/images/banner_7.jpg";
import banner9 from "../../assets/images/banner_9.jpg";
import banner10 from "../../assets/images/banner_10.jpg";
import banner13 from "../../assets/images/banner_13.jpeg";
import banner15 from "../../assets/images/banner_15.jpg";
import banner17 from "../../assets/images/banner_17.jpg";

import { Carousel } from "flowbite-react";
const Footer = () => {
    return (
        <div className="h-[400px] p-8">
        <Carousel>
          <img src={banner13} alt="..." />
          <img src={banner6} alt="..." />
          <img src={banner7} alt="..." />
          <img src={banner9} alt="..." />
          <img src={banner10} alt="..." />
          <img src={banner5} alt="..." />
          <img src={banner15} alt="..." />
          <img src={banner17} alt="..." />
        </Carousel>
      </div>
    );
};

export default Footer;