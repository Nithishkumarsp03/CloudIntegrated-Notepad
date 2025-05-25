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
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import useEditorStore from '../../../store/globalStore';
import { ButtonComponent } from '../../../components'; 

const SAVE_OPTIONS = {
    ONLINE: 'online',
    DOWNLOAD: 'download'
};

export const SaveModal = ({ isOpen, onClose, onSave, onSaveAs, currentFileName }) => {
    const { darkMode } = useEditorStore();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [fileName, setFileName] = useState(currentFileName || '');
    const [saveOption, setSaveOption] = useState(SAVE_OPTIONS.ONLINE);
    const [fileFormat, setFileFormat] = useState('pdf');

    useEffect(() => {
        if (isOpen) {
            setFileName(currentFileName || '');
            setSaveOption(SAVE_OPTIONS.ONLINE);
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
                <Typography variant="h6" sx={{
                    fontWeight: 'bold',
                    color: darkMode ? 'grey.100' : 'grey.800'
                }}>
                    Save Document
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
                <div>
                    <Box mb={3}>
                        <Typography variant="body2" sx={{
                            mb: 1,
                            color: darkMode ? 'grey.300' : 'grey.600',
                            fontWeight: 'medium'
                        }}>
                            Save Options
                        </Typography>

                        <RadioGroup
                            value={saveOption}
                            onChange={(e) => setSaveOption(e.target.value)}
                            sx={{ '& .MuiRadio-root': { color: darkMode ? 'grey.400' : 'grey.500' } }}
                        >
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: isSmallScreen ? '1fr' : 'repeat(2, 1fr)',
                                    gap: 2,
                                    mt: 1
                                }}
                            >
                                <FormControlLabel
                                    value={SAVE_OPTIONS.ONLINE}
                                    control={<Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: darkMode ? '#60A5FA' : '#2563EB',
                                            }
                                        }}
                                    />}
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <DescriptionOutlinedIcon sx={{
                                                color: darkMode ? '#60A5FA' : '#2563EB',
                                                fontSize: '1.25rem'
                                            }} />
                                            <Typography variant="body2" sx={{ fontWeight: 'medium', color: darkMode ? 'white' : 'black' }}>
                                                Save Online
                                            </Typography>
                                        </Box>
                                    }
                                    sx={{
                                        margin: 0,
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        border: '1px solid',
                                        borderColor: saveOption === SAVE_OPTIONS.ONLINE
                                            ? (darkMode ? '#6D28D9' : '#3B82F6')
                                            : (darkMode ? '#4B5563' : '#E5E7EB'),
                                        bgcolor: saveOption === SAVE_OPTIONS.ONLINE
                                            ? (darkMode ? 'rgba(109, 40, 217, 0.1)' : 'rgba(59, 130, 246, 0.05)')
                                            : 'transparent',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            borderColor: darkMode ? '#7C3AED' : '#60A5FA',
                                            bgcolor: darkMode
                                                ? 'rgba(124, 58, 237, 0.05)'
                                                : 'rgba(96, 165, 250, 0.05)'
                                        }
                                    }}
                                />

                                <FormControlLabel
                                    value={SAVE_OPTIONS.DOWNLOAD}
                                    control={<Radio sx={{
                                        '&.Mui-checked': {
                                            color: darkMode ? '#86EFAC' : '#10B981'
                                        }
                                    }} />}
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <DownloadOutlinedIcon sx={{
                                                color: darkMode ? '#86EFAC' : '#10B981',
                                                fontSize: '1.25rem'
                                            }} />
                                            <Typography variant="body2" sx={{ fontWeight: 'medium', color: darkMode ? 'white' : 'black' }}>
                                                Download File
                                            </Typography>
                                        </Box>
                                    }
                                    sx={{
                                        margin: 0,
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        border: '1px solid',
                                        borderColor: saveOption === SAVE_OPTIONS.DOWNLOAD
                                            ? (darkMode ? '#059669' : '#059669')
                                            : (darkMode ? '#4B5563' : '#E5E7EB'),
                                        bgcolor: saveOption === SAVE_OPTIONS.DOWNLOAD
                                            ? (darkMode ? 'rgba(5, 150, 105, 0.1)' : 'rgba(5, 150, 105, 0.05)')
                                            : 'transparent',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            borderColor: darkMode ? '#34D399' : '#10B981',
                                            bgcolor: darkMode
                                                ? 'rgba(52, 211, 153, 0.05)'
                                                : 'rgba(16, 185, 129, 0.05)'
                                        }
                                    }}
                                />
                            </Box>
                        </RadioGroup>
                    </Box>

                    {saveOption === SAVE_OPTIONS.DOWNLOAD && (
                        <Box mb={3}>
                            <Typography variant="body2" sx={{
                                mb: 1,
                                color: darkMode ? 'grey.300' : 'grey.600',
                                fontWeight: 'medium'
                            }}>
                                File Format
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
                    )}

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
                            btnText={saveOption === SAVE_OPTIONS.DOWNLOAD ? `Download` : 'Save Online'}
                            handleClick={() => handleSubmit(saveOption === SAVE_OPTIONS.DOWNLOAD ? `Download` : 'Save Online')}
                            styles={{
                                minWidth: '150px',
                                height: '40px',
                                backgroundColor: saveOption === SAVE_OPTIONS.DOWNLOAD
                                    ? (darkMode ? '#059669' : '#10B981')
                                    : (darkMode ? '#7C3AED' : '#2563EB'),
                                color: 'white',
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                                '&:hover': {
                                    backgroundColor: saveOption === SAVE_OPTIONS.DOWNLOAD
                                        ? (darkMode ? '#047857' : '#059669')
                                        : (darkMode ? '#6D28D9' : '#3B82F6'),
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                },
                                '&:active': {
                                    backgroundColor: saveOption === SAVE_OPTIONS.DOWNLOAD
                                        ? (darkMode ? '#065F46' : '#047857')
                                        : (darkMode ? '#5B21B6' : '#1D4ED8')
                                }
                            }}
                        />
                    </Box>
                </div>
            </DialogContent>
        </Dialog>
    );
};

