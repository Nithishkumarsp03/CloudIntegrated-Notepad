import { create } from "zustand";
import { tabsData } from "./utils";

const useEditorStore = create((set, get) => ({
    isUserLoggedIn: true,
    userDetails:{},
    isSidebarOpen: false, 
    data: tabsData, 
    search: "", 
    darkMode: true,
    charactersTotalCount: 0,
    
    setCharacterCount: (value) => {
        set({ charactersTotalCount: value });
    },
    
    setDarkMode: () => {
        const { darkMode } = get();
        document.documentElement.classList.toggle("dark");
        set({ darkMode: !darkMode });
    },

    setData: () => {
        set({ data: tabsData });
    },

    deleteData: (timeIndex, itemIndex) => {
        const { data } = get();
        const newData = data.map((timeSlot) => {
            if (timeSlot.id === timeIndex) {
                return {
                    ...timeSlot,
                    data: timeSlot.data.filter((item) => item.id !== itemIndex),
                };
            }
            return timeSlot; 
        });
        set({ data: newData });
    },

    renameData: (timeIndex, itemIndex, value) => {
        const { data } = get();
        const newData = data.map((timeSlot) => {
            if (timeSlot.id === timeIndex) {
                return {
                    ...timeSlot,
                    data: timeSlot.data.map((item) => {
                        if (item.id === itemIndex) {
                            return (
                                { ...item, title: value }
                            )
                        }
                        return item;
                    }),
                };
            }
            return timeSlot;
        });
        console.log(newData,timeIndex,itemIndex)
        set({ data: newData });
    },

    setIsSideBarOpen: () => {
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
    },

    setSearch: (val) => {
        set({ search: val });
    },
}));

export default useEditorStore;
