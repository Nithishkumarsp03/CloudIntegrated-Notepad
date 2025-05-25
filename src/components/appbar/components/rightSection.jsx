import React from "react";
import { IconButton } from "@mui/material";
import { AccountCircle, MoreVert } from "@mui/icons-material";
import { Customer, SaveIcon, ShareIcon, MoonIcon, SunIcon } from "../../../assets";
import { useNavigate } from "react-router-dom";

export const RightSection = ({
    isMobile,
    darkMode,
    toggleDarkMode,
    handleShareClick,
    handleSaveClick,
    handleMobileMenuOpen,
    handleCustomerMenuOpen
}) => {
    const navigate = useNavigate();

    const handleProfile = () => {
        navigate('/profile');
    };

    return (
        <div className="flex items-center gap-0 md:gap-2 flex-shrink-0">
            {isMobile ? (
                <MobileButtons
                    darkMode={darkMode}
                    handleMobileMenuOpen={handleMobileMenuOpen}
                    handleProfile={handleProfile}
                    handleCustomerMenuOpen={handleCustomerMenuOpen}
                />
            ) : (
                <DesktopButtons
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    handleShareClick={handleShareClick}
                    handleSaveClick={handleSaveClick}
                    handleProfile={handleProfile}
                    handleCustomerMenuOpen={handleCustomerMenuOpen}
                />
            )}
        </div>
    );
};

const MobileButtons = ({ darkMode, handleMobileMenuOpen, handleProfile, handleCustomerMenuOpen }) => (
    <>
        <IconButton
            onClick={handleMobileMenuOpen}
            sx={{ color: darkMode ? "#fff" : "#000", padding: "6px", flexShrink: 0 }}
        >
            <MoreVert fontSize="medium" />
        </IconButton>

        <IconButton
            onClick={handleProfile}
            sx={{ color: darkMode ? "#fff" : "#000", padding: "6px", flexShrink: 0 }}
        >
            <AccountCircle fontSize="small" />
        </IconButton>

        <IconButton
            onClick={handleCustomerMenuOpen}
            sx={{ color: darkMode ? "#fff" : "#000", padding: "6px", flexShrink: 0, marginLeft: "4px" }}
        >
            <Customer fontSize="medium" />
        </IconButton>
    </>
);

const DesktopButtons = ({
    darkMode,
    toggleDarkMode,
    handleShareClick,
    handleSaveClick,
    handleProfile,
    handleCustomerMenuOpen
}) => (
    <>
        <IconButton
            onClick={toggleDarkMode}
            sx={{ color: darkMode ? "#fff" : "#000", padding: "6px", flexShrink: 0 }}
        >
            {darkMode ?
                <SunIcon fontSize="medium" size={20} /> :
                <MoonIcon fontSize="medium" size={20} />
            }
        </IconButton>

        <span
            className="text-black dark:text-white cursor-pointer"
            onClick={handleShareClick}
        >
            <ShareIcon size={20} />
        </span>

        <IconButton
            onClick={handleSaveClick}
            sx={{
                color: darkMode ? "#fff" : "#000",
                padding: "6px",
                flexShrink: 0,
                '&:hover': {
                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0)'
                }
            }}
        >
            <SaveIcon size={20} />
        </IconButton>

        <IconButton
            sx={{ color: darkMode ? "#fff" : "#000", padding: "6px", flexShrink: 0 }}
            onClick={handleProfile}
        >
            <AccountCircle fontSize="medium" />
        </IconButton>

        <IconButton
            onClick={handleCustomerMenuOpen}
            sx={{ color: darkMode ? "#fff" : "#000", padding: "6px", flexShrink: 0, marginLeft: "7px" }}
        >
            <Customer fontSize="medium" />
        </IconButton>
    </>
);
