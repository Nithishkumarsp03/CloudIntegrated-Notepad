import React from 'react';
import { Select, MenuItem } from '@mui/material';

export const FontSelector = ({
    value,
    onChange,
    fontOptions,
}) => {
    const darkMode = document.documentElement.classList.contains("dark");
    return (
        <Select
            classes={{ root: `h-full max-h-11 w-fit shadow-sm` }}
            sx={{
                borderRadius: "12px",
                backgroundColor: darkMode ? "#374151" : "white",
                color: darkMode ? "#E5E7EB" : "#1F2937",
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
                        backgroundColor: darkMode ? "#374151" : "white",
                        borderRadius: "7px",
                        border: darkMode ? "1px solid #4B5563" : "1px solid #D1D5DB",
                        mt: "-60px",
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
        >
            {fontOptions.map((font) => (
                <MenuItem
                    key={font.id}
                    value={font.family}
                    fontWeight={font.weight}
                    sx={{
                        fontSize: "16px",
                        padding: "8px",
                        fontFamily: font.family,
                        fontWeight: font.fontWeight,
                        backgroundColor: darkMode ? "#374151" : "white",
                        color: darkMode ? "#E5E7EB" : "#1F2937",
                        "&:hover": {
                            backgroundColor: darkMode ? "#4B5563" : "#F3F4F6",
                        },
                    }}
                >   
                    {font.name}
                </MenuItem>         
            ))}
        </Select>
    );
};

