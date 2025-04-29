import axios from "axios";
import { create } from "zustand";
import { Authentication, OnboardingFlow, TwoStepAuth } from "../api";

export const useLoginStore = create((set, get) => ({
    isUserLoggedIn: false,
    userName: localStorage.getItem("userName"),
    email: localStorage.getItem("email"),
    gender: localStorage.getItem("gender"),
    password: localStorage.getItem("password"),
    twoFa: localStorage.getItem("twoFa"),
    notification: true,
    categoryId: localStorage.getItem("categoryId"),
    onBoardingData: [],
    firstLogin: false,
    loaders: {
        isFlowLoading: false,
        isRegisterLoading: false,
        isLoginLoading: false,
        isTwoStepLoading: false
    },

    resetAll: () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("email");
        localStorage.removeItem("gender");
        localStorage.removeItem("twoFa");
        localStorage.removeItem("otpToken");
        localStorage.removeItem("twoStepToken");
        set({
            loginName: "",
            loginEmail: "",
            loginPass: "",
            loginConfirmPass: "",
            twoFa:false
        })
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
            const response = await OnboardingFlow();        
            return response;
    },

    twoStepAuth: async (otp) => {
        const response = await TwoStepAuth(otp);
        return response;
    },

    loginId: localStorage.getItem("loginId"),
    token: localStorage.getItem("token"),
    otpToken: localStorage.getItem("otpToken"),
}));

export const loginStore = useLoginStore.getState;