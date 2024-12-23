import { createContext } from 'react';
import products from '../assets/products';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
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
        setToken


    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;