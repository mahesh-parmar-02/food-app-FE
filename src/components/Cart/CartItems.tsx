import React, { useContext } from 'react';
import { groceryContext } from '../AppLayout/AppLayout';
import CartItemCard from './CartItemCard';

const CartItems = () => {
    // Get Cart Items from Context
    const { cartItemsState } = useContext<any>(groceryContext);
    const [cartItems, setCartItems] = cartItemsState;

    return (
        <div className='lg:space-y-10 space-y-5'>
            {/* Title */}
            <h2 className='lg:text-2xl sm:text-xl text-lg sm:font-semibold font-bold '>
                Selected Items
            </h2>

            {/* Items Card list */}
            <div className='space-y-3'>
                {cartItems.map((cartItem : any) => (
                    <CartItemCard
                        item={cartItem}
                        key={cartItem.id.itemId} />
                ))}

            </div>
        </div>
    );
};

export default CartItems;