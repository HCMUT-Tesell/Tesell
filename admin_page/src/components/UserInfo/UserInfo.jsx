import { Input } from '@mui/base/Input';

function UserInfo() {
  return (
    <div className='flex flex-col flex-grow w-1/3 h-fit border border-[#93C8ED] rounded-lg p-4 gap-3'>
        <p className="text-lg font-semibold">Thông tin nhận hàng</p>
        
        <div className='flex flex-col'>
            <p className='text-sm text-gray-700'>Email</p>
            <input type="text" disabled value={"khoi.trananh2004@hcmut.edu.vn"} className='w-full py-2 px-3 rounded-md border border-[#B6DAF3]'/>
        </div>

        <div className='flex flex-col'>
            <p className='text-sm text-gray-700'>Tên người nhận</p>
            <input type="text" disabled value={"Trần Anh Khôi"} className='w-full py-2 px-3 rounded-md border border-[#B6DAF3]'/>
        </div>

        <div className='flex flex-col'>
            <p className='text-sm text-gray-700'>Số điện thoại</p>
            <input type="text" disabled value={"0123456789"} className='w-full py-2 px-3 rounded-md border border-[#B6DAF3]'/>
        </div>

        <div className='flex flex-col'>
            <p className='text-sm text-gray-700'>Tỉnh/Thành phố</p>
            <input type="text" disabled value={"Thành phố Hồ Chí Minh"} className='w-full py-2 px-3 rounded-md border border-[#B6DAF3]'/>
        </div>

        <div className='flex flex-col'>
            <p className='text-sm text-gray-700'>Quận/Huyện</p>
            <input type="text" disabled value={"Thủ Đức"} className='w-full py-2 px-3 rounded-md border border-[#B6DAF3]'/>
        </div>

        <div className='flex flex-col'>
            <p className='text-sm text-gray-700'>Phường/Xã</p>
            <input type="text" disabled value={"Linh Trung"} className='w-full py-2 px-3 rounded-md border border-[#B6DAF3]'/>
        </div>

        <div className='flex flex-col'>
            <p className='text-sm text-gray-700'>Số nhà, tên đường</p>
            <input type="text" disabled value={"KTX Khu A, đường Tạ Quang Bửu"} className='w-full py-2 px-3 rounded-md border border-[#B6DAF3]'/>
        </div>

        <div className='flex flex-col'>
            <p className='text-sm text-gray-700'>Ghi chú</p>
            <input type="text" disabled value={"Sốp muốn ship đi đâu thì ship"} className='w-full py-2 px-3 rounded-md border border-[#B6DAF3]'/>
        </div>
        
    </div>
  )
}

export default UserInfo