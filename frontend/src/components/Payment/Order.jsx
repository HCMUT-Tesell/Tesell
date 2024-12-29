// const OrderSummary = () => {
//   return (
//     <div className="bg-blue-50 p-6 rounded-lg shadow-md">
//       <h2 className="text-lg font-bold mb-2">Đơn hàng</h2>
//       <div className="h-px bg-gray-300 my-2"></div>
//       <div className="space-y-4">
//         {/* Sản phẩm 1 */}
//         <div className="flex items-center space-x-4">
//           <img
//             src="https://via.placeholder.com/60"
//             alt="Google Pixel 9 Pro"
//             className="w-16 h-16 rounded-lg"
//           />
//           <div>
//             <p>Google Pixel 9 Pro</p>
//             <p>Số lượng: 01</p>
//             <p>Đơn giá: 34.000.000</p>
//           </div>
//         </div>

//         {/* Sản phẩm 2 */}
//         <div className="flex items-center space-x-4">
//           <img
//             src="https://via.placeholder.com/60"
//             alt="Huawei P70 Pura"
//             className="w-16 h-16 rounded-lg"
//           />
//           <div>
//             <p>Huawei P70 Pura</p>
//             <p>Số lượng: 02</p>
//             <p>Đơn giá: 25.000.000</p>
//           </div>
//         </div>

//         {/* Sản phẩm 3 */}
//         <div className="flex items-center space-x-4">
//           <img
//             src="https://via.placeholder.com/60"
//             alt="Apple iPhone 16"
//             className="w-16 h-16 rounded-lg"
//           />
//           <div>
//             <p>Apple iPhone 16</p>
//             <p>Số lượng: 01</p>
//             <p>Đơn giá: 22.000.000</p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-4">
//         <div className="flex justify-between">
//           <p>Tạm tính:</p>
//           <p>100.000.000</p>
//         </div>
//         <div className="flex justify-between">
//           <p>Vận chuyển:</p>
//           <p>50.000</p>
//         </div>
//         <div className="flex justify-between font-bold">
//           <p>Tổng cộng:</p>
//           <p>100.050.000</p>
//         </div>
//       </div>

//       <div className="flex justify-between mt-4">
//         <button className="text-blue-600">Quay về giỏ hàng</button>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Đặt hàng</button>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;


import React, { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "../CartItem";

const OrderSummary = ({ orderDetailIds }) => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const url = "http://localhost:8000";

  // Fetch order detail by ID
  const fetchOrderDetail = async (id) => {
    try {
      const response = await axios.get(`${url}/api/orderDetail/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order detail with ID ${id}:`, error);
      return null;
    }
  };

  // Fetch product info by product ID
  const fetchProductInfo = async (productId) => {
    try {
      const response = await axios.get(`${url}/api/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product info with ID ${productId}:`, error);
      return null;
    }
  };

  // Fetch all details and combine order and product info
  const fetchAllDetails = async () => {
    try {
      // Fetch order details
      const details = await Promise.all(
        orderDetailIds.map(async (id) => await fetchOrderDetail(id))
      );

      // Fetch product info based on order details
      const productPromises = details.map((detail) =>
        detail && detail.product ? fetchProductInfo(detail.product) : null
      );
      const productInfos = await Promise.all(productPromises);

      // Combine product info with order detail quantities
      const combinedData = productInfos
        .map((product, index) => {
          const detail = details[index];
          if (product && detail) {
            return {
              ...product,
              quantity: detail.quantity,
            };
          }
          return null;
        })
        .filter((item) => item !== null);

      setProducts(combinedData);

      // Calculate total price
      const total = combinedData.reduce(
        (sum, item) => sum + item.sellPrice * item.quantity,
        0
      );
      setTotalPrice(total);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    if (orderDetailIds && orderDetailIds.length > 0) {
      fetchAllDetails();
    } else {
      console.warn("No orderDetailIds provided");
    }
  }, [orderDetailIds]);

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Đơn hàng</h2>
      <div className="h-px bg-gray-300 my-2"></div>
      <div className="space-y-4">
        {products.map((product, index) => {
            return (
                <CartItem key={index} _id={product[0]._id} productName={product[0].productName} sellPrice={product[0].sellPrice} image={product[0].imageUrl} quantity={product[1]}/>

              )
        })}
      </div>

      <div className="mt-4">
        <div className="flex justify-between">
          <p>Tạm tính:</p>
          <p>{totalPrice.toLocaleString()} VNĐ</p>
        </div>
        <div className="flex justify-between">
          <p>Vận chuyển:</p>
          <p>50,000 VNĐ</p>
        </div>
        <div className="flex justify-between font-bold">
          <p>Tổng cộng:</p>
          <p>{(totalPrice + 50000).toLocaleString()} VNĐ</p>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button className="text-blue-600">Quay về giỏ hàng</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Đặt hàng</button>
      </div>
    </div>
  );
};

export default OrderSummary;
