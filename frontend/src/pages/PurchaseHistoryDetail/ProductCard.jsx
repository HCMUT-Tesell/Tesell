const ProductCard = ({productName, imageUrl, sellPrice, quantity}) => {
    const formatCurrency = (number) => {
        return number.toLocaleString().replaceAll(",", ".");
    }

    return (
        <div className='flex flex-row gap-2 w-full bg-white rounded-md p-5 justify-between' >
            <div className='flex flex-row gap-5'>
                <div className='h-[100px] w-[100px]'>
                    <img className='object-scale-down' src={imageUrl} alt="" />
                </div>
                <div className='flex flex-col'>
                    <p className='font-bold'>{productName}</p>
                    <p className='text-gray-500'>{`Đơn giá: ${formatCurrency(sellPrice)}`}</p>
                </div>
            </div>
            <div className='flex flex-col items-end'>
                <p className='text-xl font-bold'>{formatCurrency(sellPrice * quantity)}</p>
                <p className='text-gray-500'>{`Số lượng: ${quantity}`}</p>
            </div>
        </div>
    )
}

export default ProductCard