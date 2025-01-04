/* eslint-disable react/prop-types */
import Divider from '@mui/material/Divider';
import OrderProductCard from '../OrderProductCard/OrderProductCard';
import { useEffect, useState } from 'react';
import axios from 'axios';


function OrderDetailInfo({order}) {
    const getYear = (ISO_Date) => {
        if (!ISO_Date) return "";
        return ISO_Date.substr(0, 4);
    }

    const getMonth = (ISO_Date) => {
        if (!ISO_Date) return "";
        return ISO_Date.substr(5, 2);
    }

    const getDay = (ISO_Date) => {
        if (!ISO_Date) return "";
        return ISO_Date.substr(8, 2);
    }

    const getTime = (ISO_Date) => {
        if (!ISO_Date) return "";
        return ISO_Date.substr(11, 5);
    }

    const formatCurrency = (number) => {
        if (!number) return "";
        if (number === 0) return "0";
        return number.toLocaleString().replaceAll(",", ".");
    }

    const [products, setProducts] = useState([]);
    const [currentTotalPrice, setCurrentTotalPrice] = useState(0);

    useEffect(() => {
        const fetchProduct = async (productId) => {
            try {
                const response = await axios.get(`http://localhost:8000/api/product/${productId}`);
                // console.log(response.data);
                return response.data;
            } catch (error) {
                console.error(error)
            }
        }

        const getUsefulInfo = async (orderDetails) => {
            const products = await Promise.all(orderDetails.map(orderDetail => fetchProduct(orderDetail.product)));
            // console.log("products", products);
            const quantities = orderDetails.map(orderDetail => orderDetail.quantity);
            // console.log("quantity", quantities);

            let result = [];
            for (let i = 0; i < products.length; i += 1) {
                const obj = {
                    imageUrl: products[i].imageUrl,
                    productName: products[i].productName,
                    quantity: quantities[i],
                    sellingPrice: products[i].sellPrice
                }
                result.push(obj);
            }

            return result;
        }

        getUsefulInfo(order.orderDetail).then((result) => {
            setProducts(result);
            for (let i = 0; i < result.length; i += 1) {
                const nextPrice = currentTotalPrice + (result[i].quantity * result[i].sellingPrice);
                setCurrentTotalPrice(nextPrice);
            }
        });
    }, [order])

    return (
        <div className='flex flex-col flex-grow w-2/3 h-fit  border rounded-lg border-[#93C8ED] p-4 gap-2'>
            <div className="flex flex-row justify-between">
                <p className="font-bold">Đơn hàng</p>
                <div className="flex flex-row gap-2">
                    <p className="font-bold">Ngày đặt hàng:</p>
                    <p>{`${getYear(order.dateOrdered)}/${getMonth(order.dateOrdered)}/${getDay(order.dateOrdered)} - ${getTime(order.dateOrdered)}`}</p>
                </div>
            </div>
            <Divider></Divider>

            <div className='flex flex-col h-[453px] gap-3 overflow-scroll'>
                {products.map((product, index) => (<OrderProductCard key={index} imageUrl={product.imageUrl} productName={product.productName} quantity={product.quantity} sellingPrice={product.sellingPrice}/>)) }
            </div>

            <Divider></Divider>

            <div className='flex flex-row justify-between'>
                <p>Tổng giá trị</p>
                <p className='text-lg font-bold text-[#127CC5]'>{formatCurrency(currentTotalPrice)}</p>
            </div>
            <div className='flex flex-row justify-between'>
                <p>Phí vận chuyển, phụ phí</p>
                <p className='text-lg font-bold text-[#127CC5]'>{formatCurrency(order.totalPrice - currentTotalPrice)}</p>
            </div>

            <Divider></Divider>

            <div className='flex flex-row justify-between'>
                <p>Tổng giá trị đơn hàng</p>
                <p className='text-xl font-bold text-[#127CC5]'>{formatCurrency(order.totalPrice)}</p>
            </div>

        </div>
    )
}

export default OrderDetailInfo