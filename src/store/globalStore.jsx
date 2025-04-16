import { create } from "zustand";
import { tabsData } from "../utils";

const useEditorStore = create((set, get) => ({
    userDetails:{},
    isSidebarOpen: false, 
    data: [], 
    search: "", 
    darkMode: true,
    charactersTotalCount: 0,
    isLoading: false,
    
    getNote: () => {
        set({ isLoading: true });
        setTimeout(() => {
            set({isLoading:false})
        },3000)
    },
    
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

    addNewTab: (name) => {
        const today = new Date();
        const todayDateStr = today.toDateString();

        set((state) => {
            const existingIndex = state.data.findIndex(tab => {
                const tabDateStr = new Date(tab.date).toDateString();
                return tabDateStr === todayDateStr;
            });

            if (existingIndex !== -1) {
                const updatedTabs = [...state.data];
                updatedTabs[existingIndex].data.push({
                    id: Math.random(),
                    title: name,
                    content: ''
                });
                return { data: updatedTabs };
            } else {
                const newTab = {
                    id: Math.random(),
                    date: today.toISOString(), 
                    data: [
                        {
                            id: Math.random(),
                            title: name,
                            content: ''
                        }
                    ]
                };
                return { data: [...state.data, newTab] };
            }
        });
    },

    getHeading: (isoDateString) => {
        const entryDate = new Date(isoDateString);
        const today = new Date();

        today.setHours(0, 0, 0, 0);
        entryDate.setHours(0, 0, 0, 0);

        const diffInDays = Math.round((today - entryDate) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return 'Yesterday';
        return `${diffInDays} days ago`;
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
