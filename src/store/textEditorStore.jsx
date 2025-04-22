import { create } from "zustand";


export const useTextEditorStore = create((set, get) => ({
    isSideBarOpen: false,
    darkMode: true,

}))