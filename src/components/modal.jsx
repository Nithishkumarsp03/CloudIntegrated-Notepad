import React, { useState } from 'react';
import { Button, TextField, useMediaQuery } from "@mui/material";
import useEditorStore from "../store/globalStore";

const Modal = ({ isOpen, onClose, onInsertLink,content,isContent }) => {
    const { darkMode } = useEditorStore();
    const [linkText, setLinkText] = useState('');
    const [linkUrl, setLinkUrl] = useState('https://');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (linkUrl) {
            onInsertLink({
                url: linkUrl,
                text:linkText
            });
            onClose();
        }
    };

    if (!isOpen) return null;



    return (
        <div className="fixed border-0 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            {!isContent ? <>
                <div
                    className={`relative w-full max-w-md mx-4 p-6 border-0 rounded-lg shadow-xl ${darkMode ? "bg-gray-900" : "bg-white"}`}
                    style={{
                        border: darkMode ? "1px solid #4B5563" : "1px solid #D1D5DB"
                    }}
                >
                    <button
                        onClick={onClose}
                        className={`absolute top-4 right-4 text-2xl font-bold ${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"}`}
                        aria-label="Close"
                    >
                        &times;
                    </button>

                    <h2 className={`text-xl font-bold mb-4 ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
                        Insert Link
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="link-text"
                                className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                            >
                                Link Text (optional)
                            </label>
                            <TextField
                                id="link-text"
                                type="text"
                                value={linkText}
                                onChange={(e) => setLinkText(e.target.value)}
                                fullWidth
                                size="small"
                                sx={{
                                    '& .MuiInputBase-root': {
                                        color: darkMode ? "#E5E7EB" : "#1F2937",
                                        backgroundColor: darkMode ? "#374151" : "white",
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: darkMode ? "#4B5563" : "#D1D5DB",
                                        },
                                        '&:hover fieldset': {
                                            borderColor: darkMode ? "#6B7280" : "#9CA3AF",
                                        },
                                    },
                                }}
                                placeholder="Display text"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="link-url"
                                className={`block mb-2 text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                            >
                                URL*
                            </label>
                            <TextField
                                id="link-url"
                                type="url"
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                                fullWidth
                                size="small"
                                required
                                sx={{
                                    '& .MuiInputBase-root': {
                                        color: darkMode ? "#E5E7EB" : "#1F2937",
                                        backgroundColor: darkMode ? "#374151" : "white",
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: darkMode ? "#4B5563" : "#D1D5DB",
                                        },
                                        '&:hover fieldset': {
                                            borderColor: darkMode ? "#6B7280" : "#9CA3AF",
                                        },
                                    },
                                }}
                                placeholder="https://example.com"
                            />
                        </div>


                        <div className="flex justify-end space-x-3">
                            <Button
                                variant="text"
                                onClick={onClose}
                                sx={{
                                    color: darkMode ? "#9CA3AF" : "#6B7280",
                                    textTransform: 'none'
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: darkMode ? "#6D28D9" : "#7C3AED",
                                    '&:hover': {
                                        backgroundColor: darkMode ? "#5B21B6" : "#6D28D9",
                                    },
                                    textTransform: 'none'
                                }}
                            >
                                Insert Link
                            </Button>
                        </div>
                    </form>
                </div>
            </>
                :
                <>
                {content}
                </>
            }
            </div>
    );
};

export default Modal;