import React from "react";
import { IconButton, Tooltip, Menu, MenuItem } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import useEditorStore from "../globalStore";

const ShareComponent = ({ title, text, url }) => {
    const { darkMode } = useEditorStore();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleShareClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: text,
                    url: url,
                });
                console.log("Shared successfully!");
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            console.log("Web Share API not supported.");
            handleFallbackShare();
        }
        handleMenuClose();
    };

    const handleFallbackShare = () => {
        navigator.clipboard
            .writeText(url)
            .then(() => {
                alert("Link copied to clipboard!");
            })
            .catch(() => {
                alert("Failed to copy link to clipboard.");
            });
        handleMenuClose();
    };

    return (
        <>
            <Tooltip title="Share" arrow>
                <IconButton
                    onClick={handleShareClick}
                    className={`text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400`}
                    aria-label="share"
                >
                    <ShareIcon />
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                    className: `
                        bg-white dark:bg-gray-800
                        text-gray-900 dark:text-gray-100
                        border border-gray-200 dark:border-gray-700
                        shadow-lg
                        min-w-[220px]
                        py-1
                        rounded-md
                    `,
                }}
            >
                <MenuItem
                    onClick={handleNativeShare}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 text-sm"
                >
                    Share via Web Share API
                </MenuItem>
                <MenuItem
                    onClick={handleFallbackShare}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 text-sm"
                >
                    Copy Link to Clipboard
                </MenuItem>
            </Menu>
        </>
    );
};

export default ShareComponent;