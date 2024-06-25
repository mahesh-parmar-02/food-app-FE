import { FC, useContext } from "react";
import { Button, Card, CardActions, CardContent, Fade, Skeleton } from '@mui/material';
import { useState } from 'react';
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import { imgPaths } from "../../common/app.constants";
import { addItemToCart } from "../../common/httpServices";
import { groceryContext } from "../AppLayout/AppLayout";
import React from "react";

const ProductCard: FC<any> = ({product}) => {
    const { id, description, price, unit, qty, img} = product;
    

    const [openAlert, setOpenAlert] = useState(false);

    const { userLoggedInState,  cartItemsState} = useContext<any>(groceryContext);
    const [isUserLoggedIn, setIsUserLoggedIn] = userLoggedInState;
    const [cartItems, setCartItems] = cartItemsState;

    let matchingItem: any = cartItems.filter((elem: any) => elem.id.itemId === id);
    let deduction = matchingItem.length > 0 ? matchingItem[0].quantity : 0;
    
    const [qtyLeft, updateQtyLeft] = useState<any>(qty - deduction);
    
    //Handle Add To Cart
    const handleAddToCartBtn = () => {
        let params = {
            email : sessionStorage.getItem('userEmail'),
            itemId: id,
            quantity: 1
        }

        addItemToCart(params).then((res: any) => {
            setOpenAlert(!openAlert);
            updateQtyLeft((qtyLeft: any) => qtyLeft - 1);
            setCartItems(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <SuccessAlert
                state={[openAlert, setOpenAlert]}
                massage={'Item added successfully'} />

            <Fade in={true}>
                <Card sx={{ maxWidth: 295, mx: 'auto', boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'white' }}>

                    
                    <div className='md:h-36 py-3 w-full bg-white flex items-center justify-center'>
                        <img className='md:max-h-28 max-h-24'
                            loading='lazy'
                            src={imgPaths[img]}
                            alt={description} />
                    </div>
                    <div className='p-1.5'>
                        <CardContent className='md:space-y-2 space-y-1.5 '>
                            {/* title */}
                            <h3 className='md:text-xl lg:text-2xl text-xl text-gray-700 font-semibold text-center capitalize'>
                                {description}
                            </h3>
                            <div className='md:space-y-1.5 space-y-2 lg:space-y-2'>
                                <div className='flex justify-center space-x-5'>
                                    {/* Amount */}
                                    <span className='block text-sm md:text-xs lg:text-sm'>
                                        ± {qty} {unit}
                                    </span>
                                    {/* Price */}
                                    <span className='block text-sm md:text-xs lg:text-sm'>
                                        Rs. {price}
                                    </span>
                                </div>
                                <div className='flex justify-center space-x-5'>
                                <span className='block text-sm md:text-xs lg:text-sm'>
                                    {qtyLeft}{' '+ unit + ' left'} 
                                </span>    
                                </div>
                            </div>
                        </CardContent>
                        <CardActions>
                            {isUserLoggedIn && <Button
                                sx={{ textTransform: 'capitalize', marginX: 'auto', ":hover": { bgcolor: '#2e7d32', color: 'white', transition: 'all 235ms ease-in-out' } }}
                                fullWidth
                                onClick={handleAddToCartBtn}
                                disabled={qtyLeft<=0}
                                size={'medium'}
                                variant='outlined'
                                color='success'>
                                Add to cart
                            </Button>}
                        </CardActions>
                    </div>
                </Card>
            </Fade>
        </div>
    );
};

// ProductCard Skeleton
export const ProductCardSkeleton = () => (
    <div>
        <Card sx={{ maxWidth: 308, mx: 'auto', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', backgroundColor: 'white' }}>

            {/* Product_img */}
            <Skeleton
                variant='rectangular'
                height={170}
                width={'100%'} />

            <div className='px-1.5 pb-2'>
                <CardContent className='space-y-2' sx={{ pb: 1 }}>
                    {/* title */}
                    <Skeleton
                        sx={{ mx: 'auto' }}
                        variant='text'
                        height={'3rem'}
                        width={'55%'} />

                    <div className='md:space-y-1.5 space-y-2 lg:space-y-2'>
                        <div className='flex justify-center space-x-5'>
                            {/* Amount */}
                            <Skeleton
                                variant='text'
                                height={'1.3rem'}
                                width={'30%'} />

                            {/* Price */}
                            <Skeleton
                                variant='text'
                                height={'1.3rem'}
                                width={'25%'} />
                        </div>

                        <div className='flex justify-center'>
                            {/* Ratings */}
                            <Skeleton
                                variant='text'
                                height={'1.6rem'}
                                width={'80%'} />
                        </div>
                    </div>
                </CardContent>

                {/* Add To Cart Btn */}
                <CardActions sx={{ pt: 0 }}>
                    <Skeleton
                        variant='rounded'
                        height={'1.9rem'}
                        width={'100%'} />
                </CardActions>
            </div>
        </Card>
    </div>
)
export default React.memo(ProductCard);