import Divider from '@mui/material/Divider';
import OrderProductCard from '../OrderProductCard/OrderProductCard';

function OrderDetailInfo() {
  return (
    <div className='flex flex-col flex-grow w-2/3 h-fit  border rounded-lg border-[#93C8ED] p-4 gap-2'>
        <div className="flex flex-row justify-between">
            <p className="font-bold">Đơn hàng</p>
            <div className="flex flex-row gap-2">
                <p className="font-bold">Ngày đặt hàng:</p>
                <p>2024/12/29 - 09:00</p>
            </div>
        </div>
            <Divider></Divider>

        <div className='flex flex-col h-[453px] gap-3 overflow-scroll'>
            <OrderProductCard/>
            <OrderProductCard/>
            <OrderProductCard/>
            <OrderProductCard/>
            <OrderProductCard/>
            <OrderProductCard/>
        </div>

        <Divider></Divider>
        
        <div className='flex flex-row justify-between'>
            <p>Tổng giá trị</p>
            <p className='text-lg font-bold text-[#127CC5]'>100.000.000đ</p>
        </div>
        <div className='flex flex-row justify-between'>
            <p>Phí vận chuyển, phụ phí</p>
            <p className='text-lg font-bold text-[#127CC5]'>50.000đ</p>
        </div>

        <Divider></Divider>

        <div className='flex flex-row justify-between'>
            <p>Tổng giá trị đơn hàng</p>
            <p className='text-xl font-bold text-[#127CC5]'>100.050.000đ</p>
        </div>
        
    </div>
  )
}

export default OrderDetailInfo