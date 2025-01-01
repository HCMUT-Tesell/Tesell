import OrderFilter from '../components/OrderFilter/OrderFilter'
import OrderCard from '../components/OrderCard/OrderCard'
import { useEffect, useState } from 'react';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';

function OrdersPage() {
  const [status, setStatus] = useState(["confirmed", "exported", "delivering", "delivered"]);
  const [criteria, setCritera] = useState(['date_desc']);
  // const [orders, setOrders] = useState([]);
  const [url, setUrl] = useState("");
  const [renderableOrders, setRenderableOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // const example_order = {
  //   user: "676ac1374f9e5d01d7818c2c",
  //   firstName: "Tran Anh",
  //   lastName: "Khoi",
  //   dateOrdered: "2024-12-29T02:42:28.681+00:00", 
  //   status: "confirmed", 
  //   orderId: "6770b9366e19c6281f94b762", 
  //   totalPrice: 36305000, 
  //   phone: "0123456789",
  //   shippingAddress: "KTX Khu A, Phường Linh Trung, TP.Thủ Đức, Hồ Chí Minh",
  //   images: ["https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-xam-1-750x500.jpg", "https://cdn.tgdd.vn/Products/Images/44/321436/acer-aspire-a315-44p-r9w8-r7-nxksjsv002-hinh-2-750x500.jpg", "https://cdn.tgdd.vn/Products/Images/44/312414/TimerThumb/asus-vivobook-15-x1504za-i3-nj102w-(2).png", "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/331207/samsung-galaxy-a16-xanh-1-638684923433246535-750x500.jpg", "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329149/iphone-16-pro-max-titan-sa-mac-2-638638962343879149-750x500.jpg"]
  // }

  useEffect(() => {
    console.log("status", status);
    console.log("criteria", criteria)
  }, [status, criteria])

  useEffect(() => {
    const generateAPI_URL = (status, criteria) => {
      let url = 'http://localhost:8000/api/order/getAllOrder?';
      if (status.length === 0) return `${url}status=confirmed&status=exported&status=delivering&status=delivered&sort=${criteria}`

      for (let i = 0; i < status.length; i += 1) {
        if (i === 0) 
          url = url + `status=${status[i]}`;
        else 
          url = url + `&status=${status[i]}`;
      }

      return url + `&sort=${criteria}`
    }
    setUrl(generateAPI_URL(status, criteria));
  }, [status, criteria])

  useEffect(() => {
    const fetchOrders = async (url) => {
      const response = await axios.get(url);
      console.log(response.data);
      return response.data;
    }

    const getCartItemInfo = async (orderDetailId) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/orderDetail/${orderDetailId}`)
        return response.data
        // return [response.data.product, response.data.quantity]
      } catch (error) {
        console.error(error);
        return undefined
      }
    }

    const getProductImgURL = async (productId) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/product/${productId}`);
        return response.data.imageUrl;
      } catch (error) {
        console.error(error)
      }
    }

    const getUsefulInfo = async () => {
      const response = await fetchOrders(url);
      const orders = response.orders;
      console.log("orders", orders);

      const responses = await Promise.all(orders.map(order => axios.get(`http://localhost:8000/api/user/${order.user}`)));
      const users = responses.map(response => response.data);
      console.log("users", users);

      let orderImgs = [];
      for (const order of orders) {
        const orderDetailIds = order.orderDetail;
        const response = await Promise.all(orderDetailIds.map(orderDetailId => getCartItemInfo(orderDetailId)));
        const imgUrls = await Promise.all(response.map(orderDetail => getProductImgURL(orderDetail.product)));
        // console.log("imgURLs", imgUrls);
        orderImgs.push(imgUrls);
      }

      console.log("orderImgs", orderImgs);
      let orderList = []
      for (let i = 0; i < orders.length; i += 1) {
        const renderableOrder = {
          user: orders[i].user,
          firstName: users[i].firstName,
          lastName: users[i].lastName,
          dateOrdered: orders[i].dateOrdered, 
          status: orders[i].status, 
          orderId: orders[i]._id, 
          totalPrice: orders[i].totalPrice, 
          phone: users[i].phone,
          shippingAddress: orders[i].shippingAddress,
          images: orderImgs[i]
        }
        orderList.push(renderableOrder);
      }
      console.log("renderable", orderList);
      setRenderableOrders(orderList);
    }
    setLoading(true);
    getUsefulInfo().then(() => {
      setLoading(false);
      console.log(loading);
    });
  }, [url])

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      {loading === true ?
      <div className='fixed top-0 h-screen w-screen z-20 flex items-center justify-center backdrop-blur'>
        <CircularProgress/>
      </div>
      : null}
      

      <OrderFilter status={status} setStatus={setStatus} criteria={criteria} setCritera={setCritera} />
      <div className='flex flex-col w-full items-center gap-3 justify-center'>
        {renderableOrders.map((order, index) => {
          return (
            <OrderCard
              key={index}
              dateOrdered={order.dateOrdered}
              status={order.status}
              orderId={order.orderId}
              totalPrice={order.totalPrice}
              images={order.images}
              user={order.user}
              firstName={order.firstName}
              lastName={order.lastName}
              shippingAddress={order.shippingAddress}
              phone={order.phone}
            />
          )
        })}
      </div>
    </div>
  )
}

export default OrdersPage