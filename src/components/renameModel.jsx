import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";

const RenameModal = ({ open, onClose, onRename }) => {
    const [newName, setNewName] = useState("");

    // Handle input change
    const handleInputChange = (event) => {
        setNewName(event.target.value);
    };

    // Handle rename action
    const handleRename = () => {
        if (newName.trim()) {
            onRename(newName); // Pass the new name to the parent component
            onClose(); // Close the modal
            setNewName(""); // Reset the input field
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth onKeyDown={(e) => {
            if (e.key === "Enter") {
                handleRename(); 
            }
        }}>
            <DialogTitle>Rename</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="New Name"
                    type="text"
                    fullWidth
                    value={newName}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleRename} color="primary" disabled={!newName.trim()}>
                    Rename
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RenameModal;