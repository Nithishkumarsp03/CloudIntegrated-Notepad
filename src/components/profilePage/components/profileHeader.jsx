import React from 'react';
import { Box, Typography } from '@mui/material';
import { Check } from '@mui/icons-material';
import { ButtonComponent,cn } from '../../../components';
import BackArrow from '../../../assets/svgs/backArrow';

export const ProfileHeader = ({ darkMode, handleBack, handleSave, isSaved, isProfileLoading }) => {
    return (
        <Box className={cn(
            "mb-6 p-4 sm:p-6 rounded-xl shadow-lg flex items-center justify-between",
            darkMode ? "border border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800" : "border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50"
        )}>
            <Box className="flex items-center gap-4">
                <span className={cn('text-white cursor-pointer', {
                    'text-black': !darkMode
                })} onClick={handleBack}>
                    <BackArrow />
                </span>
                <Typography variant="h5" className={`font-bold ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
                    Profile Settings
                </Typography>
            </Box>
            <div className='hidden md:block'>
                <ButtonComponent
                loading={isProfileLoading}
                disabled={isSaved}
                btnText={'Save Changes'}
                startIcon={<Check />}
                styles={{ width: "fit-content" }}
                darkMode={darkMode}
                handleClick={handleSave}
                />
            </div>
        </Box>
    );
};