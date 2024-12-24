import './ProductDetail.css'
import { useParams } from 'react-router-dom'
import { formatCurrency } from '../../components/CartItem'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import ProductCard from '../../components/Item/ProductCard'
import { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import CartItem from './../../components/CartItem';
import products from './../../assets/products';

const ProductDetail = () => {
  const { productId } = useParams()
  const { products, addToCart, removeFromCart, cartItems } = useContext(StoreContext)
  console.log('products', products);
  const product = products.find((pr) => pr._id === (productId))
  console.log('product', product);
  
  const others = products.slice(-4);
  const date = new Date();
  date.setDate(date.getDate() + 2); 
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

  return (
    <div className='flex p-5 gap-5 items-start'>
        <div className='w-1/3 flex flex-col justify-center items-center px-5 py-4 gap-5 bg-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-lg'>
          <div className='drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'>
            <img className='w-[200px] rounded-[10px]' src={product.imageUrl ? product.imageUrl : product.image} alt="" />
          </div>

          <div className='flex gap-2'>
            <img className='w-[70px] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]' src={product.imageUrl ? product.imageUrl : product.image} alt="" />
            <img className='w-[70px] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]' src={product.imageUrl ? product.imageUrl : product.image} alt="" />
            <img className='w-[70px] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]' src={product.imageUrl ? product.imageUrl : product.image} alt="" />
            <img className='w-[70px] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]' src={product.imageUrl ? product.imageUrl : product.image} alt="" />
          </div>
          <div className='w-full'>
            <span className='flex font-bold text-[20px] leading-[28px] text-[#1C1C28]'>Đặc điểm nổi bật </span>
          </div>
          <ul className='list-disc list-inside'>
            <li className='pl-2 font-normal text-[16px] leading-[19px] text-black'>{product.description}</li>
          </ul>
          
        </div>
        <div className='flex flex-col w-full gap-5'>
          <div className="flex w-full gap-5">
          <div className='flex flex-col items-start p-[10px_20px] gap-[28px] bg-[#E8F3FB] shadow-[0px_0px_10px_rgba(0,0,0,0.25)] rounded-[10px] w-3/4'>
                  <span className='font-inter font-bold text-[24px] leading-[32px] text-black flex-none order-0 grow-0'>
                    {product.productName}
                  </span>
                  <span className='font-inter font-bold text-[24px] leading-[32px] text-red-500 flex-none order-1 self-stretch grow-0'>
                    {formatCurrency(product.sellPrice)}
                  </span>
              </div>
              <div className='flex flex-wrap justify-center items-center content-center p-2 gap-3 bg-[#E8F3FB] shadow-[0px_0px_10px_rgba(0,0,0,0.25)] rounded-[10px] w-1/4'>
                {cartItems[product._id] ? (<div className='gap-6 flex items-center justify-center'>
                  <span className='font-montserrat font-normal text-[14px] leading-[17px] text-black flex-none order-0 grow-0'>Số lượng:</span>
                  <div className='bg-none md:bg-[#93C8ED] flex h-3 rounded-xl items-center justify-center md:h-[40px] md:rounded-3xl  md:items-center md:gap-[8px] p-3'>
                      <div className='size-5 md:size-6 md:items-center cursor-pointer' onClick={() => removeFromCart(product._id)}>
                        <RemoveCircleRoundedIcon />
                      </div>
                      <span className='items-center justify-center flex py-1 w-4 text-[8px] md:p-0 md:text-[18px] md:w-[56px] text-black'>{cartItems[product._id]}</span>
                      <div className='size-4 md:size-6 cursor-pointer' onClick={() => addToCart(product._id)}
                      >
                        <AddCircleRoundedIcon />                      
                      </div>
                    </div>
                </div>):(
                <div className="w-[200px] h-[40px] mt-2 bg-blue-500 text-white rounded-md flex items-center justify-center cursor-pointer" onClick={() => addToCart(product._id)
                }>
                  <AddShoppingCartIcon />
                  <span className="ml-2">Thêm vào giỏ hàng</span>
                </div>)}
              </div>
          </div>
          <div className="gap-3 flex flex-col justify-center items-center p-4 isolation-isolate  bg-[#E8F3FB] shadow-[0px_0px_10px_rgba(0,0,0,0.25)] rounded-[10px]">
            <span className='flex w-full font-inter font-bold text-[24px] leading-[32px] text-black flex-none order-0 grow-0 z-0'>Thông tin vận chuyển</span>
            <input className='font-inter font-normal text-[20px] leading-[42px] text-black px-3 w-full box-border bg-white border border-black rounded-[5px] flex-none order-1 grow-0 z-10' placeholder='Giao đến: 89 Lê Thánh Tôn, Bến Nghé, Quận 1, TP. HCM'/>            
            <span className='font-inter font-normal text-[20px] leading-[42px] text-black px-3 w-full box-border bg-white border border-black rounded-[5px] flex-none order-1 grow-0 z-10'>Ngày dự kiến giao: {formattedDate}</span>            
            <span className='font-inter font-normal text-[20px] leading-[42px] text-black px-3 w-full box-border bg-white border border-black rounded-[5px] flex-none order-1 grow-0 z-10'>Phí vận chuyển (tạm tính): 50.000 đ</span>            
          </div>
          <div className="gap-4 flex flex-col justify-center items-center px-5 py-3 isolation-isolate  bg-[#E8F3FB] shadow-[0px_0px_10px_rgba(0,0,0,0.25)] rounded-[10px]">
            <span className='flex w-full font-inter font-bold text-[24px] leading-[32px] text-black flex-none order-0 grow-0 z-0'>Thông tin sản phẩm</span>
            <div className='w-full flex flex-col'>
              <div className='flex border-t-[1px] border-black p-3'>
                <span className="w-1/5 font-inter font-normal text-[24px] leading-[29px] text-center text-black">Display</span>
                <span className="w-4/5 font-inter font-normal text-[24px] leading-[29px] text-center text-black">Foldable LTPO OLED, 120Hz, HDR10+, 1600 nits</span>
              </div>
              <div className='flex border-t-[1px] border-black p-3'>
                <span className="w-1/5 font-inter font-normal text-[24px] leading-[29px] text-center text-black">Software</span>
                <span className="w-4/5 font-inter font-normal text-[24px] leading-[29px] text-center text-black">Android 14, upgradable to Android 15</span>
              </div>
              <div className='flex border-t-[1px] border-black p-3'>
                <span className="w-1/5 font-inter font-normal text-[24px] leading-[29px] text-center text-black">Main Camera</span>
                <span className="w-4/5 font-inter font-normal text-[24px] leading-[29px] text-center text-black">48 MP, f/1.7, 25mm | 10.8 MP, f/3.1, 112mm | 10.5 MP, f/2.2, 127</span>
              </div>
              <div className='flex border-t-[1px] border-black p-3'>
                <span className="w-1/5 font-inter font-normal text-[24px] leading-[29px] text-center text-black">Battery</span>
                <span className="w-4/5 font-inter font-normal text-[24px] leading-[29px] text-center text-black">4650 mAh, non-removable | 21W wired | 7.5W wireless</span>
              </div>
            </div>
          </div>
          <div className="gap-4 flex flex-col justify-center items-center px-5 py-3 isolation-isolate  bg-[#E8F3FB] shadow-[0px_0px_10px_rgba(0,0,0,0.25)] rounded-[10px]">
            <span className='pt-8 flex w-full font-inter font-bold text-[24px] leading-[32px] text-black flex-none order-0 grow-0 z-0'>Sản phẩm khác</span>
            <div className='grid grid-cols-3 gap-x-[60px] gap-y-5'>
              {others.map((item, ) => { 
                const newItem = {...item, id: item._id};
                 return (<ProductCard  {...newItem} key={item._id} />)
                })}
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProductDetail