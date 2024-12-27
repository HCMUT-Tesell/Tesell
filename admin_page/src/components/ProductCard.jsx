import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';


const ProductCard = (prop) => {
  const { reloadProduct, setReloadProduct } = useContext(StoreContext)

  const formatCurrency = (number) => {
    return number.toLocaleString().replaceAll(",", ".");
  } // formatCurrency for admin
  const product = prop.product;
  
  const editProduct = () => {
    console.log('Edit product:', product);
    prop.signal(true)
    prop.target(product)
  }
  const deleteProduct = () => {
    console.log('Delete product:', product);
    try {
      confirm('Are you sure you want to delete this product?')
      axios.delete(`http://localhost:8000/api/product/${product._id}`)
      .then((response) => {
        console.log('Delete product successfully:', response.data);
        alert("Xóa sản phẩm thành công");
        setReloadProduct(!reloadProduct)
      })
    }
    catch (error) {
      console.error('Error when delete product:', error);
    }
  }
  
  return (
    <div className='flex flex-col justify-center items-center p-2.5 gap-4 relative w-[236px] h-[377px] bg-white shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] rounded-xl'>
      <img className='w-[200px] h-[174px] object-contain rounded-lg flex-none flex-grow-0' src={product.imageUrl ?? product.image} alt="" />
      <span className='overflow-hidden whitespace-nowrap text-ellipsis w-[188px] h-[32px] font-inter font-bold text-[20px] text-center leading-[32px] text-black flex-none flex-grow-0'>{product.productName}</span>
      <span className='w-[216px] h-[28px] font-inter font-semibold text-[20px] leading-[28px] text-[#1C1C28] text-center flex-none self-stretch flex-grow-0'>{formatCurrency(product.sellPrice)}</span>
      <div className='flex flex-row justify-center items-center p-0 gap-[129px] w-[208px] h-[36px] flex-none flex-grow-0'>
        <ModeEditOutlineIcon color='primary' onClick={editProduct} cursor='pointer' sx={{ fontSize: 28 }} />
        <DeleteOutlineIcon  color='primary' onClick={deleteProduct} cursor='pointer' sx={{ fontSize: 28 }} />
      </div>
    </div>
  )
}



export default ProductCard
