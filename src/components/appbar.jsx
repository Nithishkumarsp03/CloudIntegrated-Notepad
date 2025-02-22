import React, { useState } from 'react'
import { ButtonComponent } from './button';
import '../styles/appBar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import useEditorStore from '../globalStore';

export default function Appbar() {

    const [id, serId] = useState(4);

    const { setTab } = useEditorStore();

    function handleTabs() {
        setTab(id,`Tab ${id}`);
        serId(id + 1);  
    }

    return (
        <Box sx={{ width:"100%" }}>
            <AppBar position="static">
                <Toolbar sx={{ width: '100%' }}> {/* Ensures full width */}
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ width: '100%' }} // Ensures spacing works
                    >
                        <div className="buttons">
                            <ButtonComponent btnText="New Tab" styles={{ width: "100px", borderRadius: "12px" }} handleClick={handleTabs} />
                            <ButtonComponent btnText="Save" styles={{ width: "100px", borderRadius: "12px" }} />
                            <ButtonComponent btnText="Save as draft" styles={{ width: "150px", borderRadius: "12px" }} />
                        </div>

                        <Typography variant="h6" component="div">
                            Note Pad
                        </Typography>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
