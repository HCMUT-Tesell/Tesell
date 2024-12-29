import { useParams } from 'react-router-dom'

function OrderDetail() {
    const {orderId} = useParams()
    return (
        <div className='w-screen h-full flex justify-center'>
            <p className='text-xl font-bold'>{`Trang xem thông tin đơn hàng có mã đơn ${orderId}`}</p>
        </div>
    )
}

export default OrderDetail