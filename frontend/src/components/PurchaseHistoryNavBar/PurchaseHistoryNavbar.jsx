import React from 'react'
import { useNavigate } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const PurchaseHistoryNavbar = ({orderId}) => {
    const navigate = useNavigate();

    if (!orderId) {
        return (
            <div className='w-3/4 bg-gray-200 py-1 px-3 static flex items-center justify-center rounded-lg'>
                <div className='hover:cursor-pointer h-7 w-7 items-center' onClick={() => navigate('/')}>
                    <ChevronLeftIcon/>
                </div>
                <div className='text-center font-bold text-xl w-full'>
                    Đơn hàng từng mua
                </div>
                <div className='h-8 w-8 invisible'>
                    <ChevronLeftIcon/>
                </div>
            </div>
        )
    } else {
        return (
            <div className='w-3/4 bg-gray-200 py-1 px-3 static flex items-center justify-center rounded-lg'>
                <div className='hover:cursor-pointer h-7 w-7 items-center' onClick={() => navigate('/PurchaseHistory')}>
                    <ChevronLeftIcon/>
                </div>
                <div className='text-center font-bold text-xl w-full'>
                    {`Chi tiết đơn hàng ${orderId}`}
                </div>
                <div className='h-8 w-8 invisible'>
                    <ChevronLeftIcon/>
                </div>
            </div>
        )
    }
}

export default PurchaseHistoryNavbar