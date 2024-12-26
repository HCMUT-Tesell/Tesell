import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Catalog = ({ onCategoryChange }) => {
  const [activeTab, setActiveTab] = useState("bestselling");
  const navigate = useNavigate();
  const tabMapping = {
    laptop: "category=Laptop",
    phone: "category=Phone",
    accessories: "category=Accessory_Watch",
    new: "sort=newest",
    prominent: "rating=5",
    bestselling: "page=1",
  }
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const mappedValue = tabMapping[tab] || "";
    onCategoryChange(mappedValue); // Gửi danh mục được chọn về ProductList
    navigate(`/`); // Chuyển hướng đến LandingPage
  };

  return (
    <div className="w-fit md:grid-cols-1">
      <div className="block  items-center bg-[#E8F3FB] rounded-[10px] md:min-h-[500px] xl:w-[250px] xl:h-[550px]">
        <span className="grid pt-1 font-semibold text-[16px] md:font-bold md:flex md:pl-[20px] md:py-4 md:leading-5 xl:pb-[25px] xl:pl-[25px] xl:font-bold xl:text-[20px]">
          Danh mục
        </span>

        <ul className="grid grid-cols-4 p-2 gap-x-2 gap-y-1 md:flex md:flex-col md:pl-[20px] md:gap-10 xl:pl-[52px] xl:gap-[40px]">
          {/* Nổi bật */}
          <span
            onClick={() => handleTabClick("prominent")}
            className={` ${activeTab === "prominent" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left xl:text-[18px] xl:font-normal`}
            // href=""
          >
            Nổi bật
          </span>
          
          {/* Sản phẩm mới */}
          <span
            onClick={() => handleTabClick("new")}
            className={` ${activeTab === "new" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left xl:text-[18px] xl:font-normal`}
            // href=""
          >
            Sản phẩm mới
          </span>

          
          {/* Bán chạy */}
          <span
            onClick={() => handleTabClick("bestselling")}
            className={` ${activeTab === "bestselling" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left xl:text-[18px] xl:font-normal`}
            // href=""
          >
            Bán chạy
          </span>
          
          {/* Điện thoại */}
          <span
            onClick={() => handleTabClick("phone")}
            className={` ${activeTab === "phone" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left  text-[12px] cursor-pointer max-h-7 md:text-left xl:text-[18px] xl:font-normal`}
            // href=""
          >
            Điện thoại
          </span>
          
          {/* Laptop */}
          <span
            onClick={() => handleTabClick("laptop")}
            className={` ${activeTab === "laptop" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left xl:text-[18px] xl:font-normal`}
            // href=""
          >
            Laptop
          </span>

          {/* Phụ kiện - Đồng hồ */}
          <span
            onClick={() => handleTabClick("accessories")}
            className={` ${activeTab === "accessories" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left xl:text-[18px] xl:font-normal`}
            // href=""
          >
            Phụ kiện - Đồng hồ
          </span>
        </ul>
      </div>
    </div>
  )
}

export default Catalog
