import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Box,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import useEditorStore from "../globalStore";
import { ButtonComponent } from './button';

const SaveModal = ({ isOpen, onClose, onSave, onSaveAs, currentFileName }) => {
    const { darkMode } = useEditorStore();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [fileName, setFileName] = useState(currentFileName || '');
    const [isSaveAs, setIsSaveAs] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setFileName(currentFileName || '');
            setIsSaveAs(false);
        }
    }, [isOpen, currentFileName]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSaveAs && !fileName.trim()) return;

        if (isSaveAs) {
            onSaveAs(fileName.trim());
        } else {
            onSave();
        }
        onClose();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            fullScreen={fullScreen}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    bgcolor: darkMode ? '#111827' : 'background.paper',
                    border: darkMode ? '1px solid #4B5563' : '1px solid #D1D5DB',
                    borderRadius: '12px',
                    boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)',
                    p: 3
                }
            }}
        >
            <DialogTitle sx={{
                p: 0,
                mb: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Typography variant="h6" sx={{
                    fontWeight: 'bold',
                    color: darkMode ? 'grey.100' : 'grey.800'
                }}>
                    {isSaveAs ? 'Save As' : 'Save Document'}
                </Typography>
                <IconButton
                    onClick={onClose}
                    aria-label="close"
                    sx={{
                        color: darkMode ? 'grey.400' : 'grey.500',
                        '&:hover': {
                            color: darkMode ? 'grey.200' : 'grey.700',
                            bgcolor: 'transparent'
                        }
                    }}
                >
                    <CloseIcon fontSize="medium" />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                <form onSubmit={handleSubmit}>
                    {isSaveAs && (
                        <Box mb={3}>
                            <Typography variant="body2" sx={{
                                mb: 1,
                                color: darkMode ? 'grey.300' : 'grey.600',
                                fontWeight: 'medium'
                            }}>
                                File Name*
                            </Typography>
                            <TextField
                                autoFocus
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                required
                                InputProps={{
                                    sx: {
                                        color: darkMode ? 'grey.100' : 'grey.900',
                                        bgcolor: darkMode ? 'grey.800' : 'grey.50',
                                        borderRadius: '8px',
                                        '& fieldset': {
                                            borderColor: darkMode ? 'grey.700' : 'grey.300',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: darkMode ? 'grey.600' : 'grey.400',
                                        },
                                    }
                                }}
                                placeholder="Enter file name"
                            />
                        </Box>
                    )}

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 3,
                        gap: 2
                    }}>
                        <ButtonComponent
                            btnText={isSaveAs ? '← Regular Save' : 'Save As'}
                            handleClick={() => setIsSaveAs(!isSaveAs)}
                            styles={{
                                minWidth: '120px',
                                height: '40px',
                                backgroundColor: darkMode ? '#374151' : '#E5E7EB',
                                color: darkMode ? '#F3F4F6' : '#111827',
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                                '&:hover': {
                                    backgroundColor: darkMode ? '#4B5563' : '#D1D5DB',
                                    boxShadow: 'none'
                                }
                            }}
                        />

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <ButtonComponent
                                btnText="Cancel"
                                handleClick={onClose}
                                styles={{
                                    minWidth: '100px',
                                    height: '40px',
                                    backgroundColor: darkMode ? '#374151' : '#E5E7EB',
                                    color: darkMode ? '#F3F4F6' : '#111827',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                    '&:hover': {
                                        backgroundColor: darkMode ? '#4B5563' : '#D1D5DB',
                                        boxShadow: 'none'
                                    }
                                }}
                            />
                            <ButtonComponent
                                type="submit"
                                btnText={isSaveAs ? 'Save As' : 'Save'}
                                handleClick={onClose}
                                styles={{
                                    minWidth: '100px',
                                    height: '40px',
                                    backgroundColor: darkMode ? '#7C3AED' : '#2563EB',
                                    color: 'white',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                    '&:hover': {
                                        backgroundColor: darkMode ? '#6D28D9' : '#3B82F6',
                                        boxShadow: darkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
                                    },
                                    '&:active': {
                                        backgroundColor: darkMode ? '#5B21B6' : '#1D4ED8'
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SaveModal;