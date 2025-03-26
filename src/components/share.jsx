import React from "react";
import { IconButton, Tooltip, Menu, MenuItem } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import useEditorStore from "../globalStore";

const ShareComponent = ({ title, text, url }) => {
    const { darkMode } = useEditorStore();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    // Handle click on the share icon
    const handleShareClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Handle menu close
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Native Web Share API
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
        handleMenuClose(); // Close the menu after sharing
    };

    // Fallback sharing options
    const handleFallbackShare = () => {
        // Copy to clipboard
        navigator.clipboard
            .writeText(url)
            .then(() => {
                alert("Link copied to clipboard!");
            })
            .catch(() => {
                alert("Failed to copy link to clipboard.");
            });
        handleMenuClose(); // Close the menu after copying
    };

    return (
        <>
            {/* Share Icon */}
            <Tooltip title="Share">
                <IconButton
                    onClick={handleShareClick}
                    sx={{ color: "inherit" }}
                >
                    <ShareIcon />
                </IconButton>
            </Tooltip>

            {/* Share Menu */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                sx={{
                    "& .MuiPaper-root": {
                        backgroundColor: !darkMode ? "#ffffff" : "#111827",
                        color: !darkMode ? "#000000" : "#ffffff",
                    },
                }}
            >
                <MenuItem onClick={handleNativeShare}>
                    Share via Web Share API
                </MenuItem>
                <MenuItem onClick={handleFallbackShare}>
                    Copy Link to Clipboard
                </MenuItem>
            </Menu>
        </>
    );
};

export default ShareComponent;