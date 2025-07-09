import { Navigate, Outlet, useLocation } from 'react-router-dom';
import LoginPage from '../screens/loginPage';
import { useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';

const Protect = () => {
    const token = secureLocalStorage.getItem("token");
    return token  ? <Outlet /> : <LoginPage />;
}

export default Protect;