import React, { useState, useEffect, useCallback } from "react";
import { useMediaQuery } from "@mui/material";
import useEditorStore from "../../store/globalStore";
import { useNavbarStore } from "../../store/navbarStore";
import MobileHeader from "./components/mobileHeader";
import NoteActions from "./components/noteActions";
import NotesList from "./components/notesList";
import NotesMenu from "./components/notesMenu";
import { useNavigate } from "react-router-dom";
import { RenameModal, Snackbar, cn } from "../../components";
import secureLocalStorage from "react-secure-storage";

export const Navbar = ({ notePad }) => {

    const [id, setId] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openRenameModal, setOpenRenameModal] = useState({ state: false, uuid: '', note_name: '' });
    const [newNote, setNewNote] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        variant: 'info'
    });

    const isMobile = useMediaQuery('(max-width: 768px)');
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    // store
    const getNotes = useNavbarStore(e => e.getNotes);
    const data = useNavbarStore(e => e.data);
    const loaders = useNavbarStore(e => e.loaders);
    const addNote = useNavbarStore(e => e.addNote);
    const editNote = useNavbarStore(e => e.editNote);
    const deleteNote = useNavbarStore(e => e.deleteNote);
    const searchquery = useNavbarStore(e => e.searchquery);
    const onNavbarChange = useNavbarStore(e => e.onNavbarChange);
    const noteId = useNavbarStore(e => e.noteId);
    const notePadVisited = useNavbarStore(e => e.notePadVisited);
    const isSidebarOpen = useNavbarStore(e => e.isSidebarOpen);

    const handleNavigate = useCallback((uuid, noteId) => {
        onNavbarChange("noteId", noteId);
        onNavbarChange("currentNote", uuid);
        if (uuid) {
            onNavbarChange("currentNote", uuid);
            navigate(`/note-pad/${uuid}`);
        }
    }, [navigate, onNavbarChange]);

    useEffect(() => {
        async function getNote() {
            const response = await getNotes();
            const localUuid = secureLocalStorage.getItem("uuid");
            if (localUuid && noteId && !notePad) {
                handleNavigate(localUuid, noteId);
                onNavbarChange("currentNote", localUuid);
                setId(localUuid);
                onNavbarChange("noteId", noteId);
            }
            else if (!notePad) {
                setId(response?.data?.notes[0]?.uuid);
                onNavbarChange("currentNote", response?.data?.note[0]?.uuid);
                onNavbarChange("noteId", response?.data?.notes[0]?.id);
            }

        }
        if (!notePadVisited) {
            getNote();
        }
        if (notePadVisited && !notePad) {
            const localUuid = secureLocalStorage.getItem("uuid");
            setId(localUuid);
            onNavbarChange("noteId", noteId);
        }
    }, []);

    const filteredData = data.filter(item =>
        item.note_name?.toLowerCase().includes(searchquery.toLowerCase())
    );


    const handleMenuClick = (event, uuid, note_name) => {
        setAnchorEl(event.currentTarget);
        setOpenRenameModal({ state: false, uuid, note_name });
    };


    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRename = () => {
        setOpenRenameModal(p => ({
            ...p,
            state: true,
        }));
        handleMenuClose();
    };

    const handleDelete = () => {
        deleteNote(openRenameModal.uuid)
            .then(response => {
                if (response?.state) {
                    showSnackbar('Note deleted successfully', 'success');
                } else {
                    showSnackbar(response?.error || 'Failed to delete note', 'error');
                }
            })
            .catch(error => {
                showSnackbar(error.message || 'An error occurred while deleting', 'error');
            });
        handleMenuClose();
    };

    const handleRenameSave = (newName) => {
        setOpenRenameModal(p => ({
            ...p,
            state: false,
            note_name: ''
        }));
        editNote(newName, openRenameModal.uuid)
            .then(response => {
                if (response?.state) {
                    showSnackbar('Note renamed successfully', 'success');
                } else {
                    showSnackbar(response?.error || 'Failed to rename note', 'error');
                }
            })
            .catch(error => {
                showSnackbar(error.message || 'An error occurred while renaming', 'error');
            });
    };

    const handleAddNote = (noteName) => {
        setNewNote(false);
        addNote(noteName)
            .then(response => {
                if (response?.state) {
                    showSnackbar('Note added successfully', 'success');
                } else {
                    showSnackbar(response?.error || 'Failed to add note', 'error');
                }
            })
            .catch(error => {
                showSnackbar(error.message || 'An error occurred while adding the note', 'error');
            });
    };

    const showSnackbar = (message, variant = 'info') => {
        setSnackbar({
            open: true,
            message,
            variant
        });
    };

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <>
            <div
                className={cn(
                    "flex-shrink-0 h-screen overflow-hidden py-4 box-border border-r border-gray-200 dark:border-gray-800 bg-gradient-to-b from-blue-50 flex flex-col to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg transition-all duration-300 ease-in-out",
                    {
                        "w-[280px]": !isSidebarOpen && !isMobile,
                        "w-0 border-r-0": isSidebarOpen && !isMobile,
                        "fixed inset-y-0 left-0 z-50 w-[280px] lg:relative lg:inset-auto": isMobile,
                        "-translate-x-full lg:translate-x-0": isMobile && isSidebarOpen,
                    }
                )}
            >
                <div className="h-full flex flex-col">
                    {isMobile && !isSidebarOpen && (
                        <MobileHeader
                        />
                    )}

                    <NoteActions
                        notePad={notePad}
                        loading={loaders.isAddLoading}
                        setNewNote={setNewNote}
                        newNote={newNote}
                    />

                    <NotesList
                        filter={filteredData}
                        handleuuid={handleNavigate}
                        id={id}
                        setId={setId}
                        isMobile={isMobile}
                        handleMenuClick={handleMenuClick}
                        loading={loaders.isNotesLoading}
                    />
                </div>

                <NotesMenu
                    anchorEl={anchorEl}
                    open={open}
                    handleMenuClose={handleMenuClose}
                    handleRename={handleRename}
                    handleDelete={handleDelete}
                />

                <RenameModal
                    open={openRenameModal.state}
                    onClose={() => setOpenRenameModal(p => ({ ...p, state: false }))}
                    onRename={handleRenameSave}
                    mobile={isMobile}
                    value={openRenameModal.note_name}
                />
            </div>

            <RenameModal
                open={newNote}
                onClose={() => setNewNote(false)}
                heading="New Note"
                placeholder="Enter Note Name"
                onRename={handleAddNote}
            />

            <Snackbar
                open={snackbar.open}
                onClose={handleSnackbarClose}
                message={snackbar.message}
                variant={snackbar.variant}
                vertical="bottom"
                horizontal="right"
                autoHideDuration={4000}
            />
        </>
    );
};

