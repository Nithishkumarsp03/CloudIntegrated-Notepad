import { Navigate, Outlet, useLocation } from 'react-router-dom';
import LoginPage from '../screens/loginPage';
import { useEffect } from 'react';

const Protect = () => {
    const token = localStorage.getItem("token");
    return token  ? <Outlet /> : <LoginPage />;
}

export default Protect;