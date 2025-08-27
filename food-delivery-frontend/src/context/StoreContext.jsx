import React, { createContext, useEffect, useState } from 'react';
import axios from "axios"
// import { food_list } from '../assets/assets';

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
   
  const [cartItems, setCartItems] = useState({});
  const url = "https://food-delivery-food-delivery-backend.onrender.com";
  const [token,setToken] = useState("");

  const [food_list,setFoodList] = useState([])

  const addToCart = async (itemId) => {
    if(!cartItems[itemId]) {
        setCartItems((prev)=>({
            ...prev,
            [itemId]: 1
        }))
    } else if(cartItems[itemId] >= 1) {
        setCartItems((prev)=>({
            ...prev,
            [itemId]: prev[itemId] + 1
        }))
    }
    if(token) {
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  } 

  const removeFromCart = async (itemId) => {
    if(cartItems[itemId]) {
        if(cartItems[itemId] === 1) {   
            const newCartItems = {...cartItems};
            delete newCartItems[itemId];
            setCartItems(newCartItems);
        }
        else {
            setCartItems((prev)=>({
                ...prev,
                [itemId]: prev[itemId] - 1
            }))
            if(token) {
              await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
            }
        }
    }
    }

  const getTotalCartAmount = () =>{
    let totalAmount = 0;
    for(const item in cartItems){
      if(cartItems[item]>0){
      let itemInfo = food_list.find((product)=>product._id === item)
      totalAmount += itemInfo.price*cartItems[item]
      }

    }
    return totalAmount;
  }

  const fetchFoodList = async ()=>{
      const response = await axios.get(url+"/api/food/list")
      setFoodList(response.data.data)
  }

  const loadCartData = async (token) =>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData)
  }

  useEffect(()=>{

      async function loadData(){
        await fetchFoodList();
        if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"))
      }
      }
      loadData();
  },[])

  const contextValue = {
      food_list,
        cartItems,
        addToCart,
        removeFromCart,
        setCartItems,
        getTotalCartAmount,
        url,
        token,
        setToken
  }
  return(
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider



// The Context API solves this by letting you create a global store of data that any component can access, no matter how deep it is in the component tree.
// The purpose of a context folder in React projects is to organize and manage global state using the React Context API.
