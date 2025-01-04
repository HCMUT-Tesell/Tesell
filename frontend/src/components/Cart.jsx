import CartItem from './CartItem'
// import products from '../assets/products'
import arrow_right from '../assets/icons/arrow_right.png'
import { formatCurrency } from './CartItem'
import  React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Cart = ({isAuthed, orderDetailIds, updateOrderFunction}) => {
  const url = "http://localhost:8000";

  let totalPrice = 0
  // const {cartItems, products, removeFromCart} = useContext(StoreContext);
  const {cartItems, removeFromCart} = useContext(StoreContext);

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const handlePayment = () => {
    if (totalPrice > 0) {
      navigate(`/payment`); // Chuyển đến trang thanh toán khi totalPrice > 0
    } else {
      alert("Bạn hãy thêm sản phẩm vào giỏ hàng để thực hiện thanh toán.");
    }
  };
  // input: orderDetail ID
  // output: product.image, product.name, product._id sellPrice={product.sellPrice}

  useEffect(() => {
    const fetchCartItems = async () => {
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

      const getProductInfo = async(productID) => {
        try {
          const response = await axios.get(`${url}/api/product/${productID}`);
          // console.log(response.data);
          return response.data;
        } catch (error) {
          console.error(error);
        }
      }

      const getProductsInfo = async(cartItems) => {
        try {
          const ProductsInfo = await Promise.all(cartItems.map(cartItem => getProductInfo(cartItem.product)));
          return ProductsInfo;
        } catch (error) {
          console.error('Error fetching cart items info:', error);
          return [];
        }
      }

      const zip = (productInfos, quantities) => {
        let res = [];
        for (let i = 0; i < productInfos.length; i += 1) {
          res.push([productInfos[i], quantities[i]]);
        }
        return res;
      }

      let quantities = [];

      const items = await getCartItemsInfo(orderDetailIds);
      // console.log("item", items);
      
      items.forEach(item => {
        quantities.push(item.quantity);
      })

      const productInfo = await getProductsInfo(items);
      // console.log("productInfo", productInfo);

      setProducts(zip(productInfo, quantities));
    };

    if (isAuthed) fetchCartItems();
  }, [orderDetailIds, isAuthed])

  if (isAuthed) {
    return (
      <div className='bg-[#E8F3FB]  md:w-[325px] md:rounded-[10px] overflow-scroll md:gap-[18px] shadow-cart max-h-[75vh]'>
          <div className='md:pl-5 md:pt-5'>
              {/* {products.map((product, index) => {
                if (cartItems[product._id]>0){
                  totalPrice += product.sellPrice*cartItems[product._id];
                  return (
                          <CartItem key={index} _id={product._id} productName={product.productName} sellPrice={product.sellPrice} image={product.imageUrl} />
  
                  )
                }
                  
              })} */}
            {products.map((product, index) => {
              // console.log('HERE,', product[0]);
              // totalPrice += product.sellPrice * cartItems[product._id];
              totalPrice += Number(product[0].sellPrice * product[1]);
              // console.log("total:", totalPrice);
              return (
                <CartItem key={index} _id={product[0]._id} productName={product[0].productName} sellPrice={product[0].sellPrice} image={product[0].imageUrl} quantity={product[1]}/>

              )
            })}
          </div>
          <div className='gap-2 pt-2 flex flex-col justify-center md:flex md:flex-col md:items-center md:gap-[13px] md:w-[305px] md:px-5 md:pb-5 text-black'>
              <span className='text-[10px] md:font-bold md:font-body md:text-[16px]'>Tổng cộng: <span className='text-[#FF0A0A]'>{formatCurrency(totalPrice)}</span></span>
              <div onClick={handlePayment} className='cursor-pointer flex rounded-xl items-center justify-center h-6 w-full md:flex md:w-[135px] md:h-[44px] md:rounded-xl md:gap-1.5 bg-[#93C8ED]'>
                <span className=' text-[10px] md:text-[14px] md:font-normal md:font-body md:h-[20px]'>Thanh toán </span>
                <div className='hidden md:block md:w-6 md:h-6'>
                  <img src={arrow_right} className='md:w-4 md:h-3 md:mt-1.5 md:mx-auto' alt="" /> 
                </div>
                
              </div>
          </div>
      </div>
    )
  }
  else {
    return (
      <div className='bg-[#E8F3FB]  md:w-[325px] md:rounded-[10px] overflow-hidden md:gap-[18px] shadow-cart'>
        <p className='text-center'>Bạn cần đăng nhập để sử dụng giỏ hàng</p>
      </div>
    )
  }
}






export default Cart