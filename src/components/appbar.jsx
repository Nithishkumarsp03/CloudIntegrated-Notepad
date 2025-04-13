import React, { useRef, useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    useMediaQuery,
    Menu,
    MenuItem,
    Typography,
    Tooltip
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { FiMail, FiGithub, FiSave } from "react-icons/fi";
import useEditorStore from "../globalStore";
import { cn } from "./cn";
import logo from "../assets/logo.png";
import Customer from "../assets/svgs/customerIcon";
import { SearchIcon } from '../assets/svgs/searchIcon';
import { PanelLeftOpenIcon } from "../assets/svgs/leftSidebar";
import { PanelRightOpenIcon } from "../assets/svgs/rightSidebar";
import { ShareIcon } from "../assets/svgs/share";
import ShareModal from "./share";
import { SunIcon } from "../assets/svgs/sun";
import { MoonIcon } from "../assets/svgs/moon";
import SaveModal from "./saveModal";
import { SaveIcon } from '../assets/svgs/save';

const Appbar = () => {
    const [customerAnchorEl, setCustomerAnchorEl] = useState(null);
    const { setIsSideBarOpen, darkMode, setDarkMode, isUserLoggedIn, isSidebarOpen } = useEditorStore();
    const [share, setShare] = useState(false);
    const isMobile = useMediaQuery("(max-width:768px)");
    const searchRef = useRef(null);
    const [saveModal, setSaveModal] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
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

    const handleSave = () => {
        console.log("Saving current note...");
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
                boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
                backdropFilter: "blur(8px)",
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
                    <div className="flex items-center gap-4 md:gap-10 min-w-0">
                        <Tooltip title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}>
                            <span
                                className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                                onClick={setIsSideBarOpen}
                            >
                                {isSidebarOpen ?
                                    <PanelLeftOpenIcon />
                                    :
                                    <PanelRightOpenIcon />
                                }
                            </span>
                        </Tooltip>

                        {/* Search */}
                        <div
                            className="max-w-[300px] hidden md:block"
                            onMouseEnter={() => searchRef.current?.startAnimation()}
                            onMouseLeave={() => searchRef.current?.stopAnimation()}
                        >
                            <div className="flex items-center gap-3 min-w-0 flex-shrink flex-grow">
                                <SearchIcon
                                    className={cn(
                                        "text-gray-700 dark:text-gray-300",
                                        {
                                            "text-gray-700": !darkMode,
                                            "text-gray-300": darkMode,
                                        }
                                    )}
                                    ref={searchRef}
                                />
                                <input
                                    type="text"
                                    placeholder="Search Notes..."
                                    className={cn(
                                        "w-[100px] sm:min-w-[250px] sm:w-[250px] h-10 px-3 py-1.5",
                                        "bg-white dark:bg-gray-800 border-[1.5px]",
                                        "border-gray-200 dark:border-gray-700 rounded-3xl",
                                        "shadow-sm focus:outline-none text-sm font-normal font-sans",
                                        "focus:border-blue-500 dark:focus:border-purple-600 transition-colors",
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
                    <div className="flex justify-center w-full pl-0 md:pl-0">
                        <img src={logo} alt="logo" className="w-[90px] h-[50px] object-contain" />
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
                        {/* Save Button */}
                        <Tooltip title="Save Note">
                            <IconButton
                                onClick={() => setSaveModal(!saveModal)}
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
                            <SaveModal
                                isOpen={saveModal}
                                onClose={() => setSaveModal(false)}
                                onSave={() => console.log("Save")}
                            />
                        </Tooltip>

                        {/* Share Button */}
                        {isUserLoggedIn && (
                            <Tooltip title="Share">
                                <IconButton
                                    onClick={() => setShare(!share)}
                                    sx={{
                                        color: darkMode ? "#fff" : "#000",
                                        padding: "6px",
                                        flexShrink: 0,
                                        '&:hover': {
                                            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0)'
                                        }
                                    }}
                                >
                                    <ShareIcon size={20} />
                                </IconButton>
                            </Tooltip>
                        )}

                        {/* Dark Mode Toggle */}
                        <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
                            <IconButton
                                onClick={toggleDarkMode}
                                sx={{
                                    color: darkMode ? "#fff" : "#000",
                                    padding: "6px",
                                    flexShrink: 0,
                                    '&:hover': {
                                        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                                    }
                                }}
                            >
                                {darkMode ?
                                    <SunIcon fontSize={isMobile ? "small" : "medium"} size={20} /> :
                                    <MoonIcon fontSize={isMobile ? "small" : "medium"} size={20} />
                                }
                            </IconButton>
                        </Tooltip>

                        {/* Account Button */}
                        {isUserLoggedIn && (
                            <Tooltip title="Account">
                                <IconButton
                                    sx={{
                                        color: darkMode ? "#fff" : "#000",
                                        padding: "6px",
                                        flexShrink: 0,
                                        '&:hover': {
                                            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                                        }
                                    }}
                                >
                                    <AccountCircle fontSize={isMobile ? "small" : "medium"} />
                                </IconButton>
                            </Tooltip>
                        )}

                        {/* Customer Support Button */}
                        <Tooltip title="Contact Support">
                            <IconButton
                                onClick={handleCustomerMenuOpen}
                                sx={{
                                    color: darkMode ? "#fff" : "#000",
                                    padding: "6px",
                                    flexShrink: 0,
                                    marginLeft: "0",
                                    '&:hover': {
                                        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                                    }
                                }}
                            >
                                <Customer fontSize={isMobile ? "small" : "medium"} />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                {/* Mobile Search - Visible only on small screens */}
                <div className="w-full mt-2 md:hidden">
                    <div className="flex items-center gap-3 min-w-0">
                        <SearchIcon
                            className={cn(
                                "text-gray-700 dark:text-gray-300",
                                {
                                    "text-gray-700": !darkMode,
                                    "text-gray-300": darkMode,
                                }
                            )}
                        />
                        <input
                            type="text"
                            placeholder="Search Notes..."
                            className={cn(
                                "w-full h-9 px-3 py-1.5",
                                "bg-white dark:bg-gray-800 border-[1.5px]",
                                "border-gray-200 dark:border-gray-700 rounded-3xl",
                                "shadow-sm focus:outline-none text-sm font-normal font-sans",
                                "focus:border-blue-500 dark:focus:border-purple-600 transition-colors",
                                {
                                    "text-gray-700": !darkMode,
                                    "text-gray-300": darkMode,
                                }
                            )}
                            onChange={(e) => useEditorStore.getState().setSearch(e.target.value)}
                        />
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