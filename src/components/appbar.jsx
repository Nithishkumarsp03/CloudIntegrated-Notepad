import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle, Brightness4, Brightness7 } from "@mui/icons-material";
import StyledTooltip from "./tooltop";
import useEditorStore from "../globalStore";
import { cn } from "./cn";
import HamburgerIcon from "../assets/svgs/hamburger";
import SearchIcon from "../assets/svgs/searchIcon";
import ShareComponent from "./share";

const Appbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { setIsSideBarOpen, darkMode, setDarkMode } = useEditorStore();
    const open = Boolean(anchorEl);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark");
    };

    // Handle profile menu open
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Handle profile menu close
    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="static"
            sx={{
                minWidth:'100%',
                background: darkMode
                    ? "linear-gradient(to top, #1f2937, #111827)" // Dark mode gradient
                    : "linear-gradient(to top, #f3f4f6, #e5e7eb)", // Light mode gradient
                color: darkMode ? "#ffffff" : "#000000",
                boxShadow: "none",
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Left Side: Hamburger Icon and Search Bar */}
                <div className="items-center flex gap-[20px] justify-start">
                    <span
                        className="cursor-pointer w-full text-gray-500 dark:text-gray-400"
                        onClick={setIsSideBarOpen}
                    >
                            <HamburgerIcon
                                fill={"transparent"}
                                stroke={darkMode ? "#ffffff" : "#000000"} // Dynamic stroke color
                                className="h-8 w-8"
                            />
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-3 ml-5">
                        <SearchIcon
                            className={cn("w-6 h-6", {
                                "text-gray-700": !darkMode, // Light mode color
                                "text-gray-300": darkMode, // Dark mode color
                            })}
                        />
                        <input
                            type="text"
                            placeholder="Search..."
                            className={cn(
                                "min-w-[250px] px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-3xl shadow-sm focus:outline-none text-base font-normal font-sans focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
                                {
                                    "text-gray-700": !darkMode, // Light mode text color
                                    "text-gray-300": darkMode, // Dark mode text color
                                }
                            )}
                            onChange={(e) => useEditorStore.getState().setSearch(e.target.value)} // Update search term in the store
                        />
                    </span>
                </div>

                {/* Center of Appbar: App Name */}
                <div className="mr-[160px]">
                    <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200 tracking-wide">
                        Online Notepad
                    </h1>
                </div>

                {/* Right Side: Dark Mode Toggle and Profile Icon */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>

                    {/* Share component */}
                    <ShareComponent/>
                    
                    {/* Dark Mode Toggle Button */}
                    <IconButton
                        onClick={toggleDarkMode}
                        sx={{ color: darkMode ? "#ffffff" : "#000000" }}
                    >
                        {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>

                    {/* Profile Icon */}
                    <IconButton
                        onClick={handleProfileMenuOpen}
                        sx={{ color: darkMode ? "#ffffff" : "#000000" }}
                    >
                        <AccountCircle />
                    </IconButton>

                    {/* Profile Menu */}
                    <Menu
                        id="profile-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleProfileMenuClose}
                        sx={{
                            "& .MuiPaper-root": {
                                backgroundColor: darkMode ? "#1f2937" : "#ffffff", // Tailwind's gray-800 and white
                                color: darkMode ? "#ffffff" : "#000000", // Tailwind's white and black
                            },
                        }}
                    >
                        <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
                        <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Appbar;