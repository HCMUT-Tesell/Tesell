import '../css/ProductsPage.css'
import Catalog from '../components/Catalog'
import ProductList from '../components/ProductList';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useState, useContext } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { StoreContext } from '../context/StoreContext';


const ProductsPage = () => {
    const { reloadProduct, setReloadProduct } = useContext(StoreContext)
    const [selectedCategory, setSelectedCategory] = useState('bestselling');
    const [addingProduct, setAddingProduct] = useState(false);
    const [editingProduct, setEditingProduct] = useState(false);
    const [file, setFile] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [targetProduct, setTargetProduct] = useState(null);

    const toggleAddProduct = () => {
        if(addingProduct) setFile(null)
        setAddingProduct(prev => !prev);
        setPreviewVisible(false);
    }
    const closeAddProduct = () => {
        setAddingProduct(false);
        setFile(null);
        setPreviewVisible(false)
    }

    const closeEditProduct = () => {
        setEditingProduct(false);
        setTargetProduct(null);
        setPreviewVisible(false);
    }

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
      }
    };
  
    const toggleAddImagePreview = () => {
        if(file && !previewVisible) {
            document.getElementById('imageLabelAdd').classList.remove('bg-[#D9D9D9]');
        } else {
            document.getElementById('imageLabelAdd').classList.add('bg-[#D9D9D9]');
        }
        setPreviewVisible((prevState) => !prevState);
    };

    const toggleEditImagePreview = () => {
        if(file && !previewVisible) {
            document.getElementById('imageLabelEdit').classList.remove('bg-[#D9D9D9]');
        } else {
            document.getElementById('imageLabelEdit').classList.add('bg-[#D9D9D9]');
        }
        setPreviewVisible((prevState) => !prevState);
    };
  
    // Create an image URL for the file preview
    const imagePreviewUrl = file ? URL.createObjectURL(file) : null;
    const checkValidData = (data) => {
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
            return false
        }
        return true
    }
    const handleAddSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        data.image = ''
        checkValidData(data)
        
        const newProduct = {
            productName: data.productNameAdd,
            description: data.descriptionAdd,
            image: data.image,
            imageUrl: data.imageUrlAdd,
            buyPrice: data.buyPriceAdd,
            sellPrice: data.sellPriceAdd,
            category: data.categoryAdd,
            stockProductCount: data.stockProductCountAdd,
            storedProduct: data.storedProductAdd,
            rating: data.ratingAdd,
            numberReviews: data.numberReviewsAdd,
            isFeature: true,
            brand: data.brandAdd
        };
        
        {/* accessToken, authorization */}
        fetch('http://localhost:8000/api/product/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert("Thêm sản phẩm thành công");
            setReloadProduct(!reloadProduct);
        })
        closeAddProduct();
        console.log(addingProduct, editingProduct);
        
    }

    
    
    const handleEditSubmit = (e) => {
        
    
        // Hàm xử lý thay đổi giá trị input
        
    
        // const handleFileChange = (e) => {
        //     // Xử lý thay đổi file nếu cần
        // };

            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            data._id = targetProduct._id
            console.log('data:', data);
            data.imageEdit = ''
            
            data.brand = data.brandEdit
            data.buyPrice = data.buyPriceEdit
            data.category = data.categoryEdit
            data.description = data.descriptionEdit
            data.imageUrl = data.imageUrlEdit
            data.numberReviews = data.numberReviewsEdit
            data.rating = data.ratingEdit
            data.sellPrice = data.sellPriceEdit
            data.stockProductCount = data.stockProductCountEdit
            data.storedProduct = data.storedProductEdit
            data.productName = data.productNameEdit
            
            if(!checkValidData(data)) return;
            
            
            
            {/* accessToken, authorization */}
            fetch(`http://localhost:8000/api/product/${data._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            closeEditProduct();
            alert('Sản phẩm đã được cập nhật thành công!');
            setReloadProduct(!reloadProduct);
    }

  return (
    <div className='flex flex-col gap-10'>

        <div className='flex flex-col lg:flex-row justify-between pt-5 gap-5'>

            { /* Catalog and add button */}

            <div className='pl-8 xl:pl-20'>
                <Catalog onCategoryChange={setSelectedCategory}/>
                {!editingProduct && (<div className='fixed top-60 right-0 sm:top-28 sm:right-10 lg:bottom-5 lg:right-5 lg:top-auto'>
                    <ControlPointIcon onClick={toggleAddProduct} color='primary' cursor='pointer' sx={{ fontSize: 60 }}/>
                </div>)}
            </div>

            { /* add form */}
            {
            addingProduct ? 
            <div className='relative box-border bg-[#E8F3FB] border border-[#127CC5] rounded-[20px] flex flex-col justify-between items-center mx-4 w-[540px] lg:w-[900px] xl:mx-0 xl:mr-60 mb-5'>
                <span className='font-inter font-bold text-[24px] leading-[32px] text-black pt-3'>Thêm sản phẩm</span>
                <span className='absolute top-4 right-4 cursor-pointer' onClick={()  => closeAddProduct(false)}><CancelIcon /></span>
                <form action="post" onSubmit={handleAddSubmit} className='flex lg:flex-row flex-col justify-center gap-3'>
                    <div className='flex flex-col gap-2 pb-8 pl-0 lg:pl-8'>
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="productNameAdd">Tên sản phẩm</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' type="text" required name='productNameAdd' id='productNameAdd'/>
                        
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="">Hình ảnh sản phẩm</label>
                            </div>
                            <div className='flex gap-6 items-start'>
                                <input
                                    className='hidden font-inter p-4 w-[200px] h-[120px] bg-[#D9D9D9] rounded-[20px]'
                                    type='file'
                                    name='imageAdd'
                                    id='imageAdd'
                                    accept='image/*'
                                    onChange={handleFileChange}
                                />

                                <label
                                    className='font-inter font-normal text-[20px] leading-6 text-center w-[160px] justify-center flex items-center h-[130px] bg-[#D9D9D9] rounded-[20px] underline cursor-pointer'
                                    htmlFor='imageAdd' id='imageLabelAdd'
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
                                    id='previewToggleAdd'
                                    onChange={toggleAddImagePreview}
                                />
                                <label htmlFor='previewToggleAdd' className='font-inter font-bold text-[20px] leading-[32px] text-black'>
                                    Hiển thị sản phẩm
                                </label>
                            </div>
                        </div>
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="imageUrlAdd">Đường dẫn sản phẩm</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' type="text" required name='imageUrlAdd' id='imageUrlAdd'/>
                        
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="">Phân loại</label>
                        <select
                            className='minimal font-inter p-2 px-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]'
                            name='categoryAdd'
                            id='categoryAdd'
                            required
                        >
                            <option value="">Chọn loại sản phẩm</option>
                            <option value="Phone">Điện thoại</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Accessory_Watch">Đồng hồ - Phụ kiện</option>
                            {/* <option value="Household_goods">Vật dụng tại gia</option> */}
                        </select>
                        
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="descriptionAdd">Mô tả</label>
                        <textarea className='font-inter p-4 w-[420px] h-[200px] bg-[#D9D9D9] rounded-[20px]' rows='5' required name='descriptionAdd' id='descriptionAdd'/>

                    </div>

                    <div className='flex flex-col gap-2 pb-4 pr-8'>
                    
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="buyPriceAdd">Giá mua</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' type="number" required name='buyPriceAdd' id='buyPriceAdd'/>
                        
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="sellPriceAdd">Giá bán</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' type="number" required name='sellPriceAdd' id='sellPriceAdd'/>
                        
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="stockProductCountAdd">Số lượng trong kho</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' type="number" required name='stockProductCountAdd' id='stockProductCountAdd'/>

                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black'htmlFor="storedProductAdd">Số lượng tại cửa hàng</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' type="number" required name='storedProductAdd' id='storedProductAdd'/>

                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="ratingAdd">Đánh giá(sao)</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px] ' type="number" name='ratingAdd' id='ratingAdd'/>

                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black'htmlFor="brandAdd">Thương hiệu</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' type="text" required name='brandAdd' id='brandAdd'/>
                        
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="numberReviewsAdd">Số lượng đánh giá</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' type="number" required name='numberReviewsAdd' id='numberReviewsAdd'/>
                        <button type='submit' className='flex gap-16 mt-4 ml-auto cursor-pointer w-[200px] h-[40px] bg-[#1488D8] shadow-[4px_4px_8px_rgba(0,_0,_0,_0.25)] rounded-[16px] justify-center items-center'>
                            <span className='font-inter font-bold text-[16px] leading-[24px] text-white'>Thêm</span>
                            <AddIcon />
                        </button>
                    </div>
                </form> 
            { /* edit form below */}
            </div>  
            : editingProduct ? 
            <div className='relative box-border bg-[#E8F3FB] border border-[#127CC5] rounded-[20px] flex flex-col justify-between items-center w-[540px] mx-4 lg:w-[900px] xl:mx-0 xl:mr-60 mb-5'>
                <span className='font-inter font-bold text-[24px] leading-[32px] text-black pt-3'>Chỉnh sửa thông tin sản phẩm</span>
                <span className='absolute top-4 right-4 cursor-pointer' onClick={()  => closeEditProduct(false)}><CancelIcon /></span>
                <form action="put" onSubmit={handleEditSubmit} className='flex lg:flex-row flex-col justify-center gap-3'>
                    <div className='flex flex-col gap-2 pb-8 pl-0 lg:pl-8'>
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="productNameEdit">Tên sản phẩm</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' defaultValue={targetProduct.productName}  type="text" required name='productNameEdit' id='productNameEdit'/>
                        
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="">Hình ảnh sản phẩm</label>
                            </div>
                            <div className='flex gap-6 items-start'>
                                <input
                                    className='hidden font-inter p-4 w-[200px] h-[120px] bg-[#D9D9D9] rounded-[20px]'
                                    type='file'
                                    name='imageEdit'
                                    id='imageEdit'
                                    accept='image/*'
                                    onChange={handleFileChange}
                                />

                                <label
                                    className='font-inter font-normal text-[20px] leading-6 text-center w-[160px] justify-center flex items-center h-[130px] bg-[#D9D9D9] rounded-[20px] underline cursor-pointer'
                                    htmlFor='imageEdit' id='imageLabelEdit'
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
                                    id='previewToggleEdit'
                                    onChange={toggleEditImagePreview}
                                />
                                <label htmlFor='previewToggleEdit' className='font-inter font-bold text-[20px] leading-[32px] text-black'>
                                    Hiển thị sản phẩm
                                </label>
                            </div>
                        </div>
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="imageUrlEdit">Đường dẫn sản phẩm</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' defaultValue={targetProduct.imageUrl}  type="text" required name='imageUrlEdit' id='imageUrlEdit'/>
                        
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="">Phân loại</label>
                        <select
                            className='minimal font-inter p-2 px-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]'
                            defaultValue={targetProduct.category} 
                            
                            name='categoryEdit'
                            id='categoryEdit'
                            required
                        >
                            <option value="">Chọn loại sản phẩm</option>
                            <option value="Phone">Điện thoại</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Accessory_Watch">Đồng hồ - Phụ kiện</option>
                            {/* <option value="Household_goods">Vật dụng tại gia</option> */}
                        </select>
                        
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="descriptionEdit">Mô tả</label>
                        <textarea className='font-inter p-4 w-[420px] h-[200px] bg-[#D9D9D9] rounded-[20px]' defaultValue={targetProduct.description}  rows='5' required name='descriptionEdit' id='descriptionEdit'/>

                    </div>

                    <div className='flex flex-col gap-2 pb-4 pr-8'>
                    
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="buyPriceEdit">Giá mua</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' defaultValue={targetProduct.buyPrice}  type="number" required name='buyPriceEdit' id='buyPriceEdit'/>
                        
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="sellPriceEdit">Giá bán</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' defaultValue={targetProduct.sellPrice}  type="number" required name='sellPriceEdit' id='sellPriceEdit'/>
                        
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="stockProductCountEdit">Số lượng trong kho</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' defaultValue={targetProduct.stockProductCount}  type="number" required name='stockProductCountEdit' id='stockProductCountEdit'/>

                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="storedProductEdit">Số lượng tại cửa hàng</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' defaultValue={targetProduct.stockProductCount}  type="number" required name='storedProductEdit' id='storedProductEdit'/>

                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="ratingEdit">Đánh giá(sao)</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' defaultValue={targetProduct.rating}  type="number" name='ratingEdit' id='ratingEdit'/>

                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black'htmlFor="brandEdit">Thương hiệu</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' defaultValue={targetProduct.brand}  type="text" required name='brandEdit' id='brandEdit'/>
                        
                        <label className='font-inter font-bold text-[20px] leading-[32px] text-black' htmlFor="numberReviewsEdit">Số lượng đánh giá</label>
                        <input className='font-inter p-4 w-[420px] h-[40px] bg-[#D9D9D9] rounded-[20px]' defaultValue={targetProduct.numberReviews}  type="number" required name='numberReviewsEdit' id='numberReviewsEdit'/>
                        <button type='submit' className='flex gap-16 mt-4 ml-auto cursor-pointer w-[200px] h-[40px] bg-[#1488D8] shadow-[4px_4px_8px_rgba(0,_0,_0,_0.25)] rounded-[16px] justify-center items-center'>
                            <span className='font-inter font-bold text-[16px] leading-[24px] text-white'>Cập nhật</span>
                            <AddIcon />
                        </button>
                    </div>
                </form> { /* product list below */}
            </div> 
            :
            <div className='flex flex-row justify-between items-center pr-30 mb-5'>
                <ProductList category={selectedCategory} signal={setEditingProduct} target={setTargetProduct} reload={reloadProduct}/>
            </div>
            }  
        </div>
     
      
    </div>
  )
}

export default ProductsPage;
