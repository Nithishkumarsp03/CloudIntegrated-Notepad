import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    Box,
    FormControlLabel,
    Checkbox,
    IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import useEditorStore from "../globalStore";

const RenameModal = ({ open, onClose, onRename, placeholder = "Enter new file name", heading = "Rename File" }) => {
    const [newName, setNewName] = useState("");
    const darkMode = useEditorStore((state) => state.darkMode);

    const handleInputChange = (event) => {
        setNewName(event.target.value);
    };

    const handleRename = () => {
        if (newName.trim()) {
            onRename(newName);
            onClose();
            setNewName("");
        }
    };

    // Light mode color palette
    const lightColors = {
        background: "#ffffff",
        paper: "#ffffff",
        inputBg: "#F9FAFB",
        text: {
            primary: "#111827",
            secondary: "#4B5563",
            placeholder: "#9CA3AF"
        },
        border: {
            default: "#E2E8F0",
            hover: "#CBD5E1",
            focus: "#3B82F6"
        },
        button: {
            primary: "#2563EB",
            primaryHover: "#1D4ED8",
            text: "#64748B",
            textHover: "#475569"
        }
    };

    // Dark mode color palette (kept from original)
    const darkColors = {
        background: "#111827",
        paper: "#1F2937",
        inputBg: "#1F2937",
        text: {
            primary: "#F3F4F6",
            secondary: "#D1D5DB",
            placeholder: "#9CA3AF"
        },
        border: {
            default: "#4B5563",
            hover: "#6B7280",
            focus: "#7C3AED"
        },
        button: {
            primary: "#7C3AED",
            primaryHover: "#6D28D9",
            text: "#9CA3AF",
            textHover: "rgba(156, 163, 175, 0.08)"
        }
    };

    // Choose color palette based on mode
    const colors = darkMode ? darkColors : lightColors;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: colors.background,
                    color: colors.text.primary,
                    borderRadius: "12px",
                    border: darkMode ? `1px solid ${colors.border.default}` : "none",
                    boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)',
                    p: 2,
                    overflowY: "visible"
                }
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleRename();
                }
            }}
        >
            {/* Close button */}
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    color: colors.text.secondary,
                    '&:hover': {
                        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                    },
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>

            <DialogTitle sx={{ p: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DriveFileRenameOutlineIcon sx={{
                        color: darkMode ? colors.button.primary : colors.button.primary,
                        fontSize: '1.25rem'
                    }} />
                    <Typography variant="h6" fontWeight={600} sx={{
                        color: colors.text.primary,
                        fontSize: "1.125rem"
                    }}>
                        {heading}
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ p: 2, pt: 1 }}>
                <Typography variant="body2" sx={{
                    color: colors.text.secondary,
                    mb: 2,
                    fontSize: '0.875rem'
                }}>
                    Please enter a new name for your file:
                </Typography>
                <Box>
                    <TextField
                        autoFocus
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={newName}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        InputLabelProps={{
                            style: { color: colors.text.placeholder },
                        }}
                        sx={{
                            '& .MuiInputBase-root': {
                                color: colors.text.primary,
                                backgroundColor: colors.inputBg,
                                fontSize: '0.95rem',
                                transition: 'all 0.2s ease-in-out',
                            },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: "8px",
                                '& fieldset': {
                                    borderColor: colors.border.default,
                                    transition: 'border-color 0.2s ease-in-out',
                                },
                                '&:hover fieldset': {
                                    borderColor: colors.border.hover,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: colors.border.focus,
                                    borderWidth: '1px',
                                },
                            },
                            '& .MuiInputBase-input': {
                                padding: '12px 14px',
                            },
                        }}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2, pt: 1 }}>
                <Button
                    onClick={onClose}
                    variant="text"
                    sx={{
                        color: colors.button.text,
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        px: 2,
                        py: 0.75,
                        borderRadius: "6px",
                        '&:hover': {
                            backgroundColor: darkMode ? colors.button.textHover : 'rgba(0, 0, 0, 0.04)',
                            color: darkMode ? colors.text.secondary : colors.button.textHover,
                        }
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleRename}
                    variant="contained"
                    disabled={!newName.trim()}
                    sx={{
                        backgroundColor: colors.button.primary,
                        color: "#ffffff",
                        textTransform: "none",
                        fontWeight: 500,
                        borderRadius: "6px",
                        fontSize: '0.875rem',
                        px: 2.5,
                        py: 0.75,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            backgroundColor: colors.button.primaryHover,
                            transform: 'translateY(-1px)',
                            boxShadow: darkMode ? '0 4px 12px rgba(124, 58, 237, 0.3)' : '0 4px 12px rgba(37, 99, 235, 0.3)',
                        },
                        '&:active': {
                            transform: 'translateY(0)',
                        },
                        '&.Mui-disabled': {
                            backgroundColor: darkMode ? "#4B5563" : "#E5E7EB",
                            color: darkMode ? "#9CA3AF" : "#94A3B8",
                        }
                    }}
                >
                    Rename
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RenameModal;