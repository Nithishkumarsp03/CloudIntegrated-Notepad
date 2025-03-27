import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, useMediaQuery, Box } from "@mui/material";
import { AccountCircle, Brightness4, Brightness7 } from "@mui/icons-material";
import StyledTooltip from "./tooltop";
import useEditorStore from "../globalStore";
import { cn } from "./cn";
import HamburgerIcon from "../assets/svgs/hamburger";
import ShareComponent from "./share";
import { SearchIcon } from "../assets/svgs/searchIcon";

const Appbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const { setIsSideBarOpen, darkMode, setDarkMode } = useEditorStore();
    const open = Boolean(anchorEl);
    const isMobile = useMediaQuery('(max-width:768px)');

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

    // Toggle search bar visibility on mobile
    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    return (
        <AppBar
            position="static"
            sx={{
                width: '100vw',
                maxWidth: '100%',
                overflowX: 'hidden',
                background: darkMode
                    ? "linear-gradient(to top, #1f2937, #111827)"
                    : "linear-gradient(to top, #f3f4f6, #e5e7eb)",
                color: darkMode ? "#ffffff" : "#000000",
                boxShadow: "none",
            }}
        >
            <Toolbar sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'flex-start' : 'center',
                padding: isMobile ? '6px 12px' : '0 16px',
                width: '100%',
                maxWidth: '100%',
                overflowX: 'hidden',
                boxSizing: 'border-box'
            }}>
                {/* Top Row for Mobile */}
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxSizing: 'border-box'
                }}>
                    {/* Left Side: Hamburger Icon */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '40px',
                        minWidth: 0 // Prevents flex items from overflowing
                    }}>
                        <span
                            className="cursor-pointer text-gray-500 dark:text-gray-400"
                            onClick={setIsSideBarOpen}
                        >
                            <HamburgerIcon
                                fill={"transparent"}
                                stroke={darkMode ? "#ffffff" : "#000000"}
                                className={isMobile ? "h-6 w-6" : "h-8 w-8"}
                            />
                        </span>

                        {!isMobile && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    minWidth: 0,
                                    flexShrink: 1,
                                    flexGrow: 1,
                                    maxWidth: "300px", 
                                }}
                            >
                                <SearchIcon
                                    className={cn("w-5 h-5", {
                                        "text-gray-700": !darkMode,
                                        "text-gray-300": darkMode,
                                    })}
                                />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className={cn(
                                        "w-[100px] sm:min-w-[250px] sm:w-[250px] h-10 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-sm focus:outline-none text-sm font-normal font-sans focus:ring-1 focus:ring-gray-300 focus:border-gray-200",
                                        {
                                            "text-gray-700": !darkMode,
                                            "text-gray-300": darkMode,
                                        }
                                    )}
                                    onChange={(e) => useEditorStore.getState().setSearch(e.target.value)}
                                />
                            </Box>
                        )}

                    </Box>

                    {/* Center of Appbar: App Name - Only shown on mobile */}
                    {isMobile && (
                        <Box sx={{
                            flexGrow: 1,
                            textAlign: 'center',
                            minWidth: 0,
                            px: 1
                        }}>
                            <h1 className="text-sm font-bold text-gray-800 dark:text-gray-200 tracking-wide truncate">
                                Online Notepad
                            </h1>
                        </Box>
                    )}

                    {/* Right Side: Icons */}
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        flexShrink: 0
                    }}>
                        {isMobile && (
                            <IconButton
                                onClick={toggleSearch}
                                sx={{
                                    color: darkMode ? "#ffffff" : "#000000",
                                    padding: '6px',
                                    flexShrink: 0
                                }}
                            >
                                <SearchIcon
                                    className={cn("w-5 h-5", {
                                        "text-gray-700": !darkMode,
                                        "text-gray-300": darkMode,
                                    })}
                                />
                            </IconButton>
                        )}

                        <ShareComponent mobile={isMobile} />

                        <IconButton
                            onClick={toggleDarkMode}
                            sx={{
                                color: darkMode ? "#ffffff" : "#000000",
                                padding: '6px',
                                flexShrink: 0
                            }}
                        >
                            {darkMode ?
                                <Brightness7 fontSize={isMobile ? "small" : "medium"} /> :
                                <Brightness4 fontSize={isMobile ? "small" : "medium"} />}
                        </IconButton>

                        <IconButton
                            onClick={handleProfileMenuOpen}
                            sx={{
                                color: darkMode ? "#ffffff" : "#000000",
                                padding: '6px',
                                flexShrink: 0
                            }}
                        >
                            <AccountCircle fontSize={isMobile ? "small" : "medium"} />
                        </IconButton>
                    </Box>
                </Box>

                {/* Search bar for mobile - appears below when toggled */}
                {isMobile && showSearch && (
                    <Box sx={{
                        width: 'calc(100% - 24px)',
                        mt: 1.5,
                        mb: 1,
                        mx: 'auto',
                        boxSizing: 'border-box'
                    }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            className={cn(
                                "w-full px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-3xl shadow-sm focus:outline-none font-normal font-sans focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
                                {
                                    "text-gray-700": !darkMode,
                                    "text-gray-300": darkMode,
                                }
                            )}
                            onChange={(e) => useEditorStore.getState().setSearch(e.target.value)}
                        />
                    </Box>
                )}

                {/* Center of Appbar: App Name - Only shown on desktop */}
                {!isMobile && (
                    <Box sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 'auto',
                        maxWidth: '200px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200 tracking-wide">
                            Online Notepad
                        </h1>
                    </Box>
                )}

                {/* Profile Menu */}
                <Menu
                    id="profile-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleProfileMenuClose}
                    sx={{
                        "& .MuiPaper-root": {
                            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                            color: darkMode ? "#ffffff" : "#000000",
                        },
                    }}
                >
                    <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
                    <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Appbar;