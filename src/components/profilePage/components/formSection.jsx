import React from 'react';
import { Box, Typography } from '@mui/material';

const FormSection = ({ title, children, darkMode }) => {
    return (
        <Box className="mb-8 flex flex-col gap-1">
            <Typography className={`mb-4 font-semibold text-lg relative inline-block ${darkMode ? 'text-purple-200' : 'text-blue-700'}`}>
                {title}
            </Typography>
            <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800/50' : 'bg-white'} shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                {children}
            </div>
        </Box>
    );
};

export default FormSection;