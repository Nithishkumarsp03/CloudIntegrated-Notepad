import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import LoginPage from '../screens/loginPage';
import { useLoginStore } from '../store/loginStore';

const Protect = () => {
    const { isUserLoggedIn } = useLoginStore();
    return isUserLoggedIn ? <Outlet /> : <LoginPage />;
}

export default Protect;
