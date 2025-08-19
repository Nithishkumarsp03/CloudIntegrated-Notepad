import React from 'react';
import { Typography, Select, MenuItem } from '@mui/material';

const GenderSelect = ({ value, onChange, darkMode, isMobile }) => {
    return (
        <div className="mb-4 md:mb-6">
            <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                className={`font-medium mb-1 md:mb-3 ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}
            >
                Select your gender
            </Typography>
            <Typography
                className={`mb-2 md:mb-4 text-sm ${darkMode ? 'text-purple-300' : 'text-blue-600'} ${isMobile && 'hidden'}`}
            >
                This helps us customize your experience
            </Typography>

            <Select
                labelId="gender-label"
                value={value}
                displayEmpty
                size={isMobile ? "medium" : "large"}
                onChange={onChange}
                sx={{
                    width: "100%",
                    marginTop: "8px",
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: '2px solid',
                        borderColor: darkMode ? '#6D28D9' : '#0b6bcb',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: '2px solid',
                        borderColor: darkMode ? '#8B5CF6' : '#1a73e8',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: darkMode ? '#4C1D95 !important' : '#1557b0 !important'
                    },
                    color: darkMode ? "rgb(233, 213, 255)" : "black",
                    '& .MuiSelect-icon': {
                        color: darkMode ? "rgb(233, 213, 255)" : "#0b6bcb",
                    },
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            backgroundColor: darkMode ? "#374151" : "white",
                            borderRadius: "7px",
                            border: darkMode ? "1px solid #4B5563" : "1px solid #D1D5DB",
                            mt: "4px",
                            color: darkMode ? "rgb(233, 213, 255)" : "black"
                        },
                    },
                    MenuListProps: {
                        sx: {
                            padding: 0,
                        },
                    },
                }}
                className={`rounded-lg ${(darkMode ? 'bg-gray-800' : 'bg-white')}`}
            >
                <MenuItem value="" disabled hidden>Select gender</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Rather not say</MenuItem>
            </Select>
        </div>
    );
};

export default GenderSelect;
