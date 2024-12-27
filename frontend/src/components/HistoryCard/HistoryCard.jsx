import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate } from 'react-router-dom';

const HistoryCard = ({dateOrdered, status, orderId, totalPrice, images}) => {
    const navigate = useNavigate();

    const getYear = (ISO_Date) => {
        return ISO_Date.substr(0, 4);
    }

    const getMonth = (ISO_Date) => {
        return ISO_Date.substr(5, 2);
    }

    const getDay = (ISO_Date) => {
        return ISO_Date.substr(8, 2);
    }

    const getTime = (ISO_Date) => {
        return ISO_Date.substr(11, 5);
    }

    const formatCurrency = (number) => {
        return number.toLocaleString().replaceAll(",", ".");
    }

    const getStatus = (status) => {
        if (status == 'confirmed') return "Đã xác nhận";
        else if (status == 'exported') return "Đã xuất hàng";
        else if (status == 'delivering') return "Đang giao hàng";
        else if (status == 'delivered') return "Giao hàng thành công";
    }
    
    return (
        <div className='w-3/4 h-fit p-5 bg-gray-200 rounded-lg'>
            {/* Ngày đặt ------ Trạng thái */}
            <div className='mb-2 flex flex-row justify-between'>
                <div className='flex flex-row gap-2'>
                    <div>Ngày đặt:</div>
                    <div className='font-bold'>{`${getDay(dateOrdered)}/${getMonth(dateOrdered)}/${getYear(dateOrdered)}`} - {getTime(dateOrdered)}</div>
                </div>

                <div className='flex flex-row gap-2'>
                    <div>Trạng thái:</div>
                    <div className='font-bold'>{getStatus(status)}</div>
                </div>
            </div>

            {/* Đơn hàng ------- Tổng tiền */}
            <div className='mb-2 flex flex-row justify-between'>
                <div className='flex flex-row gap-2'>
                    <div>Đơn hàng:</div>
                    <div className='font-bold'>{orderId}</div>
                </div>

                <div className='flex flex-row gap-2'>
                    <div className='font-bold text-lg'>{formatCurrency(totalPrice)}đ</div>
                </div>
            </div>

            {/* Hình ảnh ------- Chi tiết đơn hàng */}
            <div className='mb-2 flex flex-row justify-between'>
                <div className='flex flex-row gap-2'>
                    {images.map((imageURL, index) => {
                        return (
                            <div key={index} className='w-[100px] h-[100px]'>
                                <img src={imageURL} className='object-scale-down rounded-md' alt="" />
                            </div>
                        )
                    })}
                </div>
                
                <div className='relative w-[150px] hover:cursor-pointer' onClick={() => navigate(`/PurchaseHistory/${orderId}`)}>
                    <div className='absolute flex flex-row bottom-0 right-0 w-fit'>
                        <p className='text-blue-600 font-semibold'>Xem chi tiết</p>
                        <ArrowRightIcon sx={{ color: "blue" }}/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HistoryCard