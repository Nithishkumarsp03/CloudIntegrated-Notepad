import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    useMediaQuery,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";
import { AccountCircle, Brightness4, Brightness7, ShareSharp } from "@mui/icons-material";
import { FiMail, FiGithub } from "react-icons/fi";
import useEditorStore from "../globalStore";
import { cn } from "./cn";
import HamburgerIcon from "../assets/svgs/hamburger";
import { SearchIcon } from "../assets/svgs/searchIcon";
import logo from "../assets/logo.png";
import Customer from "../assets/svgs/customerIcon";
import ShareModal from "./share";
import ShareIcon from "../assets/svgs/share";

const Appbar = () => {
    const [customerAnchorEl, setCustomerAnchorEl] = useState(null);
    const { setIsSideBarOpen, darkMode, setDarkMode, isUserLoggedIn } = useEditorStore();
    const [share, setShare] = useState(false);
    const isMobile = useMediaQuery("(max-width:768px)");

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark");
    };

    const teamMembers = [
        {
            name: "Guna Nihil N",
            email: "gunanihil3@gamil.com",
            github: "guna2341",
            role: "Frontend Developer"
        },
        {
            name: "Nithish Kumar S P",
            email: "nithishkumar@gmail.com",
            github: "Nithishkumarsp03",
            role: "Backend Developer"
        }
    ];

    const handleCustomerMenuOpen = (event) => {
        setCustomerAnchorEl(event.currentTarget);
    };

    const handleCustomerMenuClose = () => {
        setCustomerAnchorEl(null);
    };

    const handleEmailClick = (email) => {
        window.location.href = `mailto:${email}`;
        handleCustomerMenuClose();
    };

    const handleGithubClick = (username) => {
        window.open(`https://github.com/${username}`, '_blank');
        handleCustomerMenuClose();
    };

    return (
        <AppBar
            position="static"
            sx={{
                width: "100vw",
                overflow: "hidden",
                maxWidth: "100%",
                background: darkMode
                    ? "linear-gradient(to top, #1f2937, #111827)"
                    : "linear-gradient(to top, #f3f4f6, #e5e7eb)",
                color: darkMode ? "#ffffff" : "#000000",
                boxShadow: "none",
            }}
        >
            <Toolbar
                className={cn(
                    "flex w-full max-w-full box-border overflow-x-hidden",
                    isMobile ? "flex-col items-start p-2" : "flex-row justify-between items-center px-4"
                )}
            >
                <div className="flex justify-between items-center w-full box-border">
                    {/* Left Section */}
                    <div className="flex items-center gap-10 min-w-0">
                        <span
                            className="cursor-pointer text-gray-500 dark:text-gray-400"
                            onClick={setIsSideBarOpen}
                        >
                            <HamburgerIcon
                                fill="transparent"
                                stroke={darkMode ? "#ffffff" : "#000000"}
                                className={isMobile ? "h-6 w-6" : "h-8 w-8"}
                            />
                        </span>

                        {/* Search */}
                        <div className="max-w-[300px] hidden md:block">
                            <div className="flex items-center gap-3 min-w-0 flex-shrink flex-grow">
                                <SearchIcon
                                    className={cn("w-6 h-6", {
                                        "text-gray-700": !darkMode,
                                        "text-gray-300": darkMode,
                                    })}
                                />
                                <input
                                    type="text"
                                    placeholder="Search Notes..."
                                    className={cn(
                                        "w-[100px] dark:focus:border-purple-600 sm:min-w-[250px] sm:w-[250px] h-10 px-3 py-1.5 bg-white dark:bg-gray-800 border-[1.5px] border-gray-200 dark:border-gray-700 rounded-3xl shadow-sm focus:outline-none text-sm font-normal font-sans",
                                        {
                                            "text-gray-700": !darkMode,
                                            "text-gray-300": darkMode,
                                        }
                                    )}
                                    onChange={(e) => useEditorStore.getState().setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Center Logo */}
                    <div className="flex justify-center w-full">
                        <img src={logo} alt="logo" className="w-[90px] h-[50px]" />
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {isUserLoggedIn &&
                            <span className="text-black dark:text-white cursor-pointer" onClick={() => setShare(!share)}>
                                <ShareIcon />
                            </span>
                        }
                        {/* Dark Mode Toggle */}
                        <IconButton
                            onClick={toggleDarkMode}
                            sx={{ color: darkMode ? "#fff" : "#000", padding: "6px", flexShrink: 0 }}
                        >
                            {darkMode ?
                                <Brightness7 fontSize={isMobile ? "small" : "medium"} /> :
                                <Brightness4 fontSize={isMobile ? "small" : "medium"} />
                            }
                        </IconButton>

                        {/* Account Button */}
                        {isUserLoggedIn &&
                            <IconButton
                                sx={{ color: darkMode ? "#fff" : "#000", padding: "6px", flexShrink: 0 }}
                            >
                                <AccountCircle fontSize={isMobile ? "small" : "medium"} />
                            </IconButton>
                        }

                        {/* Customer Support Button */}
                        <IconButton
                            onClick={handleCustomerMenuOpen}
                            sx={{ color: darkMode ? "#fff" : "#000", padding: "6px", flexShrink: 0 }}
                        >
                            <Customer fontSize={isMobile ? "small" : "medium"} />
                        </IconButton>
                    </div>
                </div>
            </Toolbar>

            {/* Customer Support Menu */}
            <Menu
                anchorEl={customerAnchorEl}
                open={Boolean(customerAnchorEl)}
                onClose={handleCustomerMenuClose}
                PaperProps={{
                    sx: {
                        backgroundColor: darkMode ? "#374151" : "#FFFFFF",
                        color: darkMode ? "#E5E7EB" : "#1F2937",
                        borderRadius: "12px",
                        border: darkMode ? "1px solid #4B5563" : "1px solid #E5E7EB",
                        boxShadow: darkMode
                            ? "0px 4px 6px -1px rgba(0, 0, 0, 0.5), 0px 2px 4px -1px rgba(0, 0, 0, 0.3)"
                            : "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        p: 2,
                        minWidth: "280px",
                        maxWidth: "320px"
                    }
                }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <div className="px-2 py-1">
                    <div className="mb-3">
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 600,
                                color: darkMode ? "#F3F4F6" : "#111827",
                                fontSize: "0.875rem"
                            }}
                        >
                            Contact Our Team
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: darkMode ? "#9CA3AF" : "#6B7280",
                                fontSize: "0.75rem"
                            }}
                        >
                            Reach out to us for any questions or support
                        </Typography>
                    </div>

                    <div className="space-y-3">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 500,
                                                color: darkMode ? "#E5E7EB" : "#1F2937",
                                                fontSize: "0.8125rem"
                                            }}
                                        >
                                            {member.name}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: darkMode ? "#9CA3AF" : "#6B7280",
                                                fontSize: "0.6875rem"
                                            }}
                                        >
                                            {member.role}
                                        </Typography>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <MenuItem
                                        onClick={() => handleEmailClick(member.email)}
                                        sx={{
                                            borderRadius: "6px",
                                            fontSize: '0.75rem',
                                            color: darkMode ? '#93C5FD' : '#1D4ED8',
                                            padding: '6px 8px',
                                            minHeight: 'auto',
                                            '&:hover': {
                                                backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(29, 78, 216, 0.05)'
                                            }
                                        }}
                                    >
                                        <FiMail className="mr-2 h-3.5 w-3.5" />
                                        {member.email}
                                    </MenuItem>

                                    <MenuItem
                                        onClick={() => handleGithubClick(member.github)}
                                        sx={{
                                            borderRadius: "6px",
                                            fontSize: '0.75rem',
                                            color: darkMode ? '#D8B4FE' : '#7E22CE',
                                            padding: '6px 8px',
                                            minHeight: 'auto',
                                            '&:hover': {
                                                backgroundColor: darkMode ? 'rgba(168, 85, 247, 0.1)' : 'rgba(126, 34, 206, 0.05)'
                                            }
                                        }}
                                    >
                                        <FiGithub className="mr-2 h-3.5 w-3.5" />
                                        github.com/{member.github}
                                    </MenuItem>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Menu>
            <ShareModal
                isOpen={share}
                onClose={() => setShare(!share)}
            />
        </AppBar>
    );
};

export default Appbar;