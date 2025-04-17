import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from "@mui/material";
import useEditorStore from "../globalStore";

const RenameModal = ({ open, onClose, onRename }) => {
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
            sx={{
                "& .MuiPaper-root": {
                    backgroundColor: darkMode ? "#1F2937" : "#fff",
                    color: darkMode ? "#fff" : "#000",
                }
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleRename();
                }
            }}
        >
            <DialogTitle sx={{ color: darkMode ? "#fff" : "#000" }}>
                Rename
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="New Name"
                    type="text"
                    fullWidth
                    value={newName}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        style: { color: darkMode ? "#bbb" : "#000" }
                    }}
                    sx={{
                        input: {
                            color: darkMode ? "#fff" : "#000",
                        },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: darkMode ? "#555" : "#ccc",
                            },
                            "&:hover fieldset": {
                                borderColor: darkMode ? "#888" : "#888",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: darkMode ? "#1e88e5" : "#1976d2",
                            },
                        },
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" sx={{ color: darkMode ? "#bbb" : "#000" }}>
                    Cancel
                </Button>
                <Button
                    onClick={handleRename}
                    color="primary"
                    disabled={!newName.trim()}
                    sx={{
                        backgroundColor: newName.trim() ? (darkMode ? "#1e88e5" : "#6B7280") : "#374151",
                        color: "#fff",
                        "&:hover": {
                            backgroundColor: newName.trim() ? (darkMode ? "#1565c0" : "#115293") : "#374151",
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
