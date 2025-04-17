import { create } from "zustand";

export const useLoginStore = create((set, get) => ({
    isUserLoggedIn: false,
    userName: "",
    email: "",
    password: "",
    confirmPassword:"",
    twoFa: false,
    gender: "",
    categoryId: "",
    onBardingData:{},
    admins: 
        {
            user: "admin",
            email:"admin@gmail.com",
            pass:"12345"
        },

    checkUser: () => {
        const { email, password, admins } = get();
        if (!email) {
            return {state:false,message:"Enter valid Email"}
        }
        if (admins.pass === password) {
            set({isUserLoggedIn:true})
            return {state:true,message:"User Logged in"}
        }
        else {
            return {state:false,message:"Password does not match"} 
        }
    },

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

    getOnBoardingFlow: () => {

    },
    loginId: "",
    token:""
}));