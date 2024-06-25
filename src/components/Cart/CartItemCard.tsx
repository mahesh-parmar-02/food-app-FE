import { Button, Fade, IconButton, Tooltip } from '@mui/material';
import { Add, Remove } from "@mui/icons-material";
import { FC, useContext, useEffect, useState } from 'react';
import { groceryContext } from '../AppLayout/AppLayout';
import { addItemToCart, httpGet, removeItemFromCart } from '../../common/httpServices';

const CartItemCard:FC<any> = ({ item }) => {
    const { id, quantity} = item;
    const [currentItem, setCurentItem] = useState<any>(); 
    useEffect(() => {
        let url = 'products/'+id.itemId;
        httpGet(url).then((res) => {
            setCurentItem(res.data);
        }).catch((error) => {
            throw new Error('Products Fetch Failed '+ error);
        });
    },[]);

    return (
        <>
            <Fade in={true}>
                <div className='grid max-w-[40rem] py-2.5 px-3 xl:grid-cols-5 sm:grid-cols-6 grid-cols-7 lg:gap-x-2.5 gap-x-2 rounded-md w-full bg-white hover:shadow-sm'>
                    {/*Img */}
                    <div className='col flex items-center justify-center'>
                        <img
                            src={currentItem?.img}
                            className='lg:h-16 h-10'
                            alt={currentItem?.description} />
                    </div>

                    <div className='col-span-2 overflow-hidden pt-2'>
                        <div className=' overflow-hidden lg:space-y-2 space-y-0.5'>
                            {/* Name */}
                            <h4 className='font-semibold lg:max-h-none max-h-10 overflow-hidden lg:text-gray-700 sm:text-sm text-xs'>
                                {currentItem?.description}
                            </h4>

                            {/* Description */}
                            <h6 className='text-justify text-xs text-gray-700'>
                                Best Quality
                            </h6>
                        </div>
                    </div>

                    <div className='flex sm:col-span-1 col-span-2 justify-center items-center'>
                        <div className='lg:space-y-1 md:space-y-0 sm:space-y-0.5'>
                            {/*Total Price */}
                            <h3 className='font-semibold whitespace-nowrap sm:text-base text-sm text-green-600'>
                                Rs {currentItem?.price * quantity}
                            </h3>
                        </div>
                    </div>

                    {/* Item Quantity Control */}
                    <div className='flex items-center justify-center xl:col-span-1 col-span-2'>
                        <QuantityController
                            item={item}
                         />
                    </div>
                </div>
            </Fade></>
    );
};

// Quantity Controller
const QuantityController:FC<any> = ({ item }) => {
    const { quantity, id, price } = item;
    const [productQuantity, setProductQuantity] = useState(quantity);

    // Get Cart Items from Context
    const { cartItemsState } = useContext(groceryContext);
    const [cartItems, setCartItems] = cartItemsState;

    // Event Handlers
    const handleReduce = () => {
        productQuantity > 1 && setProductQuantity(productQuantity - 1);
        let params = {
            email : sessionStorage.getItem('userEmail'),
            itemId: id.itemId,
            quantity: 1
        }

        removeItemFromCart(params).then((res: any) => {
            setCartItems(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    const handleIncrement = () => {
        setProductQuantity(productQuantity + 1);
         let params = {
            email : sessionStorage.getItem('userEmail'),
            itemId: id.itemId,
            quantity: 1
        }

        addItemToCart(params).then((res: any) => {
            setCartItems(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className={'flex items-center justify-center my-auto lg:space-x-2.5 sm:space-x-2 space-x-1.5'}>

            {/* Reduce Quantity */}
            <IconButton
                size={'small'}
                disabled={productQuantity < 2}
                onClick={handleReduce}
            >
                <Remove fontSize='inherit' />
            </IconButton>

            {/* Current Quantity*/}
            <h1 className={'my-auto lg:text-xl lg:font-medium font-semibold text-gray-700 whitespace-nowrap'}>
                {productQuantity}<span className='lg:text-sm text-xs'></span>
            </h1>

            {/* Increase Quantity */}
            <IconButton
                disabled={productQuantity>=10}
                size={'small'}
                onClick={handleIncrement}
                color='success'>
                <Add fontSize='inherit' />
            </IconButton>
        </div>
    )
}

export default CartItemCard;