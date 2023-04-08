import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '../context/AuthContext';

const PrivateGuard = ({children}) => {
    const { isAuthenticated } = useAuthContext();

    console.log(isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children ? children : <Outlet />  
};

export default PrivateGuard;