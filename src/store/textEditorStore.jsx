import { create } from "zustand";
import { AddNoteSummary, FetchNoteSummary } from "../api";
import { useLoginStore } from "./loginStore";


export const useTextEditorStore = create((set, get) => ({
    tabSaved:true,
    loaders: {
        textEditorLoading:false
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
        onLoadersChange("textEditorLoading", true);
        const response = await FetchNoteSummary(loginId, noteId);
        onLoadersChange("textEditorLoading", false);
        return response;
    },

    addNoteContent: async (noteId, notes) => {
        const { loginId } = useLoginStore.getState();
        const response = await AddNoteSummary(loginId, noteId, notes);
        set({ tabSaved: true });    
        return response;
    }
    
}))