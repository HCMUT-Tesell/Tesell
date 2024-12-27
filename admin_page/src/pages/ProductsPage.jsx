import '../css/ProductsPage.css'
import Catalog from '../components/Catalog'
import ProductList from '../components/ProductList';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';

const ProductsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('bestselling');
    const [addingProduct, setAddingProduct] = useState(false);
    const [file, setFile] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false);

    const toggleAddProduct = () => {
        if(addingProduct) setFile(null)
        setAddingProduct(prev => !prev);
        setPreviewVisible(false)
    }
    const closeAddProduct = () => {
        setAddingProduct(false);
        setFile(null);
        setPreviewVisible(false)    
    }
    

    
  
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
      }
    };
  
    const toggleImagePreview = () => {
        if(file && !previewVisible) {
            document.getElementById('imageLabel').classList.remove('bg-[#D9D9D9]');
        } else {
            document.getElementById('imageLabel').classList.add('bg-[#D9D9D9]');
        }
      setPreviewVisible((prevState) => !prevState);
      
    };
  
    // Create an image URL for the file preview
    const imagePreviewUrl = file ? URL.createObjectURL(file) : null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        data.image = ''
        if(data.rating > 5) {
            data.rating = 5
        } else if(data.rating < 0) {
            data.rating = 0
        }
        if(data.buyPrice < 0) {
            data.buyPrice = 0
        }
        if(data.sellPrice < 0) {
            data.sellPrice = 0
        }
        if(data.numberReviews < 0) {
            data.numberReviews = 0
        }
        if(data.storedProduct < 0) {
            data.storedProduct = 0
        }
        if(data.stockProductCount < 0) {
            data.stockProductCount = 0
        }
        if(Number(data.storedProduct) > Number(data.stockProductCount)) {
            alert('Số lượng trong kho không thể lớn hơn số lượng tại cửa hàng')
            return
        }

        
        closeAddProduct();
        {/* accessToken, authorization */}
        fetch('http://localhost:8000/api/product/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',



            },
            body: JSON.stringify(data),
        })
    }

  return (
    <div className='flex flex-col gap-10'>

        <div className='flex justify-between pt-5 gap-5'>
            <div className='pl-20'>
                <Catalog onCategoryChange={setSelectedCategory}/>
                <div className='fixed bottom-5 right-5'>
                    <ControlPointIcon onClick={toggleAddProduct} color='primary' cursor='pointer' sx={{ fontSize: 60 }}/>
                </div>
            </div>
            {addingProduct ? 
            <div className='relative box-border bg-[#E8F3FB] border border-[#127CC5] rounded-[20px] flex flex-col justify-between items-center mr-60 mb-5'>
                <span className='font-inter font-bold text-[24px] leading-[32px] text-black pt-3'>Thêm sản phẩm</span>
                <span className='absolute top-4 right-4 cursor-pointer' onClick={()  => closeAddProduct(false)}><CancelIcon /></span>
                <form action="post" onSubmit={handleSubmit} className='flex flex-row justify-center gap-3'>
                    <div className='flex flex-col gap-2 pb-8 pl-8'>
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="productName">Tên sản phẩm</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' type="text" required name='productName' id='productName'/>
                        
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="">Hình ảnh sản phẩm</label>
                            </div>
                            <div className='flex gap-6 items-start'>
                                <input
                                    className='hidden font-inter p-4 w-[200px] h-[120px] bg-[#D9D9D9] rounded-[20px]'
                                    type='file'
                                    name='image'
                                    id='image'
                                    accept='image/*'
                                    onChange={handleFileChange}
                                />

                                <label
                                    className='font-inter font-normal text-[20px] leading-6 text-center w-[160px] justify-center flex items-center h-[130px] bg-[#D9D9D9] rounded-[20px] underline cursor-pointer'
                                    htmlFor='image' id='imageLabel'
                                >
                                    
                                    {previewVisible && imagePreviewUrl ? (
                                    <img
                                        src={imagePreviewUrl}
                                        className='w-full h-full object-contain rounded-[20px] mt-2'
                                        alt='Image preview'
                                    />
                                    ) :  !file ? 'Chọn file' : file.name}
                                </label>

                                <input
                                    type='checkbox'
                                    name=''
                                    className='mt-2 size-4'
                                    id='previewToggle'
                                    onChange={toggleImagePreview}
                                />
                                <label htmlFor='previewToggle' className='font-inter font-bold text-[20px] leading-[32px] text-black'>
                                    Hiển thị sản phẩm
                                </label>
                            </div>
                        </div>
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="imageUrl">Đường dẫn sản phẩm</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' type="text" required name='imageUrl' id='imageUrl'/>
                        
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="">Phân loại</label>
                        <select
                            className='minimal font-inter p-2 px-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]'
                            name='category'
                            id='category'
                            required
                        >
                            <option value="">Chọn loại sản phẩm</option>
                            <option value="Phone">Điện thoại</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Accessory_Watch">Đồng hồ - Phụ kiện</option>
                            {/* <option value="Household_goods">Vật dụng tại gia</option> */}
                        </select>
                        
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="description">Mô tả</label>
                        <textarea className='font-inter p-4 w-[420px] h-[200px] bg-[#D9D9D9] rounded-[20px]' rows='5' required name='description' id='description'/>

                    </div>

                    <div className='flex flex-col gap-2 pb-4 pr-8'>
                     
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="buyPrice">Giá mua</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' type="number" required name='buyPrice' id='buyPrice'/>
                        
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="sellPrice">Giá bán</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' type="number" required name='sellPrice' id='sellPrice'/>
                        
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="storedProduct">Số lượng trong kho</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' type="number" required name='stockProductCount' id='stockProductCount'/>

                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black'htmlFor="stockProductCount">Số lượng tại cửa hàng</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' type="number" required name='storedProduct' id='storedProduct'/>

                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="rating">Đánh giá(sao)</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px] ' type="number" name='rating' id='rating'/>

                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black'htmlFor="brand">Thương hiệu</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' type="text" required name='brand' id='brand'/>
                        
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="numberReviews">Số lượng đánh giá</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' type="number" required name='numberReviews' id='numberReviews'/>
                        <button type='submit' className='flex gap-16 mt-4 ml-auto cursor-pointer w-[200px] h-[40px] bg-[#1488D8] shadow-[4px_4px_8px_rgba(0,_0,_0,_0.25)] rounded-[16px] justify-center items-center'>
                            <span className='font-inter font-bold text-[16px] leading-[24px] text-white'>Thêm</span>
                            <AddIcon />
                        </button>
                    </div>
                </form>
            </div>
            :
            <div className='flex flex-row justify-between items-center pr-30 mb-5'>
                <ProductList category={selectedCategory}/>
            </div>
            }  
        </div>
     
      
    </div>
  )
}

export default ProductsPage;
