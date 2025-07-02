    import { create } from "zustand";
    import { useLoginStore } from './loginStore';
    import { AddNote, DeleteNote, EditNote, GetNotes } from "../api";

export const useNavbarStore = create((set, get) => ({
    isSideBarOpen: false,
    data: [],
    currentNote:"",
    notePadVisited:false,
    searchquery: "",
    noteId:localStorage.getItem("note_id"),
    loaders: {
        isNotesLoading: false,
        isAddLoading: false,
        isEditLoading: false,
        isDeleteLoading: false
    },

    onNavbarChange: (key, value) => {
        set({ [key]: value });
    },

    setLoading: (loader, state) => {
        set(p => ({ ...p, loaders: { ...p.loaders, [loader]: state } }));
    },

    getNotes: async () => {
        const { loginId } = useLoginStore.getState();
        const { setLoading } = get();
        setLoading("isNotesLoading", true);
        const response = await GetNotes(loginId);
        if (response?.data?.notes) {
            set({ data: response?.data?.notes });
        }
        setLoading("isNotesLoading", false);
        return response;
    },

    addNote: async (notename) => {
        const { loginId } = useLoginStore.getState();
        const { setLoading, data } = get();
        setLoading("isAddLoading", true);
        const response = await AddNote(loginId, notename);
        if (response?.data?.note) {
            const newData = Array.isArray(data) && data.length > 0
                ? [...data, response.data.note]
                : [response.data.note];
            set({ data: newData });
        }
        setLoading("isAddLoading", false);
        return response;
        },

        editNote: async (noteTitle, uuid) => {
            const { setLoading, data } = get();
            const originalData = [...data];
            const updatedData = data.map(item =>
                item.uuid === uuid ? { ...item, note_name: noteTitle } : item
            );
            set({ data: updatedData });
                setLoading("isEditLoading", true);
                const response = await EditNote(uuid, noteTitle);
                if (!response?.state) {
                    set({ data: originalData });
                }
                setLoading("isEditLoading", false);
            return response;
        },

        deleteNote: async (uuid) => {
            const { setLoading, data } = get();
            const originalData = [...data];
            const updatedData = data.filter(item => item.uuid !== uuid);
            set({ data: updatedData });
                setLoading("isDeleteLoading", true);
                const response = await DeleteNote(uuid);
                if (!response?.state) {
                    set({ data: originalData });
                }
                setLoading("isDeleteLoading", false);
            return response;
        }
    }));