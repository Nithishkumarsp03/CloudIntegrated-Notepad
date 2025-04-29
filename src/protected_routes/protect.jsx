import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import LoginPage from '../screens/loginPage';
import { useLoginStore } from '../store/loginStore';

const Protect = () => {
    const navigate = useNavigate();
    const { isUserLoggedIn, onChange } = useLoginStore();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
                onChange("isUserLoggedIn",true);
                localStorage.removeItem("userName");
                localStorage.removeItem("email");
                localStorage.removeItem("gender");
                localStorage.removeItem("password");
                navigate('/');
        }
    }, [token])
    return token ? <Outlet /> : <LoginPage />;
}

export default Protect;
