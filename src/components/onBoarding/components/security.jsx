import React from 'react';
import { Typography, Box, FormControlLabel } from '@mui/material';
import { Security } from '@mui/icons-material';
import { cn } from '../../cn';
import { ProfileSwitch } from '../../switch';

const SecuritySettings = ({ twoFa, onTwoFaChange, darkMode, isMobile }) => {
    return (
        <div className="mb-4 md:mb-6">
            <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                className={`font-medium mb-1 md:mb-3 ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}
            >
                Security Options
            </Typography>
            <Typography
                className={`mb-2 md:mb-4 text-sm ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}
            >
                Configure additional security settings for your account
            </Typography>

            <Box className={cn(
                "p-3 md:p-4 rounded-lg mb-3 md:mb-4 border transition-all duration-300 mt-2",
                twoFa
                    ? darkMode ? "bg-purple-900/20 border-purple-700" : "bg-blue-50 border-blue-200"
                    : darkMode ? "bg-gray-700/50 border-gray-600" : "bg-gray-50 border-gray-200"
            )}>
                <FormControlLabel
                    control={
                        <ProfileSwitch
                            className="mr-1.5 ml-0.5"
                            checked={twoFa}
                            onChange={onTwoFaChange}
                        />
                    }
                    label={
                        <Box>
                            <Typography className={`font-medium text-sm md:text-base ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
                                Two-Factor Authentication
                            </Typography>
                            <Typography variant="body2" className={`text-xs md:text-sm ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}>
                                Add an extra layer of security to protect your account
                            </Typography>
                        </Box>
                    }
                />

                {twoFa && (
                    <Box className={cn(
                        "mt-3 md:mt-4 pt-3 md:pt-4 border-t",
                        darkMode ? "border-purple-700/50" : "border-blue-200"
                    )}>
                        <div className={cn(
                            "p-2 md:p-4 rounded-lg",
                            darkMode ? "bg-purple-900/20 text-purple-200" : "bg-blue-50 text-blue-700"
                        )}>
                            <div className="flex items-center">
                                <Security className="mr-2" fontSize={isMobile ? "small" : "medium"} />
                                <Typography variant="body2" className="font-medium text-xs md:text-sm">
                                    Two-factor authentication will be enabled
                                </Typography>
                            </div>
                            <Typography variant="body2" className={`mt-1 md:mt-2 text-xs md:text-sm ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}>
                                Your account will be protected with an additional layer of security.
                                You'll set up an authenticator app to generate verification codes when signing in.
                            </Typography>
                        </div>
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default SecuritySettings;
