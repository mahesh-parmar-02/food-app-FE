import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import  {groceryContext}  from '../AppLayout/AppLayout';

const ProtectedRoute = () => {
    const location = useLocation();
    const { userLoggedInState } = useContext<any>(groceryContext);
    const [isUserLoggedIn, setIsUserLoggedIn] = userLoggedInState;
    return (
        isUserLoggedIn ?
            <Outlet />
            : <Navigate
                to={'/login'}
                state={{ from: location }} />
    );
};

export default ProtectedRoute;