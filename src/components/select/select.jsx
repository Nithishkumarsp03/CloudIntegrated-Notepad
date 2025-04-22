import React from 'react';
import { Select as MuiSelect, MenuItem, SelectChangeEvent } from '@mui/material';

const CustomSelect = ({
    options,
    value,
    onChange,
    width = '40',
    darkMode = false,
    placeholder = 'Select an option',
    label,
    isFontSelector = false,
    defaultFontFamily = 'Arial, sans-serif'
}) => {
    const currentFontFamily = isFontSelector
        ? options.find(option => option.value === value)?.fontFamily || defaultFontFamily
        : defaultFontFamily;

    return (
        <div>
            {label && (
                <label
                    style={{
                        color: darkMode ? '#E5E7EB' : '#1F2937',
                        marginBottom: '8px',
                        display: 'block'
                    }}
                >
                    {label}
                </label>
            )}
            <MuiSelect
                classes={{ root: `h-full max-h-11 w-full min-w-${width} max-w-${width} shadow-sm` }}
                sx={{
                    borderRadius: '12px',
                    fontFamily: currentFontFamily,
                    backgroundColor: darkMode ? '#374151' : 'white',
                    color: darkMode ? '#E5E7EB' : '#1F2937',
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '& .MuiSvgIcon-root': {
                        color: darkMode ? '#9CA3AF' : '#6B7280',
                    },
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            backgroundColor: darkMode ? '#374151' : 'white',
                            borderRadius: '7px',
                            border: darkMode ? '1px solid #4B5563' : '1px solid #D1D5DB',
                            mt: '-60px',
                        },
                    },
                    MenuListProps: {
                        sx: {
                            padding: 0,
                        },
                    },
                }}
                value={value}
                onChange={onChange}
                displayEmpty
            >
                {options.map((option) => (
                    <MenuItem
                        key={option.id}
                        value={option.value}           
                        sx={{
                            fontSize: '16px',
                            padding: '8px',
                            fontFamily: isFontSelector ? option.fontFamily : undefined,
                            fontWeight: isFontSelector ? option.fontWeight : undefined,
                            backgroundColor: darkMode ? '#374151' : 'white',
                            color: darkMode ? '#E5E7EB' : '#1F2937',
                            '&:hover': {
                                backgroundColor: darkMode ? '#4B5563' : '#F3F4F6',
                            },
                        }}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </MuiSelect>
        </div>
    );
};

export default CustomSelect;