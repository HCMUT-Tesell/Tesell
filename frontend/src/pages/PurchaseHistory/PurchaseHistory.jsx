import PurchaseHistoryNavbar from '../../components/PurchaseHistoryNavBar/PurchaseHistoryNavbar'
import HistoryCard from '../../components/HistoryCard/HistoryCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
const url = "http://localhost:8000";

function PurchaseHistory() {
    const tests = [{
        dateOrdered: "2024-12-24T13:43:59.341+00:00", 
        status: "delivering", 
        orderId: "676abd113ef808f1436523f5", 
        totalPrice: 50000000, 
        images: [
            "https://cdn.tgdd.vn/Products/Images/42/327343/xiaomi-poco-m6-black-thumb-600x600.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/320734/xiaomi-redmi-a3-xanh-l%C3%A1-thumb-600x600.jpg", 
            "https://cdn.tgdd.vn/Products/Images/42/328626/realme-c65s-blue-thumb-600x600.jpg",
            "https://cdn.tgdd.vn/Products/Images/7264/293603/q-q-c01a-007py-nu-thumb-fix-600x600.jpg"]
    },
    {
        dateOrdered: "2024-12-24T13:43:59.341+00:00", 
        status: "delivering", 
        orderId: "676abd113ef808f1436523f5", 
        totalPrice: 50000000, 
        images: [
            "https://cdn.tgdd.vn/Products/Images/42/327343/xiaomi-poco-m6-black-thumb-600x600.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/320734/xiaomi-redmi-a3-xanh-l%C3%A1-thumb-600x600.jpg", 
            "https://cdn.tgdd.vn/Products/Images/42/328626/realme-c65s-blue-thumb-600x600.jpg",
            "https://cdn.tgdd.vn/Products/Images/7264/293603/q-q-c01a-007py-nu-thumb-fix-600x600.jpg"]
    },
    {
        dateOrdered: "2024-12-24T13:43:59.341+00:00", 
        status: "delivering", 
        orderId: "676abd113ef808f1436523f5", 
        totalPrice: 50000000, 
        images: [
            "https://cdn.tgdd.vn/Products/Images/42/327343/xiaomi-poco-m6-black-thumb-600x600.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/320734/xiaomi-redmi-a3-xanh-l%C3%A1-thumb-600x600.jpg", 
            "https://cdn.tgdd.vn/Products/Images/42/328626/realme-c65s-blue-thumb-600x600.jpg",
            "https://cdn.tgdd.vn/Products/Images/7264/293603/q-q-c01a-007py-nu-thumb-fix-600x600.jpg"]
    }]

    const userId = localStorage.getItem('ID');
    const [raw_infos, setRaw_infos] = useState([]);
    
    useEffect(() => {
        const getRawInfos = async () => {
            try {
                const response = await axios.get(`${url}/api/order/user/${userId}/all/`)
                return response.data.orders;
            } catch (error) {
                console.error(error);
                return undefined;
            }
        }

        const getCartItemInfo = async (orderDetailId) => {
            try {
                const response = await axios.get(`${url}/api/orderDetail/${orderDetailId}`)
                return response.data
                // return [response.data.product, response.data.quantity]
            } catch (error) {
                console.error(error);
                return undefined
            }
        }

        const getCartItemsInfo = async (orderDetailIds) => {
            try {
                const cartItems = await Promise.all(orderDetailIds.map(id => getCartItemInfo(id)));
                return cartItems;
            } catch (error) {
                console.error('Error fetching cart items info:', error);
                return [];
            }
        };

        getRawInfos()
        .then(infos => {setRaw_infos(infos)})
    }, [userId, raw_infos])

    const debug = () => {
        for (const raw_info of raw_infos) {
            console.log(raw_info);
        }
    }

    return (
        <div className='flex flex-col gap-3 items-center'>
            <PurchaseHistoryNavbar />
            <div className='flex flex-col gap-3 w-full items-center mb-5'>
                {tests.map((test, index) => {
                    return (<HistoryCard key={index} dateOrdered={test.dateOrdered} images={test.images} orderId={test.orderId} status={test.status} totalPrice={test.totalPrice}/>)
                })} 
            </div>
            <button onClick={debug} >Debug</button>
        </div>
    )
}

export default PurchaseHistory