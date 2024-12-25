import { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../context/StoreContext';

const Catalog = () => {
  const [activeTab, setActiveTab] = useState("Phone");
  const { setCategory } = useContext(StoreContext)
  
  return (
    <div className="w-fit md:grid-cols-1">
      <div className="block  items-center bg-[#E8F3FB] rounded-[10px] md:min-h-[500px] xl:w-[250px] xl:h-[550px]">
        <span className="grid pt-1 font-semibold text-[16px] md:font-bold md:flex md:pl-[20px] md:py-4 md:leading-5 xl:pb-[25px] xl:pl-[25px] xl:font-bold xl:text-[20px]">
          Danh mục
        </span>

        <ul className="grid grid-cols-4 p-2 gap-x-2 gap-y-1 md:flex md:flex-col md:pl-[20px] md:gap-10 xl:pl-[52px] xl:gap-[40px]">
          {/* Nổi bật */}
          <span
            onClick={() => setActiveTab("prominent")}
            className={` ${activeTab === "prominent" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left xl:text-[18px] xl:font-normal`}
            href=""
          >
            Nổi bật
          </span>
          
          {/* Sản phẩm mới */}
          <span
            onClick={() => setActiveTab("new")}
            className={` ${activeTab === "new" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left xl:text-[18px] xl:font-normal`}
            href=""
          >
            Sản phẩm mới
          </span>

          
          {/* Bán chạy */}
          <span
            onClick={() => setActiveTab("bestselling")}
            className={` ${activeTab === "bestselling" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left xl:text-[18px] xl:font-normal`}
            href=""
          >
            Bán chạy
          </span>
          
          {/* Điện thoại */}
          <span
            onClick={() => {setActiveTab("Phone"); setCategory("Phone")}}
            className={` ${activeTab === "Phone" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left  text-[12px] cursor-pointer max-h-7 md:text-left xl:text-[18px] xl:font-normal`}
            href=""
          >
            Điện thoại
          </span>
          
          {/* Laptop */}
          <span
            onClick={() => {setActiveTab("Laptop"); setCategory("Laptop")}}
            className={` ${activeTab === "Laptop" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left xl:text-[18px] xl:font-normal`}
            href=""
          >
            Laptop
          </span>

          {/* Phụ kiện - Đồng hồ */}
          <span
            onClick={() => {setActiveTab("Accessory_Watch"); setCategory("Accessory_Watch")}}
            className={` ${activeTab === "Accessory_Watch" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left xl:text-[18px] xl:font-normal`}
            href=""
          >
            Phụ kiện - Đồng hồ
          </span>
        </ul>
      </div>
    </div>
  )
}

export default Catalog
