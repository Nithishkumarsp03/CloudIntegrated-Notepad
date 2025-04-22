import { Select, MenuItem, Menu, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { fontFamilyOptions, fontSizes } from "../../utils";
import BoldIcon from "../../assets/svgs/bold";
import Underline from "../../assets/svgs/underline";
import LeftAlign from "../../assets/svgs/leftAlign";
import RightAlign from "../../assets/svgs/rightAlign";
import CenterAlign from "../../assets/svgs/centerAlign";
import StrikeThrough from "../../assets/svgs/strikeThrough";
import LinkIcon from "../../assets/svgs/link";
import useEditorStore from "../../store/globalStore";
import Undo from "../../assets/svgs/undo";
import Redo from "../../assets/svgs/redo";
import BulletList from "../../assets/svgs/bulletList";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TextColor from "../../assets/svgs/textColor";
import Modal from "../modal/modal";
import EditorButton from "./editorButton";

const DEFAULT_FONT_FAMILY = 'Times New Roman, serif';
const DEFAULT_FONT_SIZE = '16px';

const EditorToolKit = ({ handleClick, fontStyle }) => {
    const [fontFamily, setFontFamily] = useState(DEFAULT_FONT_FAMILY);
    const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
    const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
    const mobileMenuOpen = Boolean(mobileMenuAnchor);
    const [linkModel, setLinkModel] = useState(false);
    const { darkMode } = useEditorStore();

    const textColorRef = useRef(null);
    const [activeStyles, setActiveStyles] = useState({
        bold: false,
        underline: false,
        strikethrough: false,
        leftAlign: false,
        rightAlign: false,
        centerAlign: false,
        bulletList: false,
    });
    const [textColor, setTextColor] = useState(darkMode ? 'white' : 'black');

    useEffect(() => {
        setFontFamily(DEFAULT_FONT_FAMILY);
        setFontSize(DEFAULT_FONT_SIZE);

        const family = fontFamilyOptions.find(font => font.family === DEFAULT_FONT_FAMILY) || {
            family: DEFAULT_FONT_FAMILY,
            fontWeight: 'normal'
        };
        if (fontSize) {
            fontStyle(family);
        }
        if (handleClick) {
            handleClick({ fontSize: DEFAULT_FONT_SIZE });
        }
    }, []);

    const handleFont = (e) => {
        const newFamily = e.target.value;
        setFontFamily(newFamily);

        const family = fontFamilyOptions.find(font => font.family === newFamily) || {
            family: newFamily,
            fontWeight: 'normal'
        };

        fontStyle(family);
    };

    const handleFontSize = (e) => {
        const newSize = e.target.value;
        setFontSize(newSize);
        handleClick({ fontSize: newSize });
    };

    const handleLink = () => {
        setLinkModel(!linkModel);
    }

    const handleLinkSubmit = (e) => {
        if (e && e.url) {
            handleClick({ link: e.url, text: e.text || e.url });
            setLinkModel(false);
        }
    };

    const handleColor = (color) => {
        if (color) {
            handleClick({ color: color });
            setTextColor(color);
        }
    };

    const handleActive = (key) => {
        if (!key) return;

        setActiveStyles(prev => ({ ...prev, [key]: !prev[key] }));

        if (key === "textColor") {
            textColorRef.current?.click();
            return;
        }

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
            name: "Bold",
            icon: <BoldIcon />,
            handleClick: () => handleActive("bold"),
            isActive: activeStyles.bold,
        },
        {
            id: 2,
            name: "UnderLine",
            icon: <Underline />,
            handleClick: () => handleActive("underline"),
            isActive: activeStyles.underline,
        },
        {
            id: 3,
            name: "Link",
            icon: <LinkIcon />,
            handleClick: () => handleLink(),
            isActive: activeStyles.link,
        },
        {
            id: 4,
            name: "StrikeThrough",
            icon: <StrikeThrough />,
            handleClick: () => handleActive("strikethrough"),
            isActive: activeStyles.strikethrough,
            classes: { padding: "8px 6px" }
        },
        {
            id: 6,
            name: "BulletList",
            icon: <BulletList />,
            handleClick: () => handleActive("bulletList"),
            isActive: activeStyles.bulletList,
            classes: { padding: "8px 6px" }
        },
        {
            id: 7,
            name: "Left Align",
            icon: <LeftAlign />,
            handleClick: () => handleActive("leftAlign"),
            isActive: activeStyles.leftAlign,
            classes: { padding: "8px 6px" }
        },
        {
            id: 8,
            name: "Center Align",
            icon: <CenterAlign />,
            handleClick: () => handleActive("centerAlign"),
            isActive: activeStyles.centerAlign,
            classes: { padding: "8px 6px" }
        },
        {
            id: 9,
            name: "Right Align",
            icon: <RightAlign />,
            handleClick: () => handleActive("rightAlign"),
            isActive: activeStyles.rightAlign,
            classes: { padding: "8px 6px" }
        },
        {
            id: 10,
            name: "Undo",
            icon: <Undo />,
            handleClick: () => handleActive("undo"),
            classes: { padding: "8px 6px" }
        },
        {
            id: 11,
            name: "Redo",
            icon: <Redo />,
            handleClick: () => handleActive("redo"),
            classes: { padding: "8px 6px" }
        },
        {
            id: 12,
            name: "Text Color",
            icon: <TextColor style={{ color: textColor }} />,
            handleClick: () => handleActive('textColor'),
            classes: { color: "none", opacity: "0.7" }
        },
    ];

    return (
        <div className={`p-2 rounded-2xl overflow-hidden flex justify-between shadow-md ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <div className="hidden md:flex gap-5">
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
                            fontWeight={family.weight}
                            sx={{
                                fontSize: "16px",
                                padding: "8px",
                                fontFamily: family.family,
                                fontWeight: family.fontWeight,
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
                <Select
                    classes={{ root: "h-full max-h-11 w-full min-w-24 max-w-24 shadow-sm" }}
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
                    value={fontSize}
                    onChange={handleFontSize}
                >
                    {fontSizes.map(font => (
                        <MenuItem
                            key={font.id}
                            value={font.size}
                            sx={{
                                fontSize: "16px",
                                padding: "8px",
                                backgroundColor: darkMode ? "#374151" : "white",
                                color: darkMode ? "#E5E7EB" : "#1F2937",
                                "&:hover": {
                                    backgroundColor: darkMode ? "#4B5563" : "#F3F4F6",
                                },
                            }}
                        >
                            {font.size}
                        </MenuItem>
                    ))}
                </Select>
                <div className="flex gap-5">
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

            {/* mobile display */}
            <div className="flex md:hidden w-full justify-between items-center">
                <Select
                    classes={{ root: "h-full max-h-11 w-full min-w-[100px] max-w-[120px] shadow-sm mr-4" }}
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
                            fontWeight={family.fontWeight}
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
                <Select
                    classes={{ root: "h-full max-h-11 w-full min-w-22 max-w-22 shadow-sm" }}
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
                    value={fontSize}
                    onChange={handleFontSize}
                >
                    {fontSizes.map(font => (
                        <MenuItem
                            key={font.id}
                            value={font.size}
                            sx={{
                                fontSize: "16px",
                                padding: "8px",
                                backgroundColor: darkMode ? "#374151" : "white",
                                color: darkMode ? "#E5E7EB" : "#1F2937",
                                "&:hover": {
                                    backgroundColor: darkMode ? "#4B5563" : "#F3F4F6",
                                },
                            }}
                        >
                            {font.size}
                        </MenuItem>
                    ))}
                </Select>
                <div className="flex gap-2">
                    <input
                        type="color"
                        ref={textColorRef}
                        className="hidden"
                        onChange={(e) => handleColor(e.target.value)}
                    />
                    {editorButtons.slice(0, 2).map((val) => (
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
                    {editorButtons.slice(2).map((val) => (
                        <MenuItem
                            key={val.id}
                            onClick={() => {
                                if (val.id === 3) {
                                    handleLink();
                                } else {
                                    val.handleClick();
                                }
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
                                <span className="text-md text-black dark:text-white text-center">
                                    {val.name}
                                </span>
                            </div>
                        </MenuItem>
                    ))}
                </Menu>
            </div>

            <Modal
                isOpen={linkModel}
                onClose={() => setLinkModel(false)}
                onInsertLink={handleLinkSubmit}
            />
        </div>
    );
};

export default EditorToolKit;