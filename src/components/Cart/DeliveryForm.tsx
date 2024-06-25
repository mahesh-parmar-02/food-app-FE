import { Button, Fade, TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { groceryContext } from '../AppLayout/AppLayout';
import { handleSessionStorage } from '../../common/handleSession';
import PopUpDialog from './PopUpDialog';
import GoBackButton from './GoBackButton';
import { placeOrder } from '../../common/httpServices';

const DeliveryForm = () => {
    const { cartItemsState } = useContext(groceryContext);
    const [cartItems, setCartItems] = cartItemsState;
    const [openDialog, setOpenDialog] = useState(false);
    const [orderId, setOrderId ] = useState();

    const { register, handleSubmit, formState: { errors } } = useForm<any>();

    const navigate = useNavigate()

    // Handle PlaceOrder
    const onSubmit = (data:any) => {
        
        let params = {
            email : sessionStorage.getItem('userEmail'),
            totalAmount: sessionStorage.getItem('gTotal')
        }
        placeOrder(params).then((res: any) => {
            setOpenDialog(!openDialog);
            setOrderId(res.data.orderId);
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    }
    // Handle Dialog 
    const handleOK = () => {
        // Reset the Cart_items
        setCartItems([])
        setOpenDialog(!openDialog)
        navigate('/')
    }

    return (
        <>
            <PopUpDialog
                open={openDialog}
                message={`Order Placed successfully!! Order ID => ${orderId}`}
                handleOk={handleOK}
                placeOrder={true} />
            <div className='md:mx-0 mx-auto space-y-4 max-w-[37rem]'>
                {/* Go back Btn */}
                <GoBackButton />
                <div className='space-y-9 lg:space-y-10 '>
                    {/* Title */}
                    <h1 className='lg:text-2xl text-xl font-semibold text-gray-600'>
                        Complete Delivery Details
                    </h1>

                    {/* Delivery Form */}
                    <Fade in={true}>
                        <form action="post"
                            className='lg:space-y-8  space-y-7'
                            onSubmit={handleSubmit(onSubmit)} >
                            {/* Full */}
                            <TextField
                                {...register('full_name', {
                                    required: 'Name is required',
                                })}
                                defaultValue={'Fn Ln'}
                                label='Full Name'
                                size='small'
                                error={errors.email ? true : false}
                                helperText={(errors.email?.message && typeof errors.email?.message === 'string') && errors.email?.message}
                                fullWidth
                                color='success'
                                variant='outlined' />

                            {/* Email */}
                            <TextField
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern:
                                    {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                                defaultValue={'mm@gmail.com'}
                                label='Email'
                                size='small'
                                error={errors.email ? true : false}
                                helperText={(errors.email?.message && typeof errors.email?.message === 'string') && errors.email?.message}
                                fullWidth
                                color='success'
                                variant='outlined' />

                            {/* Address */}
                            <TextField
                                {...register('address', {
                                    required: 'Address is required',
                                })}
                                defaultValue={'Mumbai'}
                                label='Address'
                                size='small'
                                error={errors.address ? true : false}
                                helperText= {(errors.address?.message && typeof errors.address?.message === 'string') && errors.address?.message}
                                // helperText={(touched.controlType && errors.controlType && typeof errors.controlType === 'string') && errors.controlType}"

                                fullWidth
                                placeholder='street, city, state'
                                color='success'
                                variant='outlined' />

                            {/* Submit Button */}
                            <Button type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ textTransform: 'capitalize' }}
                                color='success'>
                                Place Order
                            </Button>
                        </form>
                    </Fade>
                </div>
            </div>
        </>
    );
};

export default DeliveryForm;