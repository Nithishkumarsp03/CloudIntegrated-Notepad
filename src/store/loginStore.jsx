import { create } from "zustand";

export const useLoginStore = create((set, get) => ({
    userName: "",
    email: "",
    password: "",
    confirmPassword:"",
    twoFa: false,
    gender: "",
    categoryId: "",

    resetAll: () => {
        set({
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            twoFa: "",
            
        })
    },

    onChange: (key, value) => {
        set({ [key]: value })
    },

    loginId: "",
    token:""
}));