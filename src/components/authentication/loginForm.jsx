import React from 'react';
import {
    Box,
    Typography,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Login,
} from '@mui/icons-material';
import { InputField } from '../inputFields/inputField';
import { ButtonComponent } from '../button/button';
import LoginButton from './loginButton';

const LoginForm = ({
    darkMode,
    isMobile,
    loginEmail,
    loginPass,
    handleFieldChange,
    formState,
    updateFormState,
    handleForgotPassword,
    handleFormSubmit,
    loaders,
    handleTogglePasswordVisibility,
    switchAuthMode
}) => {
    return (
        <form onSubmit={handleFormSubmit}>
            <div className="space-y-4 md:space-y-5">
                <InputField
                    autofocus
                    name="email"
                    label="Email"
                    type="email"
                    value={loginEmail}
                    onChange={e => handleFieldChange("loginEmail", e.target.value)}
                    hasError={formState.formSubmitted && !!formState.errors.email}
                    errorMessage={formState.errors.email}
                />

                <InputField
                    name="password"
                    label="Password"
                    type={formState.showPassword ? 'text' : 'password'}
                    value={loginPass}
                    onChange={e => handleFieldChange("loginPass", e.target.value)}
                    hasError={formState.formSubmitted && !!formState.errors.password}
                    errorMessage={formState.errors.password}
                    endIcon={
                        <div
                            onClick={handleTogglePasswordVisibility}
                            className='cursor-pointer pr-2 pb-0.5'
                        >
                            {formState.showPassword ?
                                <VisibilityOff sx={{ color: darkMode ? 'rgb(233, 213, 255)' : '#0b6bcb' }} /> :
                                <Visibility sx={{ color: darkMode ? 'rgb(233, 213, 255)' : '#0b6bcb' }} />
                            }
                        </div>
                    }
                />

                <div className="flex items-center justify-between flex-wrap">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formState.rememberMe}
                                onChange={(e) => updateFormState('rememberMe', e.target.checked)}
                                sx={{
                                    color: darkMode ? 'rgb(167, 139, 250)' : '#3b82f6',
                                    '&.Mui-checked': {
                                        color: darkMode ? 'rgb(167, 139, 250)' : '#3b82f6',
                                    },
                                }}
                                size={isMobile ? "small" : "medium"}
                            />
                        }
                        label={
                            <Typography variant="body2" className={`${darkMode ? 'text-purple-300' : 'text-blue-600'} pt-0.5`}>
                                Remember me
                            </Typography>
                        }
                    />
                    <Typography
                        variant="body2"
                        className={`cursor-pointer hover:underline ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}
                        onClick={handleForgotPassword}
                    >
                        Forgot password?
                    </Typography>
                </div>

                <ButtonComponent
                    type="submit"
                    loading={loaders.isLoginLoading}
                    btnText="Log In"
                    startIcon={<Login />}
                    darkMode={darkMode}
                    styles={{ width: "100%", marginTop: "16px" }}
                />

                <div className="flex items-center pb-4 md:my-6">
                    <div className={`flex-grow h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    <Typography className={`px-2 md:px-4 text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        or continue with
                    </Typography>
                    <div className={`flex-grow h-px ${darkMode ? 'b g-gray-700' : 'bg-gray-200'}`}></div>
                </div>
            </div>
            <LoginButton />
            <Box className="mt-6 md:mt-8 text-center">
                <Typography className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} flex gap-1 w-full justify-center`} variant="body2">
                    Don't have an account?
                    <a
                        href="#toggle"
                        onClick={switchAuthMode}
                        className={`font-medium hover:underline ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}
                    >
                        Sign up
                    </a>
                </Typography>
            </Box>
        </form>
    );
};

export default LoginForm;