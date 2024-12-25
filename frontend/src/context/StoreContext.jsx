import { createContext } from 'react';
import { useState, useEffect } from 'react';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Phone");

  
  useEffect(() => {
    fetch('http://localhost:8000/api/product/getAllProduct?page=1&limit=100')
       .then(response => response.json())
       .then(data => setProducts(data.products))
  }, [])
  
  console.log('products: ', products);


    const [cartItems, setCartItems] = useState({});
    const url ="http://localhost:8000";
    const [token, setToken] = useState("");
    const addToCart = (_id) => {
        if (!cartItems[_id]) {
          setCartItems((prev)=>({...prev, [_id]: 1}));
        }
        else {
          setCartItems((prev)=>({...prev, [_id]: prev[_id] + 1}));
        }
        console.log('cartItems[_id]: ', cartItems[_id]);
        
    
    }
    const removeFromCart = (_id) => {
      setCartItems((prev)=>({...prev, [_id]: prev[_id] - 1}));
    }
    useEffect(() => {
      console.log(cartItems);
    }, [cartItems]);
    
    const contextValue={
        products,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        url,
        token,
        setToken,
        category,
        setCategory


    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;