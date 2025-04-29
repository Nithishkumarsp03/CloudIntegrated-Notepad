import React from "react";
import { Menu, MenuItem } from "@mui/material";

const NotesMenu = ({ anchorEl, open, handleMenuClose, handleRename, handleDelete,id }) => {
    return (
        <Menu
            id="basic-menu"
            elevation={0}
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
                sx: {
                    padding: 0,
                }
            }}
            PaperProps={{
                sx: {
                    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                },
                className: `
                    bg-blue-400 dark:bg-gray-800 
                    text-gray-900 dark:text-purple-200 
                    text-sm 
                    border dark:border-gray-700
                    shadow-lg dark:shadow-purple-900/10
                    rounded-md
                    min-w-[120px]
                `,
            }}
        >
            <MenuItem
                onClick={() => handleRename()}
                className={`
                    text-gray-700 dark:text-purple-200 
                    hover:bg-blue-50 dark:hover:bg-purple-900/50
                    transition-colors duration-200
                `}
            >
                <div className="py-1 px-1 text-sm font-normal">
                    Rename
                </div>
            </MenuItem>
            <MenuItem
                onClick={() => handleDelete()}
                className={`
                    text-gray-700 dark:text-purple-200 
                    hover:bg-blue-50 dark:hover:bg-purple-900/30
                    transition-colors duration-200
                `}
            >
                <div className="py-1 px-1 text-sm font-normal">
                    Delete
                </div>
            </MenuItem>
        </Menu>
    );
};

export default NotesMenu;