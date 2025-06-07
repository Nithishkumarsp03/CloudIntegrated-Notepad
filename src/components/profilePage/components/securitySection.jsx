    import React from 'react';
    import { Box, Typography, FormControlLabel, Alert } from '@mui/material';
    import { Security } from '@mui/icons-material';
    import { Link } from "react-router-dom";
    import { ButtonComponent, InputField, ProfileSwitch, cn } from '../../../components';
    import FormSection from './formSection';
    import { useLoginStore } from '../../../store/loginStore';

    export const SecuritySection = ({
        darkMode,
        twoFa,
        onChange,
        showPasswordFields,
        togglePasswordFields,
        passwordMessage,
        passwordData,
        setPasswordData,
        handlePasswordChange
    }) => {
        const { persistStorage } = useLoginStore();
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
                                    onChange={() =>
                                        persistStorage("twoFa",!twoFa)
                                    }
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
                                btnText={showPasswordFields ? 'Cancel' : 'Change password'}
                                darkMode={darkMode}
                                styles={{ width: "fit-content" }}
                                handleClick={togglePasswordFields}
                            />
                        </div>

                        {showPasswordFields && (
                            <Box className={cn(
                                "mt-4 pt-4 border-t",
                                darkMode ? "border-gray-600" : "border-gray-200"
                            )}>
                                {passwordMessage.type && (
                                    <Alert
                                        severity={passwordMessage.type}
                                        className="mb-4"
                                        sx={{
                                            backgroundColor: darkMode
                                                ? passwordMessage.type === 'success' && 'rgba(46, 125, 50, 0.2)'
                                                : passwordMessage.type === 'success' && 'rgba(237, 247, 237, 1)',
                                            color: darkMode
                                                ? passwordMessage.type === 'success' && '#81c784'
                                                : passwordMessage.type === 'success' && '#2e7d32'
                                        }}
                                    >
                                        {passwordMessage.text}
                                    </Alert>
                                )}

                                <div className="grid grid-cols-1 gap-4">
                                    <InputField
                                        darkMode={darkMode}
                                        styles={securityStyles}
                                        label="Current Password"
                                        type="password"
                                        value={passwordData.oldPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                                    />
                                    <InputField
                                        darkMode={darkMode}
                                        styles={securityStyles}
                                        label="New Password"
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
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
                                            btnText="Update Password"
                                            darkMode={darkMode}
                                            styles={{ width: "fit-content" }}
                                            handleClick={handlePasswordChange}
                                            disabled={!passwordData.oldPassword || !passwordData.newPassword}
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
    
const securityStyles = {
    dark: {
        '& .MuiInputBase-root': {
            backgroundColor: '#0F172A !important',
            border: '3px solid #00D9FF !important',
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)',
            animation: 'securityPulse 2s ease-in-out infinite alternate',
            '&:hover': {
                borderColor: '#00F0FF !important',
                boxShadow: '0 0 25px rgba(0, 240, 255, 0.5)',
            },
            '&.Mui-focused': {
                borderColor: '#FF6B35 !important',
                boxShadow: '0 0 30px rgba(255, 107, 53, 0.6)',
            }
        },
        '& .MuiInputBase-input': {
            color: '#00FF88 !important',
            fontWeight: '600 !important',
            textShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
        },
        '& .MuiFormLabel-root': {
            color: '#FFD700 !important',
            fontWeight: '700 !important',
            textShadow: '0 0 10px rgba(255, 215, 0, 0.7)',
        },
        '& .MuiFormLabel-root.Mui-focused': {
            color: '#FF6B35 !important',
            textShadow: '0 0 15px rgba(255, 107, 53, 0.8)',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00D9FF !important',
            borderWidth: '3px !important',
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00F0FF !important',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF6B35 !important',
        },
        '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #0F172A inset !important',
            WebkitTextFillColor: '#00FF88 !important',
        },
        '@keyframes securityPulse': {
            '0%': {
                boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)',
            },
            '100%': {
                boxShadow: '0 0 25px rgba(0, 217, 255, 0.6)',
            },
        },
    },
    light: {
        '& .MuiInputBase-root': {
            backgroundColor: '#FAFAFA !important',
            border: '3px solid #FF1744 !important',
            boxShadow: '0 0 15px rgba(255, 23, 68, 0.3)',
            animation: 'securityPulse 2s ease-in-out infinite alternate',
            '&:hover': {
                borderColor: '#FF4569 !important',
                boxShadow: '0 0 20px rgba(255, 69, 105, 0.4)',
            },
            '&.Mui-focused': {
                borderColor: '#2196F3 !important',
                boxShadow: '0 0 25px rgba(33, 150, 243, 0.5)',
            }
        },
        '& .MuiInputBase-input': {
            color: '#1565C0 !important',
            fontWeight: '600 !important',
            textShadow: '0 0 5px rgba(21, 101, 192, 0.3)',
        },
        '& .MuiFormLabel-root': {
            color: '#E91E63 !important',
            fontWeight: '700 !important',
            textShadow: '0 0 8px rgba(233, 30, 99, 0.5)',
        },
        '& .MuiFormLabel-root.Mui-focused': {
            color: '#2196F3 !important',
            textShadow: '0 0 12px rgba(33, 150, 243, 0.6)',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF1744 !important',
            borderWidth: '3px !important',
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF4569 !important',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2196F3 !important',
        },
        '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #FAFAFA inset !important',
            WebkitTextFillColor: '#1565C0 !important',
        },
        '@keyframes securityPulse': {
            '0%': {
                boxShadow: '0 0 15px rgba(255, 23, 68, 0.3)',
            },
            '100%': {
                boxShadow: '0 0 20px rgba(255, 23, 68, 0.5)',
            },
        },
    }
};

