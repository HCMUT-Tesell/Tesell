import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';

const ProductList = () => {

 const {products} = useContext(StoreContext);


  // const url = 'http://localhost:8000'
  // const [list, setList] = useState([]);
  // const fetchList = async () => {
  //   const response = await axios.get(`${url}/api/product/getAllProduct`);
  //   if (response.data.success){
  //     setList(response.data.data);
  //   }
  //   else{
  //     toast.error("Error")
  //   }
  // }

  // useEffect(()=>{
  //     fetchList();
  // },[])


  return (
    <div className="flex flex-wrap p-8 justify-between ">
      {products.map((item, index) => {
         return <ProductCard key={index} id={item._id} productName={item.productName} description={item.description} image={item.image}
         imageUrl = {item.imageUrl}
         buyPrice = {item.buyPrice}
         sellPrice = {item.sellPrice}
         category = {item.category}
         stockProductCount = {item.stockProductCount}
         storedProduct = {item.storedProduct}
         rating = {item.rating}
         numberReviews  = {item.numberReviews}
         isFeature  = {item.isFeature}
         brand = {item.brand} />
})}
    </div>
  );
};

export default ProductList;
