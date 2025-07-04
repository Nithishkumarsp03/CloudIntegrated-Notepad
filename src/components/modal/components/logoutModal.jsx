import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    IconButton,
    Box
} from '@mui/material';
import { Close, Logout, Info } from '@mui/icons-material';
import { ButtonComponent } from '../../button';
import useEditorStore from '../../../store/globalStore';

export const LogoutModal = ({ open, onClose, onConfirm, loading = false }) => {
    const darkMode = useEditorStore((state) => state.darkMode);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                    borderColor: darkMode ? '#374151' : '#E5E7EB',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderRadius: '8px',
                    overflowY: "visible",
                    boxShadow: darkMode
                        ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
                        : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                }
            }}
        >
            <DialogTitle className="relative p-6 pb-4">
                <Box className="flex items-center justify-between">
                    <Box className="flex items-center space-x-3">
                        <Box className={`p-2 rounded-lg ${darkMode
                            ? 'bg-gray-800/60 text-gray-300'
                            : 'bg-gray-100 text-gray-600'
                            }`}>
                            <Logout className="w-5 h-5 text-white" />
                        </Box>
                        <Typography
                            variant="h6"
                            className={`font-semibold font-mono ${darkMode ? 'text-white' : 'text-gray-800'
                                }`}
                        >
                            Logout Confirmation
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={onClose}
                        className={`${darkMode ? 'text-white' : 'text-black'}`}
                        size="small"
                    >
                        <Close className={`${darkMode ? 'text-white' : 'text-black'}`}
 />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent className="p-6 pt-0">
                <Box className={`mt-1 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <Box className="flex items-start space-x-4">
                        <Box className={`p-2 rounded-lg ${darkMode
                            ? 'bg-gray-800/40 text-gray-400'
                            : 'bg-gray-50 text-gray-600'
                            }`}>
                            <Info className="w-4 h-4" />
                        </Box>
                        <Box className="flex-1">
                            <Typography
                                variant="body1"
                                className={`mb-2 font-mono ${darkMode ? 'text-white' : 'text-gray-800'
                                    }`}
                            >
                                Are you sure you want to logout?
                            </Typography>
                            <Typography
                                variant="body2"
                                className={`font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}
                            >
                                You will be signed out of your account and redirected to the login page.
                                Any unsaved changes will be lost.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions className="p-6 pt-2">
                <Box className="flex space-x-3 w-full">
                    <ButtonComponent
                        btnText="Cancel"
                        handleClick={onClose}
                        darkMode={darkMode}
                        styles={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            border: `1px solid ${darkMode ? '#4B5563' : '#D1D5DB'}`,
                            color: darkMode ? '#D1D5DB' : '#374151',
                            fontFamily: 'monospace',
                            '&:hover': {
                                backgroundColor: darkMode ? '#374151' : '#F3F4F6',
                                borderColor: darkMode ? '#6B7280' : '#9CA3AF',
                            }
                        }}
                        disabled={loading}
                    />
                    <ButtonComponent
                        btnText={loading ? "Logging out..." : "Logout"}
                        handleClick={onConfirm}
                        startIcon={!loading && <Logout />}
                        darkMode={darkMode}
                        styles={{
                            flex: 1,
                        }}
                        disabled={loading}
                    />
                </Box>
            </DialogActions>
        </Dialog>
    );
};