import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { ShareIcon } from "../../../assets/svgs/share";
import { SaveIcon } from '../../../assets/svgs/save';
import { AccountCircle, DarkMode, LightMode } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

export const MobileMenu = ({
    anchorEl,
    isOpen,
    onClose,
    darkMode,
    toggleDarkMode,
    handleShareClick,
    handleSaveClick,
}) => {
    const navigate = useNavigate();
    const params = useParams();
    function handleProfileClick() {
        navigate('/profile');
    }
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
            <MenuItem onClick={toggleDarkMode} sx={{ minHeight: 'auto' }}>
                <div className="flex items-center gap-2 text-md pl-2">
                    {darkMode ?
                        <DarkMode className="text-white w-3 h-3"/> :
                        <LightMode className="w-3 h-3 text-black" />
                    }
                    <span className="pl-1">{darkMode ? "Light" : "Dark"} Mode</span>
                </div>
            </MenuItem>
            {params?.id &&
                <MenuItem onClick={handleShareClick} sx={{ minHeight: 'auto' }}>
                    <div className="flex items-center gap-2 text-md pl-0.5">
                        <ShareIcon size={16} />
                        <span className="pl-[1px]">Share</span>
                    </div>
                </MenuItem>
            }

            <MenuItem onClick={handleSaveClick} sx={{ minHeight: 'auto'}}>
                <div className="flex items-center gap-2 text-md pl-[1px]">
                    <SaveIcon size={16} />
                    <span className="ml-[-2px]">Download</span>
                </div>
            </MenuItem>

            <MenuItem onClick={handleProfileClick} sx={{ minHeight: 'auto' }}>
                <div className="flex items-center gap-2 text-md pl-[9px]">
                    <AccountCircle fontSize="small" />
                <span className="pl-1.5">Profile</span>
                </div>
            </MenuItem>

        </Menu>
    );
};
