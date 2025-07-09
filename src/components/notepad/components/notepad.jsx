import React, { useEffect, useState } from 'react'
import { Appbar } from '../../appbar';
import { Navbar } from '../../navbar';
import { useNavbarStore } from '../../../store/navbarStore';
import { NotePadImg } from '../../../assets';
import { ButtonComponent } from '../../button';
import { RenameModal } from '../../modal';
import { Snackbar } from '../../snackBar';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

export const Notepad = () => {
  const navigate = useNavigate();
  const onNavbarChange = useNavbarStore(e => e.onNavbarChange);
  const addNote = useNavbarStore(e => e.addNote);
  const [newNote, setNewNote] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    variant: 'info'
  });
  const loaders = useNavbarStore(e => e.loaders);

  const showSnackbar = (message, variant = 'info') => {
    setSnackbar({
      open: true,
      message,
      variant
    });
  };

  useEffect(() => {
    onNavbarChange("notePadVisited", true);
  }, [onNavbarChange]);

  const handleAddNote = (noteName) => {
    setNewNote(false);
    addNote(noteName)
      .then(response => {
        if (response?.state) {
          console.log(response.data)
          onNavbarChange("noteId", response?.data?.note?.id);
          navigate(`/note-pad/${response?.data?.note?.uuid}`);
          secureLocalStorage.setItem("uuid", response?.data?.note?.uuid)
          showSnackbar('Note added successfully', 'success');
        } else {
          showSnackbar(response?.error || 'Failed to add note', 'error');
        }
      })
      .catch(error => {
        showSnackbar(error.message || 'An error occurred while adding the note', 'error');
      });
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-200 dark:bg-gray-900 w-full overflow-hidden relative">
      {/* <LinkModal/> */}
      <Snackbar
        open={snackbar.open}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        variant={snackbar.variant}
        vertical="bottom"
        horizontal="right"
        autoHideDuration={4000}
      />
      <Appbar />
      <div className="flex relative w-full overflow-hidden">
        <Navbar notePad={true} />
        <div className='flex flex-col gap-6 justify-center text-center pt-12 md:p-0 h-full w-full items-center my-auto'>
          <img src={NotePadImg} alt='welcome' />
          <div className='w-full max-w-[700px] text-gray-400 mt-2'>Welcome to SPNotes! Stay organized and capture your thoughts anytime, anywhere start by creating a new notepad now.</div>
          <div className='w-60'>
            <ButtonComponent
              handleClick={() => setNewNote(true)}
              btnText='Create New Note'
              loading={loaders.isAddLoading}
            />
          </div>
        </div>
      </div>
      <RenameModal
        open={newNote}
        onClose={() => setNewNote(false)}
        heading="New Note"
        placeholder="Enter Note Name"
        onRename={handleAddNote}
      />
    </div>
  );
}

