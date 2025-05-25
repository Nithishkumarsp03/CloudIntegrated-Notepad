import React from 'react';
import { Box, Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { ButtonComponent, cn } from '../../../components';
import FormSection from './formSection';

export const AccountManagementSection = ({ darkMode, handleLogout }) => {
    return (
        <FormSection title="Account Management" darkMode={darkMode}>
            <Box className="p-5">
                <Box className={cn(
                    "p-4 rounded-lg border",
                    darkMode ? "bg-gray-700/50 border-gray-600" : "bg-gray-50 border-gray-200"
                )}>
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <Box>
                            <Typography className={`font-medium ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
                                Logout
                            </Typography>
                            <Typography variant="body2" className={darkMode ? 'text-purple-300' : 'text-blue-600'}>
                                Sign out from your account
                            </Typography>
                        </Box>
                        <ButtonComponent
                            btnText={'Logout'}
                            startIcon={<Logout />}
                            darkMode={darkMode}
                            styles={{ width: "fit-content" }}
                            handleClick={handleLogout}
                        />
                    </div>
                </Box>
            </Box>
        </FormSection>
    );
};
