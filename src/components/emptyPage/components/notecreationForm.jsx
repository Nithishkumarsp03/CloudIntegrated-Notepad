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

                    <div>
                    <ButtonComponent
                        btnText="Create"
                        startIcon={<Add />}
                        handleClick={handleCreateNote}
                        />
                    </div>
                </div>
            ) : (
                <div className='text-center'>
                    <ButtonComponent
                    btnText="Create New Note"
                    startIcon={<Add />}
                    loading={loaders.isAddLoading}
                    handleClick={toggleInputField}
                        />
                    </div>
            )}
        </>
    );
};

