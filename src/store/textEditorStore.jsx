import { create } from "zustand";
import { AddNoteSummary, FetchNoteSummary } from "../api";
import { useLoginStore } from "./loginStore";

export const useTextEditorStore = create((set, get) => ({
    tabSaved: true,
    notesummary: {},
    notesLoading: {},
    linkModal: false,
    saveEditorLoading: false,
    textNoteId: -1,
    loaders: {
        textEditorLoading: false,
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
        if (notesummary[noteId]) {
            return { data: { notes: notesummary[noteId] } };
        }
        onNotesLoading(noteId, true);
        try {
            const response = await FetchNoteSummary(loginId, noteId);
            const content = response?.data?.notes || "<p>Start Writing...</p>";
            const updatedData = { ...notesummary, [noteId]: content };
            set({ notesummary: updatedData });
            onNotesLoading(noteId, false);
            return { data: { notes: content } };
        } catch (error) {
            console.error("Error fetching note:", error);
            const defaultContent = "<p>Start Writing...</p>";
            const updatedData = { ...notesummary, [noteId]: defaultContent };
            set({ notesummary: updatedData });
            onNotesLoading(noteId, false);
            return { data: { notes: defaultContent } };
        }
    },

    addNoteContent: async (notes, noteId) => {
        if (!notes || !noteId) return;

        const { notesummary, tabSaved } = get();
        const { loginId } = useLoginStore.getState();

        const updatedData = { ...notesummary, [noteId]: notes };
        set({ notesummary: updatedData });

        if (!tabSaved) {
            set({ saveEditorLoading: true });

            try {
                const response = await AddNoteSummary(loginId, noteId, notes);
                set({
                    tabSaved: true,
                    saveEditorLoading: false
                });
                return response;
            } catch (error) {
                console.error("Error saving note:", error);
                const revertedData = { ...get().notesummary };
                delete revertedData[noteId];
                set({
                    notesummary: revertedData,
                    saveEditorLoading: false
                });
                throw error;
            }
        }

        set({ saveEditorLoading: false });
    },

    updateNoteInStore: (noteId, content) => {
        const { notesummary } = get();
        const updatedData = { ...notesummary, [noteId]: content };
        set({ notesummary: updatedData });
    },

    downloadPDF: (title, content) => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text(content, 10, 10);
        doc.save(`${title || "note"}.pdf`);
      } 
      
}));