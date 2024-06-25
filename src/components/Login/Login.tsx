import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, Collapse, Container, Fade, IconButton, InputAdornment, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import animation from '../../assets/loginAnimation.gif';
import { useLocation, useNavigate } from 'react-router-dom';
import { groceryContext } from '../AppLayout/AppLayout';
import { httpGet, userLogin, userSignUp } from '../../common/httpServices';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [logInError, setLogInError] = useState('');
    const [signUpMode, setSignUpMode] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } }

    const { cartItemsState, userLoggedInState } = useContext<any>(groceryContext);
    // Login handler
    const onSubmit = (data: any) => {
        let creds = {
            email: data.email,
            password: data.password
        } 
        signUpMode? registerUser(data) : authenticate(creds);
    };

    const authenticate = (creds: any) => {
        userLogin(creds).then((response: any) => {
            setLogInError('')
            sessionStorage.setItem('userEmail', response?.data?.email);
            const [isUserLoggedIn, setIsUserLoggedIn] = userLoggedInState;
            setIsUserLoggedIn(true);
            
            httpGet('cart/'+response?.data?.email).then((res) => {
                const [cartItems, setCartItems] = cartItemsState;
                setCartItems(res.data);
            });

            navigate(from);
        }).catch((reson) => {
            console.log(reson);
            setLogInError("Invalid");
        });
    }

    const registerUser = (creds: any) => {
        userSignUp(creds).then((response) => {
            setSignUpMode(false);
            alert('sign up success!! log in to continue!!')
        }).catch((reson) => {
            console.log(reson);
            setLogInError("Invalid")
        });
    }

    return (
        <section className='h-screen px-2 items-center flex justify-center sm:px-6 lg:px-8'>
            <Fade in={true}>
                <Container>
                    <div className='grid md:grid-cols-2'>
                        {/* Animation */}
                        <div className='col hidden md:flex items-center justify-center'>
                            <img
                                className='lg:max-h-80 max-h-[17rem]'
                                src={animation}
                                alt="login" />
                        </div>
                        {/* Form */}
                        <div className='flex md:justify-start justify-center'>
                            <div className='flex items-center max-w-[26rem] p-4 h-80'>
                                <div className='lg:space-y-10 md:space-y-8 space-y-10'>
                                    {/* Form Title */}
                                    <h3 className='text-center font-semibold text-gray-800 lg:text-3xl md:text-2xl text-3xl'>
                                        Log In
                                    </h3>
                                    <form onSubmit={handleSubmit(onSubmit)}
                                        className='text-center lg:space-y-7 md:space-y-6 space-y-7' action="login" method="post">
                                        {/* Email */}
                                        <TextField
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                            label='Email'
                                            size='small'
                                            error={errors.email ? true : false}
                                            fullWidth
                                            color='success'
                                            variant='outlined'
                                        />

                                        {/* Password */}
                                        <TextField
                                            {...register('password', {
                                                required: 'Password is required',
                                                // pattern: {
                                                //     value: /^(?=.*[A-Z])[a-zA-Z0-9]{6,}$/,
                                                //     message: 'Minimum 6 characters with one uppercase letter',
                                                // },
                                            })}
                                            label="Password"
                                            type={showPassword ? 'text' : 'password'}
                                            fullWidth
                                            size="small"
                                            error={errors.password ? true : false}
                                            color="success"
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            size='small'
                                                            onClick={() => setShowPassword(!showPassword)}>
                                                            {showPassword ?
                                                                <VisibilityOff fontSize='inherit' />
                                                                : <Visibility fontSize='inherit' />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />

                                        {/* Display the alert only if there is a login error */}
                                        {logInError &&
                                            <div className="text-red-800">Invaid Login</div>
                                        }
                                        {/* Submit-btn */}
                                        { !signUpMode ?
                                            <Button
                                            sx={{ textTransform: 'capitalize' }}
                                            color='success'
                                            type='submit'
                                            variant='contained'>
                                            Log in
                                            </Button>
                                        :
                                            <Button
                                            sx={{ textTransform: 'capitalize' }}
                                            color='success'
                                            type='submit'
                                            variant='contained'>
                                            Sign Up
                                            </Button>
                                        }
                                        
                                    </form>
                                    {!signUpMode && <a href='#' onClick={(e) => {e.preventDefault();setSignUpMode(true)}} className='text-green-800 underline'>Sign Up</a>}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Fade>
        </section>
    );
};

export default Login;