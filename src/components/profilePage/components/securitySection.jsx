import React, { useRef, useState, useCallback } from 'react';
import { Box, Typography, FormControlLabel, Alert } from '@mui/material';
import { Security, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { ButtonComponent, InputField, ProfileSwitch, cn } from '../../../components';
import FormSection from './formSection';
import { useLoginStore } from '../../../store/loginStore';
import useEditorStore from '../../../store/globalStore';

const passwordValidation = {
    minLength: 8,
    hasUpperCase: /[A-Z]/,
    hasLowerCase: /[a-z]/,
    hasNumbers: /\d/,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
};

const validatePassword = (password) => {
    const errors = [];

    if (password.length < passwordValidation.minLength) {
        errors.push(`Password must be at least ${passwordValidation.minLength} characters long`);
    }
    if (!passwordValidation.hasUpperCase.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    return errors;
};


export const SecuritySection = ({
    twoFa,
    handleTwoFa,
    passwordMessage = { type: null, text: '' },
    edit,
    setEdit
}) => {
    const darkMode = useEditorStore(state => state.darkMode);
    const onChange = useLoginStore(e => e.onChange);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    const [password, setPassword] = useState({
        newPassword: "",
        showNewPassword: false,
        confirmPassword: "",
        showConfirmPassword: false,
    });

    const [validationErrors, setValidationErrors] = useState([]);
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handlePasswordChange = useCallback((input) => {
        const { name, value } = input.target;
        setPassword(prev => ({ ...prev, [name]: value }));
        if (name === 'newPassword') {
            const errors = validatePassword(value);
            setValidationErrors(errors);
        }

        if (name === 'confirmPassword') {
            if (value && value !== password.newPassword) {
                setConfirmPasswordError('Passwords do not match');
            } else {
                setConfirmPasswordError('');
            }
        }

        if (name === 'newPassword' && password.confirmPassword) {
            if (password.confirmPassword !== value) {
                setConfirmPasswordError('Passwords do not match');
            } else {
                setConfirmPasswordError('');
            }
        }
    }, [password.newPassword, password.confirmPassword]);

    const handleConfirmPasswordChange = () => { 
        setEdit();
        onChange("password",password.newPassword);
    };

    const handlePasswordField = useCallback(() => {
        setPassword({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            showOldPassword: false,
            showNewPassword: false,
            showConfirmPassword: false,
        });
        setValidationErrors([]);
        setConfirmPasswordError('');
        setEdit();
    }, [edit]);

    const togglePasswordVisibility = useCallback((field, ref) => {
        setPassword(prev => ({ ...prev, [field]: !prev[field] }));
        if (ref?.current) {
            setTimeout(() => ref.current.focus(), 0);
        }
    }, []);

    const isFormValid =
        password.newPassword &&
        password.confirmPassword &&
        validationErrors.length === 0 &&
        !confirmPasswordError;

    return (
        <FormSection title="Security Settings" darkMode={darkMode}>
            <Box className="p-5">
                <Box className={cn(
                    "p-4 rounded-lg mb-4 border transition-all duration-300",
                    twoFa
                        ? darkMode ? "bg-purple-900/20 border-purple-700" : "bg-blue-50 border-blue-200"
                        : darkMode ? "bg-gray-700/50 border-gray-600" : "bg-gray-50 border-gray-200"
                )}>
                    <FormControlLabel
                        control={
                            <ProfileSwitch
                                className="mr-2 ml-1"
                                checked={twoFa}
                                onChange={handleTwoFa}
                            />
                        }
                        label={
                            <Box>
                                <Typography className={`font-medium ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
                                    Two-Factor Authentication
                                </Typography>
                                <Typography variant="body2" className={darkMode ? 'text-purple-300' : 'text-blue-600'}>
                                    Add an extra layer of security to protect your account
                                </Typography>
                            </Box>
                        }
                    />

                    <Box className={cn(
                        "mt-4 pt-4 border-t overflow-hidden transition-all duration-300",
                        darkMode ? "border-purple-700/50" : "border-blue-200",
                        twoFa ? 'max-h-[500px]' : "opacity-0 max-h-0 mt-0 pt-0"
                    )}>
                        <div className={cn(
                            "p-4 rounded-lg",
                            darkMode ? "bg-purple-900/20 text-purple-200" : "bg-blue-50 text-blue-700"
                        )}>
                            <div className="flex items-center">
                                <Security className="mr-2" fontSize="small" />
                                <Typography variant="body2" className="font-medium">
                                    Two-factor authentication is active
                                </Typography>
                            </div>
                            <Typography variant="body2" className={`mt-2 ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}>
                                Your account is now protected with an additional layer of security.
                                Use your authenticator app to generate verification codes when signing in.
                            </Typography>
                        </div>
                    </Box>
                </Box>

                <Box className={cn(
                    "p-4 rounded-lg border",
                    darkMode ? "bg-gray-700/50 border-gray-600" : "bg-gray-50 border-gray-200"
                )}>
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <Box>
                            <Typography className={`font-medium ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
                                Password
                            </Typography>
                        </Box>
                        <ButtonComponent
                            btnText={edit ? 'Cancel' : 'Change password'}
                            darkMode={darkMode}
                            styles={{ width: "fit-content" }}
                            handleClick={handlePasswordField}
                        />
                    </div>

                    {edit && (
                        <Box className={cn(
                            "mt-4 pt-4 border-t",
                            darkMode ? "border-gray-600" : "border-gray-200"
                        )}>
                            {passwordMessage?.type && (
                                <Alert
                                    severity={passwordMessage.type}
                                    className="mb-4"
                                    sx={{
                                        backgroundColor: darkMode
                                            ? passwordMessage.type === 'success' ? 'rgba(46, 125, 50, 0.2)' : undefined
                                            : passwordMessage.type === 'success' ? 'rgba(237, 247, 237, 1)' : undefined,
                                        color: darkMode
                                            ? passwordMessage.type === 'success' ? '#81c784' : undefined
                                            : passwordMessage.type === 'success' ? '#2e7d32' : undefined
                                    }}
                                >
                                    {passwordMessage.text}
                                </Alert>
                            )}

                            <div className="grid grid-cols-1 gap-4">

                                <InputField
                                    ref={ref2}
                                    name="newPassword"
                                    darkMode={darkMode}
                                    styles={{
                                        '& .MuiInputBase-root': {
                                            height: "43px"
                                        }
                                    }}
                                    label="New Password"
                                    type={password.showNewPassword ? "text" : "password"}
                                    value={password.newPassword}
                                    onChange={handlePasswordChange}
                                    error={validationErrors.length > 0}
                                    endIcon={
                                        <div
                                            onClick={() => togglePasswordVisibility('showNewPassword', ref2)}
                                            className={cn('cursor-pointer pr-2 pb-0.5', {
                                                'hidden': !password.newPassword
                                            })}
                                        >
                                            {password.showNewPassword ?
                                                <VisibilityOff sx={{ color: darkMode ? 'rgb(233, 213, 255)' : '#0b6bcb' }} /> :
                                                <Visibility sx={{ color: darkMode ? 'rgb(233, 213, 255)' : '#0b6bcb' }} />
                                            }
                                        </div>
                                    }
                                />
                            
                                {/* Password Validation Errors */}
                                {validationErrors.length > 0 && (
                                    <Box className="mt-[-px]">
                                        {validationErrors.map((error, index) => (
                                            <Typography
                                                key={index}
                                                variant="caption"
                                                className="block text-red-500 mt-1"
                                            >
                                                • {error}
                                            </Typography>
                                        ))}
                                    </Box>
                                )}

                                <InputField
                                    ref={ref3}
                                    name="confirmPassword"
                                    darkMode={darkMode}
                                    styles={{
                                        '& .MuiInputBase-root': {
                                            height: "43px"
                                        }
                                    }}
                                    label="Confirm New Password"
                                    type={password.showConfirmPassword ? "text" : "password"}
                                    value={password.confirmPassword}
                                    onChange={handlePasswordChange}
                                    error={!!confirmPasswordError}
                                    helperText={confirmPasswordError}
                                    endIcon={
                                        <div
                                            onClick={() => togglePasswordVisibility('showConfirmPassword', ref3)}
                                            className={cn('cursor-pointer pr-2 pb-0.5', {
                                                'hidden': !password.confirmPassword
                                            })}
                                        >
                                            {password.showConfirmPassword ?
                                                <VisibilityOff sx={{ color: darkMode ? 'rgb(233, 213, 255)' : '#0b6bcb' }} /> :
                                                <Visibility sx={{ color: darkMode ? 'rgb(233, 213, 255)' : '#0b6bcb' }} />
                                            }
                                        </div>
                                    }
                                />

                                <div className="flex flex-wrap justify-between items-center gap-4 mt-2">
                                    <Link to='/forgotPassword'>
                                        <Typography
                                            variant="body2"
                                            className={`cursor-pointer hover:underline ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}
                                        >
                                            Forgot Password?
                                        </Typography>
                                    </Link>
                                    <ButtonComponent
                                        btnText={"Update Password"}
                                        darkMode={darkMode}
                                        styles={{ width: "fit-content" }}
                                        handleClick={handleConfirmPasswordChange}
                                        disabled={!isFormValid}
                                    />
                                </div>
                            </div>
                        </Box>
                    )}
                </Box>
            </Box>
        </FormSection>
    );
};