import React from 'react'
import useEditorStore from '../globalStore';
import { Outlet } from 'react-router-dom';
import LoginPage from '../screens/loginPage';

const Protect = () => {
    const { isUserLoggedIn } = useEditorStore();
    return isUserLoggedIn ? <Outlet /> : <LoginPage />;
}

export default Protect;
