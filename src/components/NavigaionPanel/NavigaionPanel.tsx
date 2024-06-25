import { Button, Container, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartRounded } from '@mui/icons-material';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import logo from "../../assets/logo.png";
import { groceryContext } from '../AppLayout/AppLayout';
import SuccessAlert from '../SuccessAlert/SuccessAlert';
import { httpGet } from '../../common/httpServices';


const Links= () => {
  // This class will create Link Obj
  class LinkClass {
    id: any;
    linkName: string;  
    constructor(id: any, linkName: string) {
          this.id = id;
          this.linkName = linkName;
      }
  }

  const pageLink = [new LinkClass(0, 'Home'), new LinkClass(1, 'Categories'),new LinkClass(2, 'Products')];

  return (< ul className={`flex p-0 sm:space-x-8 space-x-5' text-black`} >
          {
              pageLink.map(li => (
                  <Link to={`/${li.linkName.toLowerCase()}`} key={li.id}>
                      <li className='sm:text-base text-black hover:text-gray-800 hover:scale-[0.99] text-sm'>
                          {li.linkName}
                      </li>
                  </Link>
              ))}
      </ul >
      )
}
const NavigaionPanel = () => {
    
    const isLargeScreen = useMediaQuery('(max-width:1280px)')

    const navigate = useNavigate();
    const { userLoggedInState, cartItemsState } = React.useContext(groceryContext);
    const [isUserLoggedIn, setIsUserLoggedIn] = userLoggedInState;
    const [cartItems, setCartItems] = cartItemsState;
    const [openAlert, setOpenAlert] = React.useState(false);

    // Log out button handler 
    const handleLogOut = () => {
        setIsUserLoggedIn(false);
        setCartItems([]);
        setOpenAlert(!openAlert);
        sessionStorage.removeItem('userEmail');
    }

    return (
        <>
            <SuccessAlert
                state={[openAlert, setOpenAlert]}
                massage={'Log out successfully'} />

            <nav className='fixed z-50'>
                <CssBaseline />
                    <AppBar sx={{ bgcolor: 'white'}}>
                        <Toolbar>
                            <Container sx={{ display: 'flex', px: isLargeScreen ? 0.5 : 0 }} >
                                  <div className='flex w-full justify-between items-center'>
                                    {/* Brand_icon */}
                                    <Link to={'/home'}>
                                        <img className='sm:max-h-14 max-h-5 my-auto cursor-pointer'
                                            src={logo}
                                            alt="grocery" />
                                    </Link>

                                    <div className='flex items-center space-x-8'>
                                        {/* Links */}
                                        <Links />
                                        <div className='sm:space-x-8 space-x-5'>
                                            {/* Go to cart btn */}
                                            <Tooltip title='Cart'>
                                                <span>
                                                    <IconButton
                                                        onClick={() => navigate('/cart')}
                                                        // disabled
                                                        sx={{ textTransform: 'capitalize' }}
                                                        color='warning'>
                                                            {cartItems.length}
                                                        <ShoppingCartRounded fontSize='inherit' />
                                                    </IconButton>
                                                </span>
                                            </Tooltip>

                                            {// Log in Btn
                                                !isUserLoggedIn ?
                                                    <Button onClick={() => navigate('/login')}
                                                        size={'medium'}
                                                        sx={{ textTransform: 'capitalize' }}
                                                        color='success'
                                                        variant='contained'>
                                                        Log in
                                                    </Button>

                                                    // Log out Btn
                                                    : <Button
                                                        size={'medium'}
                                                        onClick={handleLogOut}
                                                        sx={{ textTransform: 'capitalize'}}
                                                        color='success'
                                                        variant='contained'>
                                                        Log out
                                                    </Button>}
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </Toolbar>
                    </AppBar>
            </nav>
        </>
)};

export default NavigaionPanel;
