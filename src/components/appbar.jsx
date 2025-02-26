import React, { useState } from 'react';
import '../styles/appBar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Popover, Stack } from '@mui/material';
import logo from '../assets/notepadLogo.png';

export default function Appbar() {
    const [anchorEl, setAnchorEl] = useState(null); 
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null); 
    };

    return (
        <Box sx={{ width: "100%" }}>
            <AppBar position="static" sx={{ bgcolor: 'white' }} elevation={0}>
                <Toolbar sx={{ width: '100%' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                        <div className="buttons">
                            <img src={logo} alt="logo" />
                        </div>
                        <Box>
                            <Typography variant="h6" component="div">
                                <Avatar
                                    id="avatar"
                                    src={"https://th.bing.com/th/id/OIP.leRaZskYpTKA55a0St0tZgHaJa?w=156&h=180&c=7&r=0&o=5&pid=1.7"}
                                    alt="avatar"
                                    onClick={handleClick}
                                    sx={{ cursor: "pointer" }} // Add cursor pointer for better UX
                                />
                            </Typography>
                            <Popover
                                id="avatar-popover"
                                open={Boolean(anchorEl)} // Open if anchorEl is set
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                sx={{ mt: 1 }} 
                                elevation={24}

                            >
                                <Box sx={{ p: 2 }}>I am a popover</Box>
                            </Popover>
                        </Box>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
