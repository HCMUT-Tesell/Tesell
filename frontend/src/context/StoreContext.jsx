import { createContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm state loading

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/product/getAllProduct?page=1&limit=100');
      const apiProducts = response.data.products;
      setProducts(apiProducts);
      setLoading(false) // Giả lập thời gian tải dữ liệu
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      setLoading(false); // Dù có lỗi cũng dừng trạng thái loading
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

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
        // localStorage.setItem("currentOrderId", response.data.order._id);
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


  //Xác nhận thông tin giao hàng
  const confirmOrder = async (shippingData) => {
    const userId = localStorage.getItem("ID"); 
    if (!userId) {
      alert("Người dùng cần đăng nhập để xác nhận đơn hàng!");
      return;
    }
  
    try {
      // Lấy thông tin đơn hàng của người dùng
      const orderResponse = await axios.get(`${url}/api/order/user/${userId}`);
      const order = orderResponse.data.order;
      // console.log("Order hiện tại:", order);
      if (!order || order.status !== "selecting") {
        alert("Không có đơn hàng nào trong trạng thái selecting để xác nhận!");
        return;
      }
  
      const orderId = order._id;
      localStorage.setItem("currentOrderId", orderId);
  
      const updateResponse = await axios.put(`${url}/api/order/${orderId}`, {
      ...order,
      ...shippingData, // merge thông tin shipping
    });
      // console.log("Order sau cập nhật:", updateResponse.data.order);
  
      if (updateResponse.data.status) {
        alert("Cập nhật thông tin giao hàng thành công. Bạn hãy chọn phương thức vận chuyển và thanh toán!");
        await getUserOrder(); // Cập nhật lại danh sách đơn hàng của người dùng
      } else {
        alert("Cập nhật thông tin giao hàng thất bại, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin giao hàng:", error);
      alert("Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại!");
    }
    // console.log("Order confirmed!");
  };
  

  // Xác nhận đặt hàng: cập nhật totalPrice, status và check xem đã có shippingAddress chưa
  const updateOrderStatus = async (totalPrice) => {
    const userId = localStorage.getItem("ID");
    if (!userId) {
      alert("Người dùng cần đăng nhập để đặt hàng!");
      return false;
    }
  
    try {
      const orderResponse = await axios.get(`${url}/api/order/user/${userId}`);
      const order = orderResponse.data.order;
  
      if (!order || order.status !== "selecting") {
        alert("Không có đơn hàng nào đang được chọn để đặt hàng!");
        return false;
      }
      if (!order.shippingAddress || order.shippingAddress.trim() === "") {
        alert("Vui lòng xác nhận thông tin giao hàng trước khi đặt hàng!");
        return false;
      }
      const orderId = order._id;
      const updateResponse = await axios.put(`${url}/api/order/${orderId}`, {
        ...order,
        totalPrice,
        status: "confirmed",
        dateOrdered: Date.now() + 25200000
      });
  
      if (updateResponse.data.status) {
        alert("Đặt hàng thành công!");
        await getUserOrder();
        return true;
      } else {
        alert("Đặt hàng thất bại, vui lòng thử lại!");
        return false;
      }
    } catch (error) {
      console.error("Lỗi khi xác nhận đơn hàng:", error);
      alert("Đã xảy ra lỗi khi xác nhận đơn hàng. Vui lòng thử lại!");
      return false;
    }
  };
  

  const contextValue = {
    products,
    loading, // Cung cấp loading cho context
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
    decreaseQuantity,
    confirmOrder,
    updateOrderStatus
  }
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}
export default StoreContextProvider;