import axios from "axios";
import { create } from "zustand";
import { Authentication, OnboardingFlow, TwoStepAuth } from "../api";

export const useLoginStore = create((set, get) => ({
    isUserLoggedIn: localStorage.getItem("isUserLoggedIn"),
    userName: localStorage.getItem("userName"),
    email: localStorage.getItem("email"),
    gender: localStorage.getItem("gender"),
    password: localStorage.getItem("password"),
    twoFa: JSON.parse(localStorage.getItem("twoFa")),
    notification: false,
    categoryId: localStorage.getItem("categoryId"),
    onBoardingData: [],
    firstLogin: false,
    loginId: localStorage.getItem("loginId"),
    token: localStorage.getItem("token"),
    otpToken: localStorage.getItem("otpToken"),
    onBoardingData: localStorage.getItem("onBoardingData"),
    loaders: {
        isFlowLoading: false,
        isRegisterLoading: false,
        isLoginLoading: false,
        isTwoStepLoading: false
    },

    resetAll: () => {
        localStorage.clear();
        set({
            loginName: "",
            loginEmail: "",
            loginPass: "",
            loginConfirmPass: "",
            categoryId: "",
            loginId: "",
            otpToken:"",
            twoFa: false,
            token:""
        })
    },

    persistStorage: (key, value) => {
        localStorage.setItem(key, value);
        set({[key]:value})
    },

    onChangeLoaders: (key, value) => {
        set(state => ({
            loaders: {
                ...state.loaders,
                [key]: value
            }
        }))
    },

    onChange: (key, value) => {
        set({ [key]: value })
    },

    authentication: async (type, email, password, name) => {
        const { onChange } = get();
        if (type === "set") {
            if (name) {
                onChange("userName", name);
                localStorage.setItem("userName", name);
            }
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            onChange("email", email);
            onChange("password", password);
            return;
        }
        const response = await Authentication(type,password);
        return response;
    },


    getOnBoardingFlow: async () => {
        const { onBoardingData } = get();
        if (onBoardingData) {
            const data = JSON.parse(onBoardingData);
            return data;
        }
        const response = await OnboardingFlow();  
        set({ onBoardingData: response });
        localStorage.setItem("onBoardingData",JSON.stringify(response));
        return response;
    },

    twoStepAuth: async (otp) => {
        const response = await TwoStepAuth(otp);
        return response;
    },
}));

export const loginStore = useLoginStore.getState;