import { useState } from 'react'


const Catalog = ({ onCategoryChange }) => {
  const [activeTab, setActiveTab] = useState("bestselling");

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
  };

  return (
    <div className=" md:grid-cols-1">
      <div className="block items-center bg-[#E8F3FB] rounded-[10px] min-h-[120px] min-w-[400px] sm:min-w-[500px] lg:min-w-[250px]  sm:min-h-[100px] lg:min-h-[450px] xl:min-h-[500px] xl:h-[550px]">
        <span className="flex justify-center items-center lg:justify-start lg:grid p-1 font-semibold text-[16px] md:font-bold md:flex md:pl-[20px] md:pt-4 md:leading-5 xl:pb-[25px] xl:pl-[25px] xl:font-bold xl:text-[20px]">
          Danh mục
        </span>

        <ul className="grid grid-cols-4 p-2 gap-x-2 gap-y-1 px-6 lg:flex lg:flex-col lg:gap-10 lg:pl-[52px]">
          {/* Bán chạy */}
          <span
            onClick={() => handleTabClick("bestselling")}
            className={` ${activeTab === "bestselling" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left lg:text-[18px] xl:text-[18px] xl:font-normal`}
            // href=""
          >
            Bán chạy
          </span>
          
          {/* Nổi bật */}
          <span
            onClick={() => handleTabClick("prominent")}
            className={` ${activeTab === "prominent" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left lg:text-[18px] xl:text-[18px] xl:font-normal`}
            // href=""
          >
            Nổi bật
          </span>
          
          {/* Sản phẩm mới */}
          <span
            onClick={() => handleTabClick("new")}
            className={` ${activeTab === "new" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left lg:text-[18px] xl:text-[18px] xl:font-normal`}
            // href=""
          >
            Sản phẩm mới
          </span>

          {/* Điện thoại */}
          <span
            onClick={() => handleTabClick("phone")}
            className={` ${activeTab === "phone" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left  text-[12px] cursor-pointer max-h-7 md:text-left lg:text-[18px] xl:text-[18px] xl:font-normal`}
            // href=""
          >
            Điện thoại
          </span>
          
          {/* Laptop */}
          <span
            onClick={() => handleTabClick("laptop")}
            className={` ${activeTab === "laptop" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left lg:text-[18px] xl:text-[18px] xl:font-normal`}
            // href=""
          >
            Laptop
          </span>

          {/* Phụ kiện - Đồng hồ */}
          <span
            onClick={() => handleTabClick("accessories")}
            className={` ${activeTab === "accessories" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left lg:text-[18px] xl:text-[18px] xl:font-normal`}
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
