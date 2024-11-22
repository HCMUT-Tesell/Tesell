import { useState } from 'react';
import ProductCard from './ProductCard';
import huawei from '../../assets/images/huawei-pura.png'
import iphone from '../../assets/images/4.jpg'
import samsung_gala from '../../assets/images/samsung-galaxy-z-fold.png'
import samsung_s24 from '../../assets/images/1.jpg'
const ProductList = () => {
  const [cart, setCart] = useState([]);

  const products = [
    {
      id: 1,
      image: huawei,
      name: 'Huawei Pura 70 Ultra',
      rating: 4,
      price: 25000000,
    },
    {
      id: 2,
      image: samsung_s24,
      name: 'Samsung S24 Ultra',
      rating: 5,
      price: 24000000,
    },
    {
      id: 3,
      image: iphone,
      name: 'Iphone 16 Pro Max',
      rating: 4,
      price: 3449000,
    },
    {
        id: 4,
        image: samsung_gala,
        name: 'Samsung Galaxy Z Fold6',
        rating: 4,
        price: 52999000,
      },
  ];

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  return (
    <div className="flex flex-wrap gap-4 p-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
