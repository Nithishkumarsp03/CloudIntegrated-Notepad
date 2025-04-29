import React, { useState } from 'react';
import { Popover, Paper, ClickAwayListener } from '@mui/material';
import { TextColor } from '../../../assets';
import EditorButton from '../components/editorButton';

const ColorPopover = ({ editor }) => {
    const darkMode = document.documentElement.classList.contains("dark");
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedColor, setSelectedColor] = useState("#000000");
    const open = Boolean(anchorEl);
    const colorOptions = [
        "#000000", "#434343", "#666666", "#999999", "#b7b7b7", "#cccccc", "#d9d9d9", "#efefef", "#f3f3f3", "#ffffff",
        "#980000", "#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "#0000ff", "#9900ff", "#ff00ff",
        "#e6b8af", "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#c9daf8", "#cfe2f3", "#d9d2e9", "#ead1dc"
    ];

    const handleClick = () => {
        const button = document.querySelector('.color-picker-button');
        setAnchorEl(button);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        if (editor) {
            editor.chain().focus().setColor(color).run();
        }
        handleClose();
    };

    return (
        <div className="relative">
            <div className="color-picker-button">
                <EditorButton
                    btnText={<TextColor />}
                    handleClick={handleClick}
                    handlePressed={() => false}
                    size="small"
                />
            </div>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                PaperProps={{
                    sx: {
                        bgcolor: darkMode ? '#1F2937' : '#FFFFFF',
                        boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }
                }}
            >
                <ClickAwayListener onClickAway={handleClose}>
                    <Paper
                        className="p-2"
                        elevation={3}
                        sx={{
                            bgcolor: darkMode ? '#1F2937' : '#FFFFFF',
                            color: darkMode ? '#E5E7EB' : '#111827'
                        }}
                    >
                        <div className="flex flex-wrap gap-1 w-64">
                            {colorOptions.map((color) => (
                                <div
                                    key={color}
                                    className="w-6 h-6 cursor-pointer rounded hover:scale-110 transition-transform"
                                    style={{
                                        backgroundColor: color,
                                        border: (color === "#ffffff" || (darkMode && color === "#000000"))
                                            ? `1px solid ${darkMode ? '#4B5563' : '#e0e0e0'}`
                                            : "none",
                                        outline: color === selectedColor
                                            ? `2px solid ${darkMode ? '#60A5FA' : '#2196f3'}`
                                            : "none",
                                        outlineOffset: "2px"
                                    }}
                                    onClick={() => handleColorSelect(color)}
                                />
                            ))}
                        </div>

                        <div className="flex mt-2 justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-6 h-6 rounded"
                                    style={{
                                        backgroundColor: selectedColor,
                                        border: (selectedColor === "#ffffff" || (darkMode && selectedColor === "#000000"))
                                            ? `1px solid ${darkMode ? '#4B5563' : '#e0e0e0'}`
                                            : "none"
                                    }}
                                />
                                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {selectedColor}
                                </span>
                            </div>

                            <input
                                type="color"
                                value={selectedColor}
                                onChange={(e) => handleColorSelect(e.target.value)}
                                className="w-8 h-8 cursor-pointer"
                            />
                        </div>
                    </Paper>
                </ClickAwayListener>
            </Popover>
        </div>
    );
};

export default ColorPopover;