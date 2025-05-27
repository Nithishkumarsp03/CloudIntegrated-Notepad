import { create } from "zustand";
import { AddNoteSummary, FetchNoteSummary } from "../api";
import { useLoginStore } from "./loginStore";


export const useTextEditorStore = create((set, get) => ({
    tabSaved: true,
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
        const { onLoadersChange } = get();
        let storedData = localStorage.getItem("notesummary");
        let data = storedData ? JSON.parse(storedData) : {};
        if (!data[noteId]) {
            onLoadersChange("textEditorLoading", true);
            const response = await FetchNoteSummary(loginId, noteId);
            if (response?.data?.notes) {
                const updatedData = { ...data, [noteId]: response.data.notes };
                localStorage.setItem("notesummary", JSON.stringify(updatedData));
            }
            else {
                const updatedData = { ...data, [noteId]: "<p>Start Writing...</p>" };
                localStorage.setItem("notesummary", JSON.stringify(updatedData));
            }
            onLoadersChange("textEditorLoading", false);
            return response;
        } else {
            return {
                data: {
                    notes: data[noteId]
                }
            };
        }
    },


    addNoteContent: async (noteId, notes) => {
        const { loginId } = useLoginStore.getState();
        const response = await AddNoteSummary(loginId, noteId, notes);
        const storedData = localStorage.getItem("notesummary");
        const data = storedData ? JSON.parse(storedData) : {};
        const updatedData = { ...data, [noteId]: notes };
        localStorage.setItem("notesummary", JSON.stringify(updatedData));
        set({ tabSaved: true });
        return response;
    }

}))