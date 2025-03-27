import { Select, MenuItem, Popover, TextField, Button, useMediaQuery, Menu, IconButton } from "@mui/material";
import React, { useState } from "react";
import { fontFamilyOptions } from "../utils";
import EditorButton from "./editorButton";
import BoldIcon from "../assets/svgs/bold";
import Italics from "../assets/svgs/italics";
import Underline from "../assets/svgs/underline";
import LeftAlign from "../assets/svgs/leftAlign";
import RightAlign from "../assets/svgs/rightAlign";
import CenterAlign from "../assets/svgs/centerAlign";
import StrikeThrough from "../assets/svgs/strikeThrough";
import LinkIcon from "../assets/svgs/link";
import useEditorStore from "../globalStore";
import Undo from "../assets/svgs/undo";
import Redo from "../assets/svgs/redo";
import BulletList from "../assets/svgs/bulletList";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const EditorToolKit = ({ handleClick, fontStyle }) => {
    const [fontFamily, setFontFamily] = useState(fontFamilyOptions[0].family);
    const [anchorEl, setAnchorEl] = useState(null);
    const [linkUrl, setLinkUrl] = useState("");
    const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
    const open = Boolean(anchorEl);
    const mobileMenuOpen = Boolean(mobileMenuAnchor);
    const isMobile = useMediaQuery('(max-width: 768px)');

    const { darkMode, charactersTotalCount } = useEditorStore();

    const [activeStyles, setActiveStyles] = useState({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
        link: false,
        leftAlign: false,
        rightAlign: false,
        centerAlign: false,
        bulletList: false
    });

    const handleFont = (e) => {
        setFontFamily(e.target.value);
        fontStyle(e.target.value);
    };

    const handleLinkClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLinkSubmit = () => {
        if (linkUrl) {
            let processedUrl = linkUrl;
            if (!linkUrl.startsWith('http://') && !linkUrl.startsWith('https://')) {
                processedUrl = `https://${linkUrl}`;
            }
            handleClick(`link:${processedUrl}`);
        } else {
            handleClick("link:");
        }
        setLinkUrl("");
        setAnchorEl(null);
    };

    const handleClose = () => {
        setLinkUrl("");
        setAnchorEl(null);
    };

    const handleActive = (key) => {
        if (key === "link") return;

        setActiveStyles(prev => ({ ...prev, [key]: !prev[key] }));

        if (["leftAlign", "rightAlign", "centerAlign", "undo", "redo"].includes(key)) {
            handleClick(key);
            return;
        }

        handleClick(!activeStyles[key] ? key : `${key}Close`);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMenuAnchor(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMenuAnchor(null);
    };

    const editorButtons = [
        {
            id: 1,
            icon: <BoldIcon />,
            handleClick: () => handleActive("bold"),
            isActive: activeStyles.bold,
        },
        {
            id: 2,
            icon: <Underline />,
            handleClick: () => handleActive("underline"),
            isActive: activeStyles.underline,
        },
        {
            id: 3,
            icon: <LinkIcon />,
            handleClick: handleLinkClick,
            isActive: activeStyles.link,
        },
        {
            id: 4,
            icon: <StrikeThrough />,
            handleClick: () => handleActive("strikethrough"),
            isActive: activeStyles.strikethrough,
            classes: { padding: "8px 6px" }
        },
        {
            id: 6,
            icon: <BulletList />,
            handleClick: () => handleActive("bulletList"),
            classes: { padding: "8px 6px" }
        },
        {
            id: 7,
            icon: <LeftAlign />,
            handleClick: () => handleActive("leftAlign"),
            isActive: activeStyles.leftAlign,
            classes: { padding: "8px 6px" }
        },
        {
            id: 8,
            icon: <CenterAlign />,
            handleClick: () => handleActive("centerAlign"),
            isActive: activeStyles.centerAlign,
            classes: { padding: "8px 6px" }
        },
        {
            id: 9,
            icon: <RightAlign />,
            handleClick: () => handleActive("rightAlign"),
            isActive: activeStyles.rightAlign,
            classes: { padding: "8px 6px" }
        },
        {
            id: 10,
            icon: <Undo />,
            handleClick: () => handleActive("undo"),
            classes: { padding: "8px 6px" }
        },
        {
            id: 11,
            icon: <Redo />,
            handleClick: () => handleActive("redo"),
            classes: { padding: "8px 6px" }
        },
    ];

    return (
        <div className={`p-2 rounded-2xl flex justify-between shadow-md ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            {/* Desktop Layout (unchanged) */}
            <div className="hidden md:flex gap-10">
                <Select
                    classes={{ root: "h-full max-h-11 w-full min-w-40 max-w-40 shadow-sm" }}
                    sx={{
                        borderRadius: "12px",
                        fontFamily: fontFamily,
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
                    value={fontFamily}
                    onChange={handleFont}
                >
                    {fontFamilyOptions.map((family) => (
                        <MenuItem
                            key={family.id}
                            value={family.family}
                            sx={{
                                fontSize: "16px",
                                padding: "8px",
                                fontFamily: family.family,
                                backgroundColor: darkMode ? "#374151" : "white",
                                color: darkMode ? "#E5E7EB" : "#1F2937",
                                "&:hover": {
                                    backgroundColor: darkMode ? "#4B5563" : "#F3F4F6",
                                },
                            }}
                        >
                            {family.name}
                        </MenuItem>
                    ))}
                </Select>
                <div className="flex gap-10">
                    {editorButtons.map((val) => (
                        <EditorButton
                            key={val.id}
                            btnText={val.icon}
                            handleClick={val.handleClick}
                            isActive={val.isActive}
                            classes={val?.classes}
                        />
                    ))}
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="flex md:hidden w-full justify-between items-center">
                <Select
                    classes={{ root: "h-full max-h-11 w-full max-w-[120px] shadow-sm" }}
                    sx={{
                        borderRadius: "12px",
                        fontFamily: fontFamily,
                        backgroundColor: darkMode ? "#374151" : "white",
                        color: darkMode ? "#E5E7EB" : "#1F2937",
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                        "& .MuiSvgIcon-root": {
                            color: darkMode ? "#9CA3AF" : "#6B7280",
                        },
                    }}
                    value={fontFamily}
                    onChange={handleFont}
                >
                    {fontFamilyOptions.map((family) => (
                        <MenuItem
                            key={family.id}
                            value={family.family}
                            sx={{
                                fontSize: "14px",
                                padding: "6px",
                                fontFamily: family.family,
                            }}
                        >
                            {family.name}
                        </MenuItem>
                    ))}
                </Select>

                <div className="flex gap-2">
                    {editorButtons.slice(0, 3).map((val) => (
                        <EditorButton
                            key={val.id}
                            btnText={val.icon}
                            handleClick={val.handleClick}
                            isActive={val.isActive}
                            size="small"
                        />
                    ))}
                </div>

                <IconButton
                    onClick={handleMobileMenuOpen}
                    sx={{
                        color: darkMode ? "#E5E7EB" : "#1F2937",
                        padding: "8px"
                    }}
                >
                    <MoreHorizIcon />
                </IconButton>

                <Menu
                    anchorEl={mobileMenuAnchor}
                    open={mobileMenuOpen}
                    onClose={handleMobileMenuClose}
                    PaperProps={{
                        sx: {
                            backgroundColor: darkMode ? "#374151" : "white",
                            minWidth: '180px'
                        }
                    }}
                >
                    {editorButtons.slice(3).map((val) => (
                        <MenuItem
                            key={val.id}
                            onClick={() => {
                                val.handleClick();
                                handleMobileMenuClose();
                            }}
                            sx={{
                                padding: '8px 16px',
                                fontSize: '14px'
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-gray-600 dark:text-gray-300">
                                    {val.icon}
                                </span>
                                <span className="text-sm">
                                    {val.id === 4 && "Strikethrough"}
                                    {val.id === 6 && "List"}
                                    {val.id === 7 && "Left Align"}
                                    {val.id === 8 && "Center"}
                                    {val.id === 9 && "Right Align"}
                                    {val.id === 10 && "Undo"}
                                    {val.id === 11 && "Redo"}
                                </span>
                            </div>
                        </MenuItem>
                    ))}
                </Menu>
            </div>

            {/* Link Popover (shared between desktop and mobile) */}
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                PaperProps={{
                    sx: {
                        p: 2,
                        backgroundColor: darkMode ? "#374151" : "white",
                        color: darkMode ? "#E5E7EB" : "#1F2937",
                        width: isMobile ? '90%' : 300,
                        maxWidth: '90vw',
                    }
                }}
            >
                <div className="flex flex-col gap-2">
                    <TextField
                        autoFocus
                        label="Enter URL"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        sx={{
                            '& .MuiInputBase-root': {
                                color: darkMode ? "#E5E7EB" : "#1F2937",
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: darkMode ? "#4B5563" : "#D1D5DB",
                                },
                                '&:hover fieldset': {
                                    borderColor: darkMode ? "#6B7280" : "#9CA3AF",
                                },
                            },
                        }}
                    />
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="text"
                            onClick={handleClose}
                            sx={{ color: darkMode ? "#9CA3AF" : "#6B7280" }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleLinkSubmit}
                            sx={{
                                backgroundColor: darkMode ? "#6D28D9" : "#7C3AED",
                                '&:hover': {
                                    backgroundColor: darkMode ? "#5B21B6" : "#6D28D9",
                                }
                            }}
                        >
                            Apply
                        </Button>
                    </div>
                </div>
            </Popover>
        </div>
    );
};

export default EditorToolKit;