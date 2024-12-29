/* eslint-disable react/prop-types */
function OrderProductCard({ imageUrl, productName, quantity, sellingPrice }) {
    const formatCurrency = (number) => {
        if (!number) return "";
        return number.toLocaleString().replaceAll(",", ".");
    }
    return (
        <div className='p-4 flex flex-row border border-black rounded-md justify-between'>
            <div className='flex flex-row gap-5'>
                <div className='h-[100px] w-[100px]'>
                    <img className='object-scale-down' src={imageUrl} alt="" />
                </div>

                <div className='flex flex-col w-3/4 gap-2 overflow-hidden'>
                    <p className='font-bold text-lg'>{productName}</p>
                    <p>{`Đơn giá: ${formatCurrency(sellingPrice)}đ`}</p>
                </div>
            </div>

            <div className='flex flex-col gap-2 items-end min-w-[100px]'>
                <p className='font-bold text-xl text-[#127CC5]'>{`${formatCurrency(quantity * sellingPrice)}`}</p>
                <p>{`Số lượng: ${quantity}`}</p>
            </div>
        </div>
    )
}

export default OrderProductCard