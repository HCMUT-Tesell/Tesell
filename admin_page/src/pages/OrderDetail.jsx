import { useParams } from 'react-router-dom'
import OrderDetailInfo from '../components/OrderDetailInfo/OrderDetailInfo'
import UserInfo from '../components/UserInfo/UserInfo'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';

function OrderDetail() {
    const [status, setStatus] = useState("Confirmed")

    const {orderId} = useParams()
    return (
        <div className='w-screen h-screen'>
            <div className='flex flex-col m-auto bg-[#E8F3FB] w-3/4 h-fit items-center gap-5 py-3 px-10 border border-[#93C8ED] rounded-md mb-5'>
                <p className='text-xl font-bold'>{`Chi tiết đơn hàng ${orderId}`}</p>
                <div className='flex flex-row justify-between w-full h-full gap-5'>
                    <OrderDetailInfo/>
                    <UserInfo/>
                </div>
                <div className='flex flex-row w-full h-fit gap-5 item items-end'>
                    <div className='flex flex-col flex-grow w-2/3 h-fit  border rounded-lg border-[#93C8ED] px-4 py-2 gap-2'>
                        <div className='flex flex-row gap-2'>
                            <p className='font-bold'>Thông tin thanh toán:</p>
                            <p>Thanh toán khi nhận hàng</p>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <p className='font-bold'>Hình thức vận chuyển:</p>
                            <p>Nhận tại cửa hàng</p>
                        </div>
                    </div>
                    
                    <div className='w-1/3'>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Tình trạng đơn hàng
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Tình trạng đơn hàng"
                            sx={{width: "100%"}}
                            onChange={(event) => {setStatus(event.target.value)}} 
                        >
                            <MenuItem value={"Confirmed"}>Đã xác nhận</MenuItem>
                            <MenuItem value={"Exported"}>Đã xuất hàng</MenuItem>
                            <MenuItem value={'Delivering'}>Đang giao hàng</MenuItem>
                            <MenuItem value={'Delivered'}>Đã giao hàng</MenuItem>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail