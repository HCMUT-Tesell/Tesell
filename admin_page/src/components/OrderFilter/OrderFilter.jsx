/* eslint-disable react/prop-types */
// import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function OrderFilter({status, setStatus, criteria, setCritera}) {
    const handleStatus = (event, newStatus) => {
        setStatus(newStatus);
    };

    const handleCriteria = (event, newCriteria) => {
        setCritera(newCriteria);
    };

    return (
        <div className='flex flex-col w-3/4 h-fit p-5 gap-3 bg-blue-50 rounded-lg sticky top-0 border border-blue-400 shadow-cart z-10'>
            <div className='text-xl font-bold'>Bộ lọc đơn hàng</div>
            {/* Sắp xếp theo */}
            <div className='flex flex-row gap-3 items-center'>
                <div>
                    Sắp xếp theo:
                </div>
                <ToggleButtonGroup
                    value={criteria}
                    onChange={handleCriteria}
                    aria-label="text formatting"
                    size='small'
                    exclusive
                >
                    <ToggleButton value="date_desc" size="small" aria-label="bold">
                        Mới nhất
                    </ToggleButton>
                    <ToggleButton value="date_asc" size="small" aria-label="italic">
                        Cũ nhất
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            
            {/* Tình trạng đơn hàng */}
            <div className='flex flex-row gap-3 items-center'>
                <div>
                    Tình trạng đơn hàng:
                </div>
                <ToggleButtonGroup
                    value={status}
                    onChange={handleStatus}
                    aria-label="text formatting"
                    size='small'
                >
                    <ToggleButton value="confirmed" size="small" aria-label="bold">
                        Đã xác nhận
                    </ToggleButton>
                    <ToggleButton value="exported" size="small" aria-label="italic">
                        Đã xuất kho
                    </ToggleButton>
                    <ToggleButton value="delivering" size="small" aria-label="underlined">
                        Đang giao hàng
                    </ToggleButton>
                    <ToggleButton value="delivered" size="small" aria-label="underlined">
                        Đã giao hàng
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    )
}

export default OrderFilter