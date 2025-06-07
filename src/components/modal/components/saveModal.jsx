import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery,
    RadioGroup,
    FormControlLabel,
    Radio,
    Divider,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import useEditorStore from '../../../store/globalStore';
import { ButtonComponent } from '../../../components';

export const SaveModal = ({ isOpen, onClose, onSave, currentFileName }) => {
    const { darkMode } = useEditorStore();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [fileName, setFileName] = useState(currentFileName || '');
    const [fileFormat, setFileFormat] = useState('pdf');

    useEffect(() => {
        if (isOpen) {
            setFileName(currentFileName || '');
            setFileFormat('pdf');
        }
    }, [isOpen, currentFileName]);

    const handleSubmit = (e) => {
        onSave(e);
        onClose();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            sx={{
                '& .MuiDialog-container': {
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                '& .MuiPaper-root': {
                    margin: '20px',
                    width: isSmallScreen ? 'calc(100% - 40px)' : '100%',
                    maxHeight: 'calc(100vh - 40px)',
                    overflowY: 'auto'
                }
            }}
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DownloadOutlinedIcon sx={{
                        color: darkMode ? '#86EFAC' : '#10B981',
                        fontSize: '1.5rem'
                    }} />
                    <Typography sx={{
                        fontWeight: 'bold',
                        color: darkMode ? 'grey.100' : 'grey.800'
                    }}>
                        Download Document
                    </Typography>
                </Box>
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
                <div>
                    <Box mb={3}>
                        <Typography variant="body2" sx={{
                            mb: 1,
                            color: darkMode ? 'grey.300' : 'grey.600',
                            fontWeight: 'medium'
                        }}>
                            Select File Format
                        </Typography>
                        <RadioGroup
                            row
                            value={fileFormat}
                            onChange={(e) => setFileFormat(e.target.value)}
                            sx={{ '& .MuiRadio-root': { color: darkMode ? 'grey.400' : 'grey.500' } }}
                        >
                            <FormControlLabel
                                value="pdf"
                                control={<Radio
                                    sx={{
                                        color: darkMode ? '#86EFAC' : '#10B981',
                                        '&.Mui-checked': {
                                            color: darkMode ? '#86EFAC' : '#10B981'
                                        }
                                    }}
                                />}
                                label="PDF"
                                sx={{
                                    '& .MuiFormControlLabel-label': {
                                        color: darkMode ? 'grey.300' : 'grey.800'
                                    }
                                }}
                            />
                            <FormControlLabel
                                value="Docx"
                                control={<Radio
                                    sx={{
                                        color: darkMode ? '#86EFAC' : '#10B981',
                                        '&.Mui-checked': {
                                            color: darkMode ? '#86EFAC' : '#10B981'
                                        }
                                    }}
                                />}
                                label="DOCX"
                                sx={{
                                    '& .MuiFormControlLabel-label': {
                                        color: darkMode ? 'grey.300' : 'grey.800'
                                    }
                                }}
                            />
                            <FormControlLabel
                                value="txt"
                                control={<Radio
                                    sx={{
                                        color: darkMode ? '#86EFAC' : '#10B981',
                                        '&.Mui-checked': {
                                            color: darkMode ? '#86EFAC' : '#10B981'
                                        }
                                    }}
                                />}
                                label="TXT"
                                sx={{
                                    '& .MuiFormControlLabel-label': {
                                        color: darkMode ? 'grey.300' : 'grey.800'
                                    }
                                }}
                            />
                        </RadioGroup>
                    </Box>

                    <Divider sx={{
                        my: 3,
                        borderColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(209, 213, 219, 0.5)'
                    }} />

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        mt: 2,
                        gap: 2
                    }}>
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
                            btnText="Download"
                            handleClick={() => handleSubmit('Download')}
                            styles={{
                                minWidth: '150px',
                                height: '40px',
                                backgroundColor: darkMode ? '#059669' : '#10B981',
                                color: 'white',
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                                '&:hover': {
                                    backgroundColor: darkMode ? '#047857' : '#059669',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                },
                                '&:active': {
                                    backgroundColor: darkMode ? '#065F46' : '#047857'
                                }
                            }}
                        />
                    </Box>
                </div>
            </DialogContent>
        </Dialog>
    );
};