import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    Box,
    IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import useEditorStore from "../../../store/globalStore";
import { ButtonComponent } from "../../../components";

export const RenameModal = ({ open, onClose, onRename, placeholder = "Enter new file name", heading = "Rename File", value = '' }) => {
    const [newName, setNewName] = useState(value);
    const darkMode = useEditorStore((state) => state.darkMode);

    const handleInputChange = (event) => {
        setNewName(event.target.value);
    };

    useEffect(() => {
        setNewName(value);
    }, [value]);

    const handleRename = () => {
        onClose();
        if (newName.trim()) {
            onRename(newName);
            setNewName("");
        }
    };

    const colors = {
        background: darkMode ? "#111827" : "#ffffff",
        paper: darkMode ? "#1F2937" : "#ffffff",
        inputBg: darkMode ? "#1F2937" : "#F9FAFB",
        text: {
            primary: darkMode ? "#F3F4F6" : "#111827",
            secondary: darkMode ? "#D1D5DB" : "#4B5563",
            placeholder: "#9CA3AF"
        },
        border: {
            default: darkMode ? "#4B5563" : "#E2E8F0",
            hover: darkMode ? "#6B7280" : "#CBD5E1",
            focus: darkMode ? "#7C3AED" : "#3B82F6"
        },
        button: {
            primary: darkMode ? "#7C3AED" : "#2563EB",
            primaryHover: darkMode ? "#6D28D9" : "#1D4ED8",
            text: darkMode ? "#9CA3AF" : "#64748B",
            textHover: darkMode ? "rgba(156, 163, 175, 0.08)" : "#475569"
        }
    };

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
                    boxShadow: darkMode ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0px 8px 24px rgba(149, 157, 165, 0.2)',
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
                        color: colors.button.primary,
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

            <DialogActions sx={{ p: 2, pt: 1, display: 'flex', gap: 1 }}>
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
                            backgroundColor: darkMode ? 'rgba(156, 163, 175, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                            color: darkMode ? colors.text.secondary : colors.button.textHover,
                        }
                    }}
                >
                    Cancel
                </Button>
                <ButtonComponent
                    btnText={heading == "Rename File" ? "Rename" : "Create Note"}
                    handleClick={handleRename}
                    styles={{
                        width: "120px",
                        height: "36px",
                        backgroundColor: colors.button.primary,
                        color: "white",
                        borderRadius: "6px",
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        "&:hover": {
                            backgroundColor: colors.button.primaryHover,
                            boxShadow: darkMode ? "0 2px 4px rgba(0,0,0,0.3)" : "0 2px 4px rgba(0,0,0,0.1)",
                            transform: "translateY(-1px)"
                        },
                        "&:active": {
                            backgroundColor: darkMode ? "#5B21B6" : "#1D4ED8",
                            transform: "translateY(0)"
                        },
                        "&.Mui-disabled": {
                            backgroundColor: darkMode ? "#4B5563" : "#E5E7EB",
                            color: darkMode ? "#9CA3AF" : "#94A3B8",
                        }
                    }}
                />
            </DialogActions>
        </Dialog>
    );
};

