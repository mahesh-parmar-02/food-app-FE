
import { Container } from "@mui/material";
import { createContext, useContext, useState } from "react";
import EmptyCart from './EmptyCart';
import { groceryContext } from '../AppLayout/AppLayout';
import OrderSummary from './OrderSummary';
import CartItems from './CartItems';
import DeliveryForm from './DeliveryForm';


export const checkoutContext = createContext<any>(null);
const Cart = () => {

   // Get Cart Items from Context
   const { cartItemsState } = useContext<any>(groceryContext);
   const [cartItems, setCartItems] = cartItemsState;

   const [isProceedToCheckout, setIsProceedToCheckout] = useState(false);

   return (
       <checkoutContext.Provider value={[isProceedToCheckout, setIsProceedToCheckout]}>
           <section className={`${cartItems.length > 0 ? 'min-h-screen ' : 'h-screen '}pt-20 pb-10`}>
               {cartItems.length > 0 ?
                   <Container sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                       <section className="grid lg:gap-x-0 gap-x-5 gap-y-8 w-full xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-12 ">
                           <div className='col xl:col-span-2 lg:col-span-1 md:col-span-8'>
                               {!isProceedToCheckout ?
                                   <CartItems />
                                   : <DeliveryForm/>
                               }
                           </div>
                           <OrderSummary />
                       </section>
                   </Container>

                   : <EmptyCart />
               }
           </section>
       </checkoutContext.Provider>
   );
}
export default Cart;
