import { create } from "zustand";
import { tabsData } from "./utils";

const useEditorStore = create((set, get) => ({
    isSidebarOpen: true, // State for sidebar visibility
    data: tabsData, // State for storing data
    search: "", // State for search functionality
    darkMode: false,
    
    setDarkMode: () => {
        const { darkMode } = get();
        set({ darkMode: !darkMode });
    },

    // Set initial data from tabsData
    setData: () => {
        set({ data: tabsData });
    },

    // Delete an item from the data
    deleteData: (timeIndex, itemIndex) => {
        const { data } = get();
        const newData = data.map((timeSlot) => {
            if (timeSlot.id === timeIndex) {
                // Filter out the item with the matching itemIndex
                return {
                    ...timeSlot,
                    data: timeSlot.data.filter((item) => item.id !== itemIndex),
                };
            }
            return timeSlot; // Return unchanged timeSlot if id doesn't match
        });
        set({ data: newData });
    },

    renameData: (timeIndex, itemIndex, value) => {
        const { data } = get();
        const newData = data.map((timeSlot) => {
            if (timeSlot.id === timeIndex) {
                // Filter out the item with the matching itemIndex
                return {
                    ...timeSlot,
                    data: timeSlot.data.map((item) => {
                        if (item.id === itemIndex) {
                            return (
                                {...item, title: value }
                            )
                        }
                        return item;
                    }),
                };
            }
            return timeSlot; // Return unchanged timeSlot if id doesn't match
        });
        console.log(newData,timeIndex,itemIndex)
        set({ data: newData });
    },

    // Toggle sidebar visibility
    setIsSideBarOpen: () => {
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
    },

    // Update search term
    setSearch: (val) => {
        set({ search: val });
    },
}));

export default useEditorStore;