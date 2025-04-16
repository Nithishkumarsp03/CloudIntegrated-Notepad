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
    useMediaQuery,
    RadioGroup,
    FormControlLabel,
    Radio,
    Divider,
    Tooltip
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import useEditorStore from "../store/globalStore";
import { ButtonComponent } from './button';

const SAVE_OPTIONS = {
    REGULAR: 'regular',
    DRAFT: 'draft',
    NOTEPAD: 'notepad',
    DOWNLOAD: 'download'
};

const SaveModal = ({ isOpen, onClose, onSave, onSaveAs, currentFileName }) => {
    const { darkMode } = useEditorStore();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [fileName, setFileName] = useState(currentFileName || '');
    const [isSaveAs, setIsSaveAs] = useState(false);
    const [saveOption, setSaveOption] = useState(SAVE_OPTIONS.REGULAR);

    useEffect(() => {
        if (isOpen) {
            setFileName(currentFileName || '');
            setIsSaveAs(false);
            setSaveOption(SAVE_OPTIONS.REGULAR);
        }
    }, [isOpen, currentFileName]);

    const handleSubmit = (e) => {
        if ((isSaveAs || saveOption !== SAVE_OPTIONS.REGULAR) && !fileName.trim()) return;

        switch (saveOption) {
            case SAVE_OPTIONS.DRAFT:
                console.log(`Saving as draft: ${fileName}`);
                break;
            case SAVE_OPTIONS.NOTEPAD:
                console.log(`Saving to notepad: ${fileName}`);
                break;
            case SAVE_OPTIONS.DOWNLOAD:
                console.log(`Downloading file: ${fileName}`);
                break;
            default:
                if (isSaveAs) {
                    onSaveAs(fileName.trim());
                } else {
                    onSave();
                }
        }
        onClose();
    };

    const needsFileName = isSaveAs || saveOption !== SAVE_OPTIONS.REGULAR;

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
                <div>
                    {needsFileName && (
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

                    <Box mt={3} mb={3}>
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
                                    value={SAVE_OPTIONS.REGULAR}
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
                                                Regular Save
                                            </Typography>
                                        </Box>
                                    }
                                    sx={{
                                        margin: 0,
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        border: '1px solid',
                                        borderColor: saveOption === SAVE_OPTIONS.REGULAR
                                            ? (darkMode ? '#6D28D9' : '#3B82F6')
                                            : (darkMode ? '#4B5563' : '#E5E7EB'),
                                        bgcolor: saveOption === SAVE_OPTIONS.REGULAR
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
                                    value={SAVE_OPTIONS.DRAFT}
                                    control={<Radio sx={{
                                        '&.Mui-checked': {
                                            color: darkMode ? '#F9A8D4' : '#DB2777',
                                        }
                                    }} color='secondary' />}
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <DraftsOutlinedIcon sx={{
                                                color: darkMode ? '#F9A8D4' : '#DB2777',
                                                fontSize: '1.25rem'
                                            }} />
                                            <Typography variant="body2" sx={{ fontWeight: 'medium', color: darkMode ? 'white' : 'black' }}>
                                                Save as Draft
                                            </Typography>
                                        </Box>
                                    }
                                    sx={{
                                        margin: 0,
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        border: '1px solid',
                                        borderColor: saveOption === SAVE_OPTIONS.DRAFT
                                            ? (darkMode ? '#C026D3' : '#DB2777')
                                            : (darkMode ? '#4B5563' : '#E5E7EB'),
                                        bgcolor: saveOption === SAVE_OPTIONS.DRAFT
                                            ? (darkMode ? 'rgba(192, 38, 211, 0.1)' : 'rgba(219, 39, 119, 0.05)')
                                            : 'transparent',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            borderColor: darkMode ? '#E879F9' : '#F472B6',
                                            bgcolor: darkMode
                                                ? 'rgba(232, 121, 249, 0.05)'
                                                : 'rgba(244, 114, 182, 0.05)'
                                        }
                                    }}
                                />

                                <FormControlLabel
                                    value={SAVE_OPTIONS.NOTEPAD}
                                    control={<Radio sx={{
                                        '&.Mui-checked': {
                                            color: darkMode ? '#A5F3FC' : '#0891B2',
                                        }
                                    }} />}
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <NoteOutlinedIcon sx={{
                                                color: darkMode ? '#A5F3FC' : '#0891B2',
                                                fontSize: '1.25rem'
                                            }} />
                                            <Typography variant="body2" sx={{ fontWeight: 'medium', color: darkMode ? 'white' : 'black' }}>
                                                Save in Notepad
                                            </Typography>
                                        </Box>
                                    }
                                    sx={{
                                        margin: 0,
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        border: '1px solid',
                                        borderColor: saveOption === SAVE_OPTIONS.NOTEPAD
                                            ? (darkMode ? '#0E7490' : '#0E7490')
                                            : (darkMode ? '#4B5563' : '#E5E7EB'),
                                        bgcolor: saveOption === SAVE_OPTIONS.NOTEPAD
                                            ? (darkMode ? 'rgba(14, 116, 144, 0.1)' : 'rgba(14, 116, 144, 0.05)')
                                            : 'transparent',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            borderColor: darkMode ? '#22D3EE' : '#06B6D4',
                                            bgcolor: darkMode
                                                ? 'rgba(34, 211, 238, 0.05)'
                                                : 'rgba(6, 182, 212, 0.05)'
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
                                            <Typography variant="body2" sx={{ fontWeight: 'medium',color:darkMode ? 'white' : 'black' }}>
                                                Download as File
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

                    <Divider sx={{
                        my: 3,
                        borderColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(209, 213, 219, 0.5)'
                    }} />

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                        gap: 2
                    }}>
                        {!isSmallScreen && saveOption === SAVE_OPTIONS.REGULAR && (
                            <ButtonComponent
                                btnText="Save As..."
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
                        )}

                        {isSmallScreen && saveOption === SAVE_OPTIONS.REGULAR && (
                            <Tooltip title="Toggle Save As">
                                <IconButton
                                    onClick={() => setIsSaveAs(!isSaveAs)}
                                    sx={{
                                        backgroundColor: darkMode ? '#374151' : '#E5E7EB',
                                        color: darkMode ? '#F3F4F6' : '#111827',
                                        '&:hover': {
                                            backgroundColor: darkMode ? '#4B5563' : '#D1D5DB',
                                        }
                                    }}
                                >
                                    {isSaveAs ? <DescriptionOutlinedIcon /> : <DraftsOutlinedIcon />}
                                </IconButton>
                            </Tooltip>
                        )}

                        {saveOption !== SAVE_OPTIONS.REGULAR && <div></div>}

                        <Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
                            {!isSmallScreen && (
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
                            )}

                            <ButtonComponent
                                btnText={
                                    saveOption === SAVE_OPTIONS.DRAFT ? 'Save as Draft' :
                                        saveOption === SAVE_OPTIONS.NOTEPAD ? 'Save to Notepad' :
                                            saveOption === SAVE_OPTIONS.DOWNLOAD ? 'Download File' :
                                                isSaveAs ? 'Save As' : 'Save'
                                }
                                handleClick={handleSubmit}
                                styles={{
                                    minWidth: '130px',
                                    height: '40px',
                                    backgroundColor:
                                        saveOption === SAVE_OPTIONS.DRAFT ? (darkMode ? '#C026D3' : '#DB2777') :
                                            saveOption === SAVE_OPTIONS.NOTEPAD ? (darkMode ? '#0E7490' : '#0891B2') :
                                                saveOption === SAVE_OPTIONS.DOWNLOAD ? (darkMode ? '#059669' : '#10B981') :
                                                    (darkMode ? '#7C3AED' : '#2563EB'),
                                    color: 'white',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                    '&:hover': {
                                        backgroundColor:
                                            saveOption === SAVE_OPTIONS.DRAFT ? (darkMode ? '#A21CAF' : '#BE185D') :
                                                saveOption === SAVE_OPTIONS.NOTEPAD ? (darkMode ? '#0369A1' : '#0284C7') :
                                                    saveOption === SAVE_OPTIONS.DOWNLOAD ? (darkMode ? '#047857' : '#059669') :
                                                        (darkMode ? '#6D28D9' : '#3B82F6'),
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                    },
                                    '&:active': {
                                        backgroundColor:
                                            saveOption === SAVE_OPTIONS.DRAFT ? (darkMode ? '#86198F' : '#9D174D') :
                                                saveOption === SAVE_OPTIONS.NOTEPAD ? (darkMode ? '#0284C7' : '#0369A1') :
                                                    saveOption === SAVE_OPTIONS.DOWNLOAD ? (darkMode ? '#065F46' : '#047857') :
                                                        (darkMode ? '#5B21B6' : '#1D4ED8')
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SaveModal;