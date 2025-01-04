import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
function UserInfo({ email, firstName, lastName, phone, shippingAddress, note }) {
    const [city, setCity] = useState("Thành phố Hồ Chí Minh");
    const [district, setDistrict] = useState("Thủ Đức");
    const [ward, setWard] = useState("Linh Trung");
    const [street, setStreet] = useState("KTX Khu A, đường Tạ Quang Bửu");

    useEffect(() => {
        if (shippingAddress) {
            const addr = shippingAddress.split(";");
            if (addr.length === 4) {
                setCity(addr[3]);
                setDistrict(addr[2]);
                setWard(addr[1]);
                setStreet(addr[0]);
            }
        }
    }, [shippingAddress])

    return (
        <div className='flex flex-col flex-grow w-1/3 h-fit border border-[#93C8ED] rounded-lg p-4 gap-3'>
            <p className="text-lg font-semibold">Thông tin nhận hàng</p>

            <div className='flex flex-col'>
                <p className='text-sm text-gray-700'>Email</p>
                <input type="text" disabled value={email} className='w-full py-2 px-3 rounded-md border border-[#B6DAF3]' />
            </div>

            <div className='flex flex-col'>
                <p className='text-sm text-gray-700'>Tên người nhận</p>
                <input type="text" disabled value={`${firstName} ${lastName}`} className='w-full py-2 px-3 rounded-md border border-[#B6DAF3]' />
            </div>

            <div className='flex flex-col'>
                <p className='text-sm text-gray-700'>Số điện thoại</p>
                <input type="text" disabled value={phone} className='w-full py-2 px-3 rounded-md border border-[#B6DAF3]' />
            </div>

            <div className='flex flex-col'>
                <p className='text-sm text-gray-700'>Tỉnh/Thành phố</p>
                <input type="text" disabled value={city} className='w-full py-2 px-3 rounded-md border border-[#B6DAF3]' />
            </div>

            <div className='flex flex-col'>
                <p className='text-sm text-gray-700'>Quận/Huyện</p>
                <input type="text" disabled value={district} className='w-full py-2 px-3 rounded-md border border-[#B6DAF3]' />
            </div>

            <div className='flex flex-col'>
                <p className='text-sm text-gray-700'>Phường/Xã</p>
                <input type="text" disabled value={ward} className='w-full py-2 px-3 rounded-md border border-[#B6DAF3]' />
            </div>

            <div className='flex flex-col'>
                <p className='text-sm text-gray-700'>Số nhà, tên đường</p>
                <input type="text" disabled value={street} className='w-full py-2 px-3 rounded-md border border-[#B6DAF3]' />
            </div>

            <div className='flex flex-col'>
                <p className='text-sm text-gray-700'>Ghi chú</p>
                <input type="text" disabled value={note} className='w-full py-2 px-3 rounded-md border border-[#B6DAF3]' />
            </div>

        </div>
    )
}

export default UserInfo