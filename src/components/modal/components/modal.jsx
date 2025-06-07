import React, { useState } from 'react';
import { Button, TextField } from "@mui/material";
import useEditorStore from '../../../store/globalStore';

export const LinkModal = ({ isOpen, onClose, onInsertLink, content, isContent }) => {
    const { darkMode } = useEditorStore();
    const [linkText, setLinkText] = useState('');
    const [linkUrl, setLinkUrl] = useState('https://');

    // Reset form when modal opens
    React.useEffect(() => {
        if (isOpen) {
            setLinkText('');
            setLinkUrl('https://');
        }
    }, [isOpen]);

    const handleLinkTextChange = (e) => {
        console.log('Link text changing to:', e.target.value);
        setLinkText(e.target.value);
    };

    const handleLinkUrlChange = (e) => {
        console.log('Link URL changing to:', e.target.value);
        setLinkUrl(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (linkUrl && linkUrl !== 'https://') {
            onInsertLink({
                url: linkUrl,
                text: linkText
            });
            setLinkText('');
            setLinkUrl('https://');
            onClose();
        }
    };

    const handleClose = () => {
        setLinkText('');
        setLinkUrl('https://');
        onClose();
    };

    if (!isOpen) return null;

    const colors = {
        background: darkMode ? "#111827" : "#ffffff",
        text: {
            primary: darkMode ? "#F3F4F6" : "#111827",
            secondary: darkMode ? "#D1D5DB" : "#4B5563",
            placeholder: darkMode ? "#9CA3AF" : "#6B7280"
        },
        border: {
            default: darkMode ? "#4B5563" : "#E2E8F0",
            hover: darkMode ? "#6B7280" : "#CBD5E1",
            focus: darkMode ? "#7C3AED" : "#3B82F6"
        },
        inputBg: darkMode ? "#1F2937" : "#F9FAFB",
        button: {
            primary: darkMode ? "#7C3AED" : "#2563EB",
            primaryHover: darkMode ? "#6D28D9" : "#1D4ED8",
            text: darkMode ? "#9CA3AF" : "#64748B"
        }
    };

    return (
        <div className="fixed border-0 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            {!isContent ? (
                <div
                    className={`relative w-full max-w-md mx-4 p-6 border-0 rounded-lg shadow-xl ${darkMode ? "bg-gray-900" : "bg-white"}`}
                    style={{
                        border: darkMode ? "1px solid #4B5563" : "1px solid #D1D5DB"
                    }}
                >
                    <button
                        onClick={handleClose}
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
                                onChange={handleLinkTextChange}
                                placeholder="Display text"
                                fullWidth
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    style: {
                                        color: colors.text.primary,
                                        backgroundColor: colors.inputBg,
                                    }
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: "8px",
                                        '& fieldset': {
                                            borderColor: colors.border.default,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: colors.border.hover,
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: colors.border.focus,
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        padding: '12px 14px',
                                        '&::placeholder': {
                                            color: colors.text.placeholder,
                                            opacity: 1,
                                        },
                                    },
                                }}
                            />
                        </div>

                        <div className="mb-6">
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
                                onChange={handleLinkUrlChange}
                                placeholder="https://example.com"
                                fullWidth
                                variant="outlined"
                                size="small"
                                required
                                InputProps={{
                                    style: {
                                        color: colors.text.primary,
                                        backgroundColor: colors.inputBg,
                                    }
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: "8px",
                                        '& fieldset': {
                                            borderColor: colors.border.default,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: colors.border.hover,
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: colors.border.focus,
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        padding: '12px 14px',
                                        '&::placeholder': {
                                            color: colors.text.placeholder,
                                            opacity: 1,
                                        },
                                    },
                                }}
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Button
                                variant="text"
                                onClick={handleClose}
                                sx={{
                                    color: colors.button.text,
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                    px: 2,
                                    py: 0.75,
                                    borderRadius: "6px",
                                    '&:hover': {
                                        backgroundColor: darkMode ? 'rgba(156, 163, 175, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                                    }
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={!linkUrl.trim() || linkUrl === 'https://'}
                                sx={{
                                    backgroundColor: colors.button.primary,
                                    color: "white",
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    fontSize: "0.875rem",
                                    px: 3,
                                    py: 0.75,
                                    borderRadius: "6px",
                                    '&:hover': {
                                        backgroundColor: colors.button.primaryHover,
                                        boxShadow: darkMode ? "0 2px 4px rgba(0,0,0,0.3)" : "0 2px 4px rgba(0,0,0,0.1)",
                                        transform: "translateY(-1px)"
                                    },
                                    '&:active': {
                                        transform: "translateY(0)"
                                    },
                                    '&.Mui-disabled': {
                                        backgroundColor: darkMode ? "#4B5563" : "#E5E7EB",
                                        color: darkMode ? "#9CA3AF" : "#94A3B8",
                                    }
                                }}
                            >
                                Insert Link
                            </Button>
                        </div>
                    </form>
                </div>
            ) : (
                <>{content}</>
            )}
        </div>
    );
};