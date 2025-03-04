import { create } from "zustand";

const useEditorStore = create((set) => ({
    login: { userName: "", password: "" },

    tabs: [
        { id: 1, title: "Tab 1", content: "Page 1" },
        { id: 2, title: "Tab 2", content: "Page 2" },
        { id: 3, title: "Tab 3", content: "Page 3" },
    ],

    setTab: (id, title) =>
        set((state) => ({
            tabs: [...state.tabs, { id, title, content: "" }],
        })),

    updateTabTitle: (id, title) =>
        set((state) => ({
            tabs: state.tabs.map((tab) => (tab.id === id ? { ...tab, title } : tab)),
        })),

    updateTabContent: (id, content) =>
        set((state) => ({
            tabs: state.tabs.map((tab) => (tab.id === id ? { ...tab, content } : tab)),
        })),

    deleteTab: (id) =>
        set((state) => ({
            tabs: state.tabs.filter((tab) => tab.id !== id),
        })),

    setUserName: (userName) =>
        set((state) => ({ login: { ...state.login, userName } })),

    setPassword: (password) =>
        set((state) => ({ login: { ...state.login, password } })),
}));

export default useEditorStore;
