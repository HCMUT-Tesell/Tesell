import { useEffect, useState } from "react";
import axios from "axios";

const useFetchProducts = (orderDetailIds, isAuthed) => {
  const [products, setProducts] = useState([]);
  const url = "http://localhost:8000";

  useEffect(() => {
    const fetchCartItems = async () => {
      const getCartItemInfo = async (orderDetailId) => {
        try {
          const response = await axios.get(`${url}/api/orderDetail/${orderDetailId}`);
          return response.data;
        } catch (error) {
          console.error(error);
          return null;
        }
      };

      const getCartItemsInfo = async (orderDetailIds) => {
        try {
          const cartItems = await Promise.all(orderDetailIds.map(getCartItemInfo));
          return cartItems;
        } catch (error) {
          console.error("Error fetching cart items info:", error);
          return [];
        }
      };

      const getProductInfo = async (productID) => {
        try {
          const response = await axios.get(`${url}/api/product/${productID}`);
          return response.data;
        } catch (error) {
          console.error(error);
        }
      };

      const getProductsInfo = async (cartItems) => {
        try {
          const ProductsInfo = await Promise.all(cartItems.map((cartItem) => getProductInfo(cartItem.product)));
          return ProductsInfo;
        } catch (error) {
          console.error("Error fetching cart items info:", error);
          return [];
        }
      };

      const zip = (productInfos, quantities) => {
        let res = [];
        for (let i = 0; i < productInfos.length; i += 1) {
          res.push([productInfos[i], quantities[i]]);
        }
        return res;
      };

      let quantities = [];
      const items = await getCartItemsInfo(orderDetailIds);

      items.forEach((item) => {
        quantities.push(item.quantity);
      });

      const productInfo = await getProductsInfo(items);
      const zippedProducts = zip(productInfo, quantities);

      setProducts(zippedProducts);
    };

    if (isAuthed) fetchCartItems();
  }, [orderDetailIds, isAuthed]);

  return products;
};

export default useFetchProducts;
