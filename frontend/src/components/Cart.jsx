import CartItem from './CartItem'
import products from '../assets/products'
import arrow_right from '../assets/icons/arrow_right.png'
import { formatCurrency } from './CartItem'
const Cart = () => {
  let totalPrice = 0
  products.map((product) => {
    totalPrice += product.sellPrice;
  })
  return (
    <div className='bg-[#E8F3FB]  md:w-[325px] md:rounded-[10px] overflow-hidden md:gap-[18px] shadow-cart'>
        <div className='md:pl-5 md:pt-5'>
            {products.map((product, index) => {
                return (
                        <CartItem key={index} productName={product.productName} sellPrice={product.sellPrice} image={product.image} />
                )
                
            })}
        </div>
        <div className='gap-2 pt-2 flex flex-col justify-center md:flex md:flex-col md:items-center md:gap-[13px] md:w-[305px] md:px-5 md:pb-5 text-black'>
            <span className='text-[10px] md:font-bold md:font-body md:text-[16px]'>Tổng cộng: <span className='text-[#FF0A0A]'>{formatCurrency(totalPrice)}</span></span>
            <div className='cursor-pointer flex rounded-xl items-center justify-center h-6 w-full md:flex md:w-[135px] md:h-[44px] md:rounded-xl md:gap-1.5 bg-[#93C8ED]'>
              <span className=' text-[10px] md:text-[14px] md:font-normal md:font-body md:h-[20px]'>Thanh toán</span>
              <div className='hidden md:block md:w-6 md:h-6'>
                <img src={arrow_right} className='md:w-4 md:h-3 md:mt-1.5 md:mx-auto' alt="" /> 
              </div>
            </div>
        </div>
    </div>
  )
}






export default Cart
