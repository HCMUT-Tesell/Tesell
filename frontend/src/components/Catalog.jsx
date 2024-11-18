import { useState } from 'react'


const Catalog = () => {
    const [activeTab, setActiveTab] = useState("phone");

  return (
    <div className="w-[316px] md:grid-cols-1 md:w-[140px]">
        <div className="block  items-center bg-[#E8F3FB] rounded-[10px] md:min-h-[500px] xl:w-[250px] xl:h-[550px]  xl:fixed xl:top-8 xl:left-22">
          <span className="grid pt-1 font-semibold text-[16px] md:font-bold md:flex md:pl-[20px] md:py-4 md:leading-5 xl:pb-[25px] xl:pl-[25px] xl:font-bold xl:text-[20px]">
            Danh mục
          </span>
          <ul className="grid grid-cols-4 p-2 gap-x-2 gap-y-1 md:flex md:flex-col md:pl-[20px] md:gap-10 xl:pl-[52px] xl:gap-[40px]">
            <span
              onClick={() => setActiveTab("phone")}
              className={` ${
                activeTab === "phone" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left  text-[12px] cursor-pointer max-h-7 md:text-left xl:text-[18px] xl:font-normal`}
              href=""
            >
              Điện thoại
            </span>
            <span
              onClick={() => setActiveTab("laptop")}
              className={` ${
                activeTab === "laptop" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left xl:text-[18px] xl:font-normal`}
              href=""
            >
              Laptop
            </span>
            <div className='grid grid-rows-subgrid col-span-2'>

                <span
                onClick={() => setActiveTab("accessories")}
                className={` ${
                    activeTab === "accessories" ? `text-[#0E6199]` : `text-black`
                }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left xl:text-[18px] xl:font-normal`}
                href=""
                >
                Phụ kiện - Đồng hồ
                </span>
            </div>
            
            <span
              onClick={() => setActiveTab("household")}
              className={` ${
                activeTab === "household" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left xl:text-[18px] xl:font-normal`}
              href=""
            >
              Đồ gia dụng
            </span>
            <span
              onClick={() => setActiveTab("new")}
              className={` ${
                activeTab === "new" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left xl:text-[18px] xl:font-normal`}
              href=""
            >
              Sản phẩm mới
            </span>
            <span
              onClick={() => setActiveTab("prominent")}
              className={` ${
                activeTab === "prominent" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left xl:text-[18px] xl:font-normal`}
              href=""
            >
              Nổi bật
            </span>
            <span
              onClick={() => setActiveTab("bestselling")}
              className={` ${
                activeTab === "bestselling" ? `text-[#0E6199]` : `text-black`
              }  flex font-normal text-left text-[12px] cursor-pointer max-h-7  md:text-left xl:text-[18px] xl:font-normal`}
              href=""
            >
              Bán chạy
            </span>
          </ul>
        </div>
      </div>
  )
}

export default Catalog
