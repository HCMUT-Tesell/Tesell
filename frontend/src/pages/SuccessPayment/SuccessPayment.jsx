import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
    const navigate = useNavigate();
    return (
        <div className="justify-items-center">
            <img className="mt-40 h-[150px] w-[150px]" src="https://cdn-icons-png.flaticon.com/128/9431/9431186.png" alt="..." />
            <h2 className="mt-4 text-red-500 font-semibold text-3xl">
                Đặt hàng thành công!
            </h2>
            <div className='flex justify-center mt-10'>
                <button onClick={() => navigate(`/`)} className='bg-gray-200 border-gray-400 border-2 font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-gray-300 hover:shadow-xl mr-6'>
                    Xem chi tiết đơn hàng
                </button>
                <button onClick={() => navigate(`/`)} className='bg-blue-500 text-white border-gray-400 border-2 font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl'>
                    Tiếp tục mua hàng
                </button>
            </div>
        </div>
    )  
}

export default SuccessPayment;