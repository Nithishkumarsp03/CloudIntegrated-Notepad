
import { Typography } from '@mui/material';
import React from 'react'

export const LoginHeader = ({ darkMode, isLogin }) => {
    return (
        <div className="mb-6 md:mb-8">
            <Typography variant="h4" className={`font-bold mb-1 md:mb-2 ${darkMode ? 'text-purple-100' : 'text-blue-900'}`}>
                {isLogin ? 'Welcome Back' : 'Create Account'}
            </Typography>
            <Typography variant="body1" className={`${darkMode ? 'text-purple-300' : 'text-blue-600'}`}>
                {isLogin ? 'Log in to continue to your workspace' : 'Join NotePad to start organizing your thoughts'}
            </Typography>
        </div>
    )
}

