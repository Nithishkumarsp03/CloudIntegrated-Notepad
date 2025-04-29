import React from 'react';
import { Select as MuiSelect, MenuItem } from '@mui/material';

const CustomSelect = ({
    options,
    value,
    onChange,
    width = '160px',
    label,
}) => {
    const darkMode = document.documentElement.classList.contains("dark");
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
                sx={{
                    minWidth: width,
                    maxWidth: width,
                    height: '44px',
                    borderRadius: "12px",
                    backgroundColor: darkMode ? "#374151" : "#ffffff",
                    color: darkMode ? "#E5E7EB" : "#1F2937",
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                    },
                    "& .MuiSvgIcon-root": {
                        color: darkMode ? "#9CA3AF" : "#6B7280",
                    },
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            backgroundColor: darkMode ? "#374151" : "#ffffff",
                            borderRadius: "7px",
                            border: darkMode ? "1px solid #4B5563" : "1px solid #D1D5DB",
                            mt: "-70px",
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
                            fontSize: "16px",
                            padding: "8px",
                            backgroundColor: darkMode ? "#374151" : "#ffffff !important",
                            color: darkMode ? "#E5E7EB" : "#1F2937",
                            "&:hover": {
                                backgroundColor: darkMode ? "#4B5563" : "#F3F4F6",
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
