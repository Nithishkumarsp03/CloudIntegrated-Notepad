import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { SunIcon } from "../../../assets/svgs/sun";
import { MoonIcon } from "../../../assets/svgs/moon";
import { ShareIcon } from "../../../assets/svgs/share";
import { SaveIcon } from '../../../assets/svgs/save';

export const MobileMenu = ({
    anchorEl,
    isOpen,
    onClose,
    darkMode,
    toggleDarkMode,
    handleShareClick,
    handleSaveClick
}) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={onClose}
            PaperProps={{
                sx: {
                    backgroundColor: darkMode ? "#374151" : "#FFFFFF",
                    color: darkMode ? "#E5E7EB" : "#1F2937",
                    borderRadius: "12px",
                    border: darkMode ? "1px solid #4B5563" : "1px solid #E5E7EB",
                    boxShadow: darkMode
                        ? "0px 4px 6px -1px rgba(0, 0, 0, 0.5), 0px 2px 4px -1px rgba(0, 0, 0, 0.3)"
                        : "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    minWidth: "180px"
                }
            }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <MenuItem onClick={toggleDarkMode} sx={{ minHeight: 'auto', padding: '8px 16px' }}>
                <div className="flex items-center gap-2">
                    {darkMode ?
                        <SunIcon className="w-4 h-4" size={16} /> :
                        <MoonIcon className="w-4 h-4" size={16} />
                    }
                    <span>{darkMode ? "Light" : "Dark"} Mode</span>
                </div>
            </MenuItem>

            <MenuItem onClick={handleShareClick} sx={{ minHeight: 'auto', padding: '8px 16px' }}>
                <div className="flex items-center gap-2">
                    <ShareIcon size={16} />
                    <span>Share</span>
                </div>
            </MenuItem>

            <MenuItem onClick={handleSaveClick} sx={{ minHeight: 'auto', padding: '8px 16px' }}>
                <div className="flex items-center gap-2">
                    <SaveIcon size={16} />
                    <span>Save</span>
                </div>
            </MenuItem>
        </Menu>
    );
};
