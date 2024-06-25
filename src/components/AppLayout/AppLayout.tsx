import { FC, useEffect } from 'react';
import NavigaionPanel from '../NavigaionPanel/NavigaionPanel';
import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";
import { httpGet } from '../../common/httpServices';

let isUserInSession = false;
sessionStorage.getItem('userEmail') ? isUserInSession = true : false;

export const groceryContext = createContext<any>(0);
const AppLayout: FC<any>  = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isUserInSession);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if(sessionStorage.getItem('userEmail')) {
        let url = 'cart/'+ sessionStorage.getItem('userEmail');
  
    httpGet(url).then((res) => {
      setCartItems(res.data);
    }).catch((error) => {
        throw new Error('Cart Fetch Failed '+ error);
    });
    }
    
  }, []);
  return (
    <groceryContext.Provider value={{
      userLoggedInState: [isUserLoggedIn, setIsUserLoggedIn],
      cartItemsState: [cartItems, setCartItems]
      }}> 
      <NavigaionPanel />
      <section className="min-h-screen">
          <Outlet />
      </section>
    </groceryContext.Provider> 
  );
};

export default AppLayout;
