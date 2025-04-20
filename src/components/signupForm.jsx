import React from 'react';
import {
    Box,
    Typography,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    AppRegistration,
} from '@mui/icons-material';
import { InputField } from '../components/inputField';
import { ButtonComponent } from '../components/button';
import LoginButton from './loginButton';

const SignupForm = ({
    darkMode,
    loginName,
    loginEmail,
    loginPass,
    loginConfirmPass,
    handleFieldChange,
    formState,
    handleFormSubmit,
    loaders,
    handleTogglePasswordVisibility,
    handleToggleConfirmPasswordVisibility,
    switchAuthMode
}) => {
    return (
        <form onSubmit={handleFormSubmit}>
            <div className="space-y-4 md:space-y-5">
                <InputField
                    name="name"
                    label="Full Name"
                    value={loginName}
                    onChange={e => handleFieldChange("loginName", e.target.value)}
                    hasError={formState.formSubmitted && !!formState.errors.name}
                    errorMessage={formState.errors.name}
                />

                <InputField
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

                <InputField
                    name="confirmPassword"
                    label="Confirm Password"
                    type={formState.showConfirmPassword ? 'text' : 'password'}
                    value={loginConfirmPass}
                    onChange={e => handleFieldChange("loginConfirmPass", e.target.value)}
                    hasError={formState.formSubmitted && !!formState.errors.confirmPassword}
                    errorMessage={formState.errors.confirmPassword}
                    endIcon={
                        <div
                            onClick={handleToggleConfirmPasswordVisibility}
                            className='cursor-pointer pr-2 pb-0.5'
                        >
                            {formState.showConfirmPassword ?
                                <VisibilityOff sx={{ color: darkMode ? 'rgb(233, 213, 255)' : '#0b6bcb' }} /> :
                                <Visibility sx={{ color: darkMode ? 'rgb(233, 213, 255)' : '#0b6bcb' }} />
                            }
                        </div>
                    }
                />

                <ButtonComponent
                    type="submit"
                    loading={loaders.isLoginLoading}
                    btnText="Continue to Sign Up"
                    startIcon={<AppRegistration />}
                    darkMode={darkMode}
                    styles={{ width: "100%", marginTop: "16px" }}
                />

                <div className="flex items-center pb-4 md:my-6">
                    <div className={`flex-grow h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    <Typography className={`px-2 md:px-4 text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        or continue with
                    </Typography>
                    <div className={`flex-grow h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                </div>
            </div>
            <LoginButton     />
            <Box className="mt-6 md:mt-8 text-center">
                <Typography className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} flex gap-1 w-full justify-center`} variant="body2">
                    Already have an account?
                    <a
                        href="#toggle"
                        onClick={switchAuthMode}
                        className={`font-medium hover:underline ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}
                    >
                        Log in
                    </a>
                </Typography>
            </Box>
        </form>
    );
};

export default SignupForm;