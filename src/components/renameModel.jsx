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
    Checkbox
} from "@mui/material";
import useEditorStore from "../globalStore";

const RenameModal = ({ open, onClose, onRename,placeholder = "Enter new file name",heading = "Rename File" }) => {
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



    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: darkMode ? "#111827" : "#ffffff",
                    color: darkMode ? "#E5E7EB" : "#1F2937",
                    borderRadius: "6px",
                    border: darkMode ? "1px solid #4B5563" : "1px solid #D1D5DB",
                    boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)',
                    p: 2
                }
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleRename();
                }
            }}
        >
            <DialogTitle sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight={600} sx={{
                    color: darkMode ? "#F3F4F6" : "#111827",
                    fontSize: "1.125rem"
                }}>
                    {heading}
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ p: 2 }}>
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
                            style: { color: darkMode ? "#9CA3AF" : "#6B7280" },
                        }}
                        sx={{
                            '& .MuiInputBase-root': {
                                color: darkMode ? "#E5E7EB" : "#1F2937",
                                backgroundColor: darkMode ? "#1F2937" : "#F9FAFB",
                            },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: "6px",
                                '& fieldset': {
                                    borderColor: darkMode ? "#4B5563" : "#D1D5DB",
                                },
                                '&:hover fieldset': {
                                    borderColor: darkMode ? "#6B7280" : "#9CA3AF",
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: darkMode ? "#7C3AED" : "#6D28D9",
                                },
                            },
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button
                    onClick={onClose}
                    variant="text"
                    sx={{
                        color: darkMode ? "#9CA3AF" : "#6B7280",
                        textTransform: "none",
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: darkMode ? "rgba(156, 163, 175, 0.08)" : "rgba(107, 114, 128, 0.08)",
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
                        backgroundColor: darkMode ? "#7C3AED" : "#6D28D9",
                        color: "#ffffff",
                        textTransform: "none",
                        fontWeight: 500,
                        borderRadius: "8px",
                        px: 2,
                        '&:hover': {
                            backgroundColor: darkMode ? "#6D28D9" : "#5B21B6",
                        },
                        '&.Mui-disabled': {
                            backgroundColor: darkMode ? "#4B5563" : "#E5E7EB",
                            color: darkMode ? "#9CA3AF" : "#D1D5DB",
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