    import { create } from "zustand";
    import { AddNoteSummary, FetchNoteSummary } from "../api";
    import { useLoginStore } from "./loginStore";
    import { useNavbarStore } from "./navbarStore";


    export const useTextEditorStore = create((set, get) => ({
        tabSaved: true,
        notesummary: {},
        loaders: {
            textEditorLoading: false
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
            const { onLoadersChange, notesummary } = get();
            console.log(notesummary )
            if (!notesummary[noteId]) { 
                onLoadersChange("textEditorLoading", true);
                const response = await FetchNoteSummary(loginId, noteId);
                if (response?.data?.notes) {
                    const updatedData = { ...notesummary,[noteId]: response?.data?.notes };
                    set({ notesummary: updatedData });
                }
                else {
                    const updatedData = { ...notesummary, [noteId]: "<p>Start Writing...</p>" };
                    set({ notesummary: updatedData });
                }
                onLoadersChange("textEditorLoading", false);
                return response;
            } else {
                return { data: { notes: notesummary[noteId] } };
            }
        },

        addNoteContent: async () => {
            const { loginId } = useLoginStore.getState();
            const { noteId } = useNavbarStore.getState();
            const { notesummary } = get();
            const notes = localStorage.getItem(`editorContent`);
            const response = await AddNoteSummary(loginId, noteId, notes);
            const updatedData = { ...notesummary, [noteId]: notes };
            set({ tabSaved: true, notesummary:updatedData });
            return response;
        }

    }))