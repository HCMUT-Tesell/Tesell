import { useParams } from 'react-router-dom'
import OrderDetailInfo from '../components/OrderDetailInfo/OrderDetailInfo'
import UserInfo from '../components/UserInfo/UserInfo'
import { useEffect, useState } from 'react';
import axios from 'axios'
// import { useNavigate } from 'react-router-dom';

function OrderDetail() {
    // const navigate = useNavigate();
    const url = 'http://localhost:8000'
    const [status, setStatus] = useState("")

    const {orderId} = useParams()

    const [order, setOrder] = useState({});
    const [user, setUser] = useState({});

    const [newStatus, setNewStatus] = useState("");

    const [disableButton, setDisableButton] = useState([true]);

    const [options, setOptions] = useState([
        <option key={0} value="confirmed">Đã xác nhận</option>,
        <option key={1} value="exported">Đã xuất hàng</option>,
        <option key={2} value="delivering">Đang giao hàng</option>,
        <option key={3} value="delivered">Đã giao hàng</option>]);

    useEffect(() => {
        if (status === newStatus) setDisableButton(true);
        else setDisableButton(false);
    }, [newStatus])

    useEffect(() => {
        const fetchOrder = async (orderId) => {
            try {
                const respose = await axios.get(`${url}/api/order/${orderId}`);
                // console.log(respose.data.order);
                setOrder((order) => ({...order, ...respose.data.order}));
            } catch (error) {
                console.error(error)
            }
        }
        
        fetchOrder(orderId);
    }, [orderId])

    useEffect(() => {
        const getOptions = (status) => {
            if (status === 'confirmed') return (
                [<option key={0} value="confirmed" selected>Đã xác nhận</option>,
                    <option key={1} value="exported">Đã xuất hàng</option>,
                    <option key={2} value="delivering">Đang giao hàng</option>,
                    <option key={3} value="delivered">Đã giao hàng</option>]
                );
            else if (status === 'exported') return (
                [<option key={0} value="confirmed">Đã xác nhận</option>,
                    <option key={1} value="exported" selected>Đã xuất hàng</option>,
                    <option key={2} value="delivering">Đang giao hàng</option>,
                    <option key={3} value="delivered">Đã giao hàng</option>]
            );
            else if (status === 'delivering') return (
                [<option key={0} value="confirmed" >Đã xác nhận</option>,
                    <option key={1} value="exported">Đã xuất hàng</option>,
                    <option key={2} value="delivering" selected>Đang giao hàng</option>,
                    <option key={3} value="delivered">Đã giao hàng</option>]
            );
            else if (status === 'delivered') return (
                [<option key={0} value="confirmed" >Đã xác nhận</option>,
                    <option key={1} value="exported">Đã xuất hàng</option>,
                    <option key={2} value="delivering">Đang giao hàng</option>,
                    <option key={3} value="delivered" selected>Đã giao hàng</option>]
            )
        }

        const fetchUser = async (userId) => {
            try {
                const respose = await axios.get(`${url}/api/user/${userId}`);
                // console.log("user:", respose.data);
                setUser((user) => ({...user, ...respose.data}));
            } catch (error) {
                console.error(error)
            }
        }

        fetchUser(order.user);
        setStatus(order.status)
        setOptions(getOptions(order.status));
        
    }, [order])

    const updateOrderStatus = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/order/${orderId}`, {
                status: newStatus
            })
            if (response.status) {
                alert("Cập nhật tình trạng đơn hàng thành công");
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const debug = () => {
        console.log(order);
        console.log(options);
        console.log(disableButton);
    }

    return (
        <div className='w-screen h-screen'>
            <div className='flex flex-col m-auto bg-[#E8F3FB] w-3/4 h-fit items-center gap-5 py-3 px-10 border border-[#93C8ED] rounded-md mb-5'>
                <p className='text-xl font-bold'>{`Chi tiết đơn hàng #${orderId}`}</p>
                <div className='flex flex-row justify-between w-full h-full gap-5'>
                    <OrderDetailInfo order={order}/>
                    <UserInfo email={user.email} firstName={user.firstName} lastName={user.lastName} note={order.note} shippingAddress={order.shippingAddress} phone={user.phone}/>
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
                    
                    <div className='flex flex-row w-1/3 gap-2 justify-between'>
                        <select className='w-2/3' onChange={(event) => {setNewStatus(event.target.value)}}>
                            {options}
                        </select>
                        {disableButton==true?
                        <button disabled className='px-3 rounded-md bg-blue-600 text-white font-bold border border-[#93C8ED] hover:bg-blue-800 disabled:bg-gray-500 text-center'>Cập nhật</button> 
                        :
                        <button onClick={updateOrderStatus} className='px-3 rounded-md bg-blue-600 text-white font-bold border border-[#93C8ED] hover:bg-blue-800 disabled:bg-gray-500 text-center'>Cập nhật</button>}
                    </div>
                </div>
            </div>
            <button onClick={debug} className='border p-4 disabled:bg-gray-600'>debug</button>
        </div>
    )
}

export default OrderDetail