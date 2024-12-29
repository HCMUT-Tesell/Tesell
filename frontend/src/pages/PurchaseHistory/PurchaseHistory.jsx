import PurchaseHistoryNavbar from '../../components/PurchaseHistoryNavBar/PurchaseHistoryNavbar'
import HistoryCard from '../../components/HistoryCard/HistoryCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
const url = "http://localhost:8000";

function PurchaseHistory() {
    const userId = localStorage.getItem('ID');
    const [raw_infos, setRaw_infos] = useState([]);
    const [renderableObjs, setRenderableObjs] = useState([]);
    
    useEffect(() => {
        const fetchOrders = async () => {
            const getRawInfos = async () => {
                try {
                    const response = await axios.get(`${url}/api/order/user/${userId}/all/`)
                    // console.log(response.data.orders);
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
            
            const getProductInfo = async (productID) => {
                try {
                    const response = await axios.get(`${url}/api/product/${productID}`);
                    // console.log(response.data);
                    return response.data;
                } catch (error) {
                    console.error(error);
                }
            }

            const convertIntoUsefulObject = async (orderObject) => {
                try {
                    const productId_quantity_list = await Promise.all(orderObject.orderDetail.map(orderDetailId => getCartItemInfo(orderDetailId)));
                    // console.log(productId_quantity_list);
                    const products_info = await Promise.all(productId_quantity_list.map(productId_quantity => getProductInfo(productId_quantity.product)));
                    // const quantities = productId_quantity_list.map(productId_quantity => productId_quantity.quantity);
                    // console.log(products_info);
                    // console.log(quantities);
                    // products = list([<product_id>, <quantity>]);
                    const orderId = orderObject._id;
                    const dateOrdered = orderObject.dateOrdered;
                    const status = orderObject.status;
                    const images = products_info.map(product_info => product_info.imageUrl);
                    const totalPrice = orderObject.totalPrice;
                    return {
                        dateOrdered: dateOrdered,
                        status: status,
                        orderId: orderId,
                        totalPrice: totalPrice,
                        images: images
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            
            const getRenderableObject = async () => {
                let result = [];
                for (const raw_info of raw_infos) {
                    if (raw_info.status === "selecting") continue;
    
                    const temp = await convertIntoUsefulObject(raw_info);
                    console.log(temp);
                    result.push(temp);
                }
                return result;
            }

            const infos = await getRawInfos();
            console.log("infos", infos);
            if (raw_infos.length === 0) setRaw_infos(infos);

            const renderObjs = await getRenderableObject();
            console.log("h23", renderObjs)
            setRenderableObjs(renderObjs);
        }

        fetchOrders();
    }, [raw_infos])

    const debug = () => {
        for (const raw_info of raw_infos) {
            console.log("here", raw_info);
        }
        for (const renderableObj of renderableObjs) {
            console.log(renderableObj);
        }
    }

    return (
        <div className='flex flex-col gap-3 items-center'>
            <PurchaseHistoryNavbar />
            <div className='flex flex-col gap-3 w-full items-center mb-5'>
                {renderableObjs.map((renderableObj, index) => {
                    return (<HistoryCard key={index} dateOrdered={renderableObj.dateOrdered} images={renderableObj.images} orderId={renderableObj.orderId} status={renderableObj.status} totalPrice={renderableObj.totalPrice}/>)
                })} 
            </div>
            <button className='hidden' onClick={debug} >Debug</button>
        </div>
    )
}

export default PurchaseHistory