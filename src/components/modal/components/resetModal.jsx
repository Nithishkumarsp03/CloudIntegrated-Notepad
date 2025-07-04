import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    IconButton,
    Box
} from '@mui/material';
import { Close, Lock, Email } from '@mui/icons-material';
import { ButtonComponent } from '../../button';
import useEditorStore from '../../../store/globalStore';
import { useLoginStore } from '../../../store/loginStore';

export const ResetModal = ({ open, onClose, onConfirm, loading = false, sent }) => {
    const darkMode = useEditorStore((state) => state.darkMode);
    const userEmail = useLoginStore(state => state.email);
   
    function handleConfirm() {
        onConfirm();
    }

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
            <DialogTitle className="relative">
                <Box className="flex items-center justify-between">
                    <Box className="flex items-center space-x-3">
                        <Box className={`p-2 pt-1 rounded-lg ${darkMode
                            ? 'bg-gray-800/60 text-gray-300'
                            : 'bg-gray-100 text-gray-600'
                            }`}>
                            <Lock className="w-5 h-5 text-white" />
                        </Box>
                        <Typography
                            variant="h6"
                            className={`font-semibold font-mono ${darkMode ? 'text-white' : 'text-gray-800'
                                }`}
                        >
                            Change Password
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={onClose}
                        className={`${darkMode ? 'text-white' : 'text-black'}`}
                        size="small"
                    >
                        <Close className={`${darkMode ? 'text-white' : 'text-black'}`} />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent className="p-6 pt-0">
                <Box className={` ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <Box className="flex items-start space-x-4">
                        <Box className={`p-2 rounded-lg ${darkMode
                            ? 'bg-gray-800/40 text-gray-400'
                            : 'bg-gray-50 text-gray-600'
                            }`}>
                            <Email className="w-4 h-4" />
                        </Box>
                        <Box className="flex-1">
                            <Typography
                                variant="body1"
                                className={`mb-2 font-mono ${darkMode ? 'text-white' : 'text-gray-800'
                                    }`}
                            >
                                Reset your password?
                            </Typography>
                            <Typography
                                variant="body2"
                                className={`font-mono pt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}
                            >
                                Password reset instructions will be sent to  
                                {userEmail && (
                                    <span className={`pl-[5px] font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {userEmail}
                                    </span>
                                )}
                                . Please follow the instructions in the email to create a new password.
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
                    />
                    <ButtonComponent
                        btnText={loading ? "Sending link to email" : sent ? "Link sent to email" : "Reset Password"}
                        handleClick={handleConfirm}
                        startIcon={!loading && <Email />}
                        darkMode={darkMode}
                        styles={{
                            flex: 1,
                        }}
                        loading={loading}
                        disabled={loading || sent}
                    />
                </Box>
            </DialogActions>
        </Dialog>
    );
};