import { createContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetch('http://localhost:8000/api/product/getAllProduct?page=1&limit=100')
      .then(response => response.json())
      .then(data => setProducts(data.products))
  }, [])

  // console.log('products: ', products);


  const [cartItems, setCartItems] = useState({});

  const url = "http://localhost:8000";
  const [token, setToken] = useState("");
  
  const addToCart = (_id) => {
    if (!cartItems[_id]) {
      setCartItems((prev) => ({ ...prev, [_id]: 1 }));
    }
    else {
      setCartItems((prev) => ({ ...prev, [_id]: prev[_id] + 1 }));
    }
    // console.log('cartItems[_id]: ', cartItems[_id]);
  }

  const [orderDetailIds, setOrderDetailIds] = useState([]);

  const getUserOrder = async () => {
    const userId = localStorage.getItem("ID");
    if (userId) {
      try {
        const response = await axios.get(`${url}/api/order/user/${userId}`)
        // console.log("Order Detail", response.data.order);
        setOrderDetailIds(response.data.order.orderDetail)
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng người dùng:", error.message);
      }
    }
    else {
      console.log("Unauthed");
    }
  }

  useEffect(() => {
    getUserOrder();
  }, [token])

  const increaseQuantity = async (product_id) => {
    const user_id = localStorage.getItem('ID');
    const response = await axios.get(`${url}/api/order/user/${user_id}`)
    const orderDetailIds = response.data.order.orderDetail;
    let cartItemInfo = undefined;
    
    for (const orderDetailId of orderDetailIds) {
      const res = await axios.get(`${url}/api/orderDetail/${orderDetailId}`)
      cartItemInfo = res.data;
      if (cartItemInfo.product === product_id) {
        break;
      }
    }

    const response2 = await axios.put(`${url}/api/orderDetail/${cartItemInfo._id}`, {
      product: cartItemInfo.product,
      quantity: cartItemInfo.quantity + 1
    })

    await getUserOrder();

    if (response2.data.status) {
      alert("Cập nhật giỏ hàng thành công");
    }
  } 

  const decreaseQuantity = async (product_id) => {
    const user_id = localStorage.getItem('ID');
    const response = await axios.get(`${url}/api/order/user/${user_id}`)
    const orderID = response.data.order._id;
    const orderDetailIds = response.data.order.orderDetail;
    let cartItemInfo = undefined;
    
    for (const orderDetailId of orderDetailIds) {
      const res = await axios.get(`${url}/api/orderDetail/${orderDetailId}`)
      cartItemInfo = res.data;
      if (cartItemInfo.product === product_id) {
        break;
      }
    }

    if (cartItemInfo.quantity - 1 > 0) {
      const response2 = await axios.put(`${url}/api/orderDetail/${cartItemInfo._id}`, {
        product: cartItemInfo.product,
        quantity: cartItemInfo.quantity - 1
      })
      
      await getUserOrder();

      if (response2.data.status) {
        alert("Cập nhật giỏ hàng thành công");
      }
    }
    else {
      // update giỏ hàng
      // console.log('old list:', orderDetailIds)
      let newOrderDetailIds = [];
      orderDetailIds.forEach(orderDetailId => {
        if (orderDetailId !== cartItemInfo._id) {
          newOrderDetailIds.push(orderDetailId);
        }
      });
      // console.log("to delete:", cartItemInfo._id)
      // console.log('new list: ',newOrderDetailIds)
      // console.log('order id:', orderID)
      const response = await axios.put(`${url}/api/order/${orderID}`, {
        orderDetail: newOrderDetailIds
      })

      
      // xóa orderDetail đó ra khỏi db
      const response2 = await axios.delete(`${url}/api/orderDetail/${cartItemInfo._id}`)

      await getUserOrder();

      alert("Cập nhật giỏ hàng thành công");
    }
  } 

  const ThemVaoGioHang = async (product_id) => {
    // Authed customer
    const user_id = localStorage.getItem('ID')
    if (user_id) {
      // Tìm order của người dùng
      const response = await axios.get(`${url}/api/order/user/${user_id}`)
      console.log(response);
      const orderId = response.data.order._id;
      const orderDetailIds = response.data.order.orderDetail;
      let alreadyInCart = false;
      let cartItemInfo = undefined;
      for (const orderDetailId of orderDetailIds) {
        const res = await axios.get(`${url}/api/orderDetail/${orderDetailId}`)
        cartItemInfo = res.data;
        if (cartItemInfo.product === product_id) {
          alreadyInCart = true;
          break;
        }
      }
      
      if (!alreadyInCart) {
        const response = await axios.post(`${url}/api/orderDetail/create`, {
          quantity: 1,
          product: product_id
        })
        console.log("response", response)
        const newOrderDetailId = response.data.data._id;
        console.log('newOrderDetailId', newOrderDetailId);
        orderDetailIds.push(newOrderDetailId);
        console.log('orderDetailIds', orderDetailIds)

        const response2 = await axios.put(`${url}/api/order/${orderId}`, {
          orderDetail: orderDetailIds
        })
        
        await getUserOrder();

        if (response2.data.status) {
          alert("Cập nhật giỏ hàng thành công");
        }
      } else {
        // console.log('cartItemInfo', cartItemInfo)
        const response = await axios.put(`${url}/api/orderDetail/${cartItemInfo._id}`, {
          product: cartItemInfo.product,
          quantity: cartItemInfo.quantity + 1
        })

        await getUserOrder();

        if (response.data.status) {
          alert("Cập nhật giỏ hàng thành công");
        }
      }
    } else {
      alert("Người dùng cần đăng nhập để thực hiện chức năng này!")
    }
  }

  const removeFromCart = (_id) => {
    setCartItems((prev) => ({ ...prev, [_id]: prev[_id] - 1 }));
  }
  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  

  const contextValue = {
    products,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    url,
    token,
    setToken,
    orderDetailIds,
    ThemVaoGioHang,
    increaseQuantity,
    decreaseQuantity

  }
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}
export default StoreContextProvider;