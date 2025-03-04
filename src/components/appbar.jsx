import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, Popover, Stack } from "@mui/material";
import logo from "../assets/notepadLogo.png";

export default function Appbar() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box className="w-full">
            <AppBar position="static" className="bg-white shadow-none">
                <Toolbar className="w-full">
                    <Stack direction="row" justifyContent="space-between" alignItems="center" className="w-full">
                        {/* Logo Section */}
                        <div className="flex items-center gap-2 h-[50px]">
                            <img src={logo} alt="logo" />
                        </div>

                        {/* Avatar Section */}
                        <Box>
                            <Typography variant="h6" component="div">
                                <Avatar
                                    id="avatar"
                                    src={"https://th.bing.com/th/id/OIP.leRaZskYpTKA55a0St0tZgHaJa?w=156&h=180&c=7&r=0&o=5&pid=1.7"}
                                    alt="avatar"
                                    onClick={handleClick}
                                    className="cursor-pointer"
                                />
                            </Typography>
                            <Popover
                                id="avatar-popover"
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                className="mt-1 shadow-lg"
                            >
                                <Box className="p-4">I am a popover</Box>
                            </Popover>
                        </Box>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
