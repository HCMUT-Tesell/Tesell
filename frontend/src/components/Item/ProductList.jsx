import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import products from '../../assets/products';
import ProductCard from './ProductCard';
// import { toast } from 'react-toastify';

const ProductList = () => {


  return (
    <div className="flex flex-wrap p-8 justify-between">
      {products.map((product) => {
        // if(category === "All" || category === product.category) {
         return <ProductCard key={product.productName} product={product}/>
        //}

})}
    </div>
  );
};

export default ProductList;
