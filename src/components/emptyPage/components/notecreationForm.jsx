import React, { useRef, useEffect } from 'react';
import { Add } from '@mui/icons-material';
import { InputField } from '../../inputFields';
import { ButtonComponent } from '../../button';
import { useNavbarStore } from '../../../store/navbarStore';
import { useNavigate } from 'react-router-dom';
import useEditorStore from '../../../store/globalStore';

export const NoteCreationForm = () => {

    // states
    const [showInput, setShowInput] = React.useState(false);
    const [noteName, setNoteName] = React.useState("");

    // ref
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // store
    const loaders = useNavbarStore(e => e.loaders);
    const addNote = useNavbarStore(e => e.addNote);
    const addNewTab = useEditorStore(e => e.addNewTab);

    const handleCreateNote = async () => {
        if (noteName && noteName.trim() !== '') {
            addNewTab(noteName);
            setNoteName('');
            await addNote(noteName);
            navigate(`/`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCreateNote();
        } else if (e.key === 'Escape') {
            setShowInput(false);
        }
    };

    return (
        <>
            {showInput ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 animate-fadeIn">
                    <InputField
                        autofocus
                        ref={inputRef}
                        type='text'
                        placeholder={"Enter Note Name"}
                        value={noteName}
                        onChange={(e) => setNoteName(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />

                    <div>
                        <ButtonComponent
                            loading={loaders.isAddLoading}
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
                        handleClick={() => setShowInput(!showInput)}
                    />
                </div>
            )}
        </>
    );
};

