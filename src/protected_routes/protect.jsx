import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import LoginPage from '../screens/loginPage';
import { useLoginStore } from '../store/loginStore';

const Protect = () => {
    const navigate = useNavigate();
    const { isUserLoggedIn } = useLoginStore();
    useEffect(() => {
        if (!isUserLoggedIn) {
                localStorage.removeItem("userName");
                localStorage.removeItem("email");
                localStorage.removeItem("gender");
                localStorage.removeItem("password");
                navigate('/');
        }
    }, [isUserLoggedIn])


    return isUserLoggedIn ? <Outlet /> : <LoginPage />;
}

export default Protect;
