const UserInfo = ({ firstname, lastname, address, phone, actualShippedDate, totalPrice }) => {
    const userName = firstname + " " + lastname;

    let dateShipped = null;
    let timeShipped = null;

    const getYear = (ISO_Date) => {
        if (!ISO_Date) return ""
        return ISO_Date.substr(0, 4);
    }
    
    const getMonth = (ISO_Date) => {
        if (!ISO_Date) return ""
        return ISO_Date.substr(5, 2);
    }
    
    const getDay = (ISO_Date) => {
        if (!ISO_Date) return ""
        return ISO_Date.substr(8, 2);
    }
    
    const getTime = (ISO_Date) => {
        if (!ISO_Date) return ""
        return ISO_Date.substr(11, 5);
    }
    
    const formatCurrency = (number) => {
        if (!number) return "";
        return number.toLocaleString().replaceAll(",", ".");
    }

    if (actualShippedDate) {
        dateShipped = `${getDay(actualShippedDate)}/${getMonth(actualShippedDate)}/${getYear(actualShippedDate)}`;
        timeShipped = `${getTime(actualShippedDate)}`;
    }

    return (
        <div className='flex flex-col gap-2 w-full bg-white rounded-md p-5'>
            <div className='flex flex-row gap-3'>
                <p className='w-[120px] text-right'>Người nhận</p>
                <div className='flex flex-col'>
                    <p className='font-semibold'>{`${userName}, ${phone}`}</p>
                    <p className='font-semibold'>{`${address.replaceAll(";", ",")}`}</p>
                </div>
            </div>

            <div className='flex flex-row gap-3'>
                <p className='w-[120px] text-right'>Giao lúc</p>
                {actualShippedDate ? (<p className='font-semibold'>{`${dateShipped} - ${timeShipped}`}</p>) :  (<p className='font-semibold'>--</p>)}
                <p className='font-semibold'></p>
            </div>

            <div className='flex flex-row gap-3'>
                <p className='w-[120px] text-right'>Đã thanh toán</p>
                <p className='font-semibold'>{`${formatCurrency(totalPrice)}đ, qua cổng Momo`}</p>
            </div>
        </div>
    )
}

export default UserInfo