import React, { useRef, useEffect } from 'react';
import { Add } from '@mui/icons-material';
import { InputField } from '../../inputFields';
import { ButtonComponent } from '../../button';
import { useNavbarStore } from '../../../store/navbarStore';

export const NoteCreationForm = ({
    showInput,
    setShowInput,
    noteName,
    setNoteName,
    handleCreateNote,
    darkMode
}) => {
    const inputRef = useRef(null);
    const { loaders } = useNavbarStore();
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCreateNote();
        } else if (e.key === 'Escape') {
            setShowInput(false);
        }
    };

    const toggleInputField = () => {
        setShowInput(true);
    };

    useEffect(() => {
        if (showInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showInput]);

    const buttonStyles = {
        width: "fit-content",
        height: showInput ? "42px" : "44px",
        backgroundColor: darkMode ? "#7C3AED" : "#2563EB",
        color: "white",
        borderRadius: "8px",
        textTransform: "none",
        fontWeight: 500,
        fontSize: "0.875rem",
        "&:hover": {
            backgroundColor: darkMode ? "#6D28D9" : "#3B82F6",
            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)"
        },
        "&:active": {
            backgroundColor: darkMode ? "#5B21B6" : "#1D4ED8"
        }
    };

    return (
        <>
            {showInput ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 animate-fadeIn">
                    <InputField
                        ref={inputRef}
                        type='text'
                        placeholder={"Enter Note Name"}
                        value={noteName}
                        onChange={(e) => setNoteName(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />

                    <ButtonComponent
                        btnText="Create"
                        startIcon={<Add />}
                        handleClick={handleCreateNote}
                        styles={buttonStyles}
                    />
                </div>
            ) : (
                <ButtonComponent
                    btnText="Create New Note"
                    startIcon={<Add />}
                    loading={loaders.isAddLoading}
                    handleClick={toggleInputField}
                    styles={buttonStyles}
                />
            )}
        </>
    );
};

