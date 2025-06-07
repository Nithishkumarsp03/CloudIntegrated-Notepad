    import { create } from "zustand";
    import { AddNoteSummary, FetchNoteSummary } from "../api";
    import { useLoginStore } from "./loginStore";
    import { useNavbarStore } from "./navbarStore";


    export const useTextEditorStore = create((set, get) => ({
        tabSaved: true,
        notesummary: {},
        notesLoading:{},
        loaders: {
            textEditorLoading: false,
            saveEditorLoading:false
        },

        onNotesLoading: (key, bool) => {
            set((state) => ({
                notesLoading: {
                    ...state.notesLoading,
                    [key]: bool, 
                }
            }));
        },
          
        onEditorChange: (key, value) => {
            set({ [key]: value });
        },

        onLoadersChange: (key, value) => {
            set((state) => ({
                ...state,
                loaders: {
                    ...state.loaders,
                    [key]: value,
                },
            }));
        },

        getNoteContent: async (loginId, noteId) => {
            const { onNotesLoading, notesummary } = get();
            onNotesLoading(noteId, true);
            if (!notesummary[noteId]) { 
                const response = await FetchNoteSummary(loginId, noteId);
                if (response?.data?.notes) {
                    const updatedData = { ...notesummary,[noteId]: response?.data?.notes };
                    set({ notesummary: updatedData });
                }
                else {
                    const updatedData = { ...notesummary, [noteId]: "<p>Start Writing...</p>" };
                    set({ notesummary: updatedData });
                }
                onNotesLoading(noteId, false);
                return response;
            } else {
                onNotesLoading(noteId, false);
                const data = { data: { notes: notesummary[noteId] } };
                return data;
            }
        },

        addNoteContent: async (data) => {
            let notes = data;
            if (!notes) {
                notes = localStorage.getItem("editorContent");
            }
            set({ saveEditorLoading: true });
            const { loginId } = useLoginStore.getState();
            const { noteId } = useNavbarStore.getState();
            const { notesummary, tabSaved } = get();
            if (!tabSaved) {
                const response = await AddNoteSummary(loginId, noteId, notes);
                const updatedData = { ...notesummary, [noteId]: notes };
                set({ tabSaved: true, notesummary: updatedData });
                set({ saveEditorLoading: false });
                return response;
            }
            set({ saveEditorLoading: false });
        }

    }))