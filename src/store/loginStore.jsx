import { create } from "zustand";
import { Authentication, EditProfile, OnboardingFlow, TwoStepAuth } from "../api";

import { useSecureStorageStore } from "../hooks";

export const useLoginStore = create((set, get) => ({
    userName: useSecureStorageStore.getState().getItem("userName"),
    email: useSecureStorageStore.getState().getItem("email"),
    gender: useSecureStorageStore.getState().getItem("gender"),
    password: useSecureStorageStore.getState().getItem("password"),
    twoFa: useSecureStorageStore.getState().getItem("twoFa"),
    notification: false,
    categoryId: useSecureStorageStore.getState().getItem("categoryId"),
    onBoardingData: [],
    firstLogin: false,
    loginId: useSecureStorageStore.getState().getItem("loginId"),
    token: useSecureStorageStore.getState().getItem("token"),
    otpToken: useSecureStorageStore.getState().getItem("otpToken"),
    onBoardingData: useSecureStorageStore.getState().getItem("onBoardingData"),
    timer: parseInt(localStorage.getItem("timer"), 10),
    intervalId: null,

    startTimer: (time) => {
        localStorage.setItem("timer", time.toString());
        set({ timer: time });
        set({ intervalId: null });
        get().runTimer()
    },

    runTimer: () => {
        const { timer, intervalId } = get();

        if (intervalId || timer <= 0) return; 

        const id = setInterval(() => {
            const currentTime = get().timer;
            if (currentTime <= 1) {
                clearInterval(get().intervalId);
                localStorage.setItem("timer", "0");
                set({ timer: 0, intervalId: null });
            } else {
                const updatedTime = currentTime - 1;
                localStorage.setItem("timer", updatedTime.toString());
                set({ timer: updatedTime });
            }
        }, 1000);

        set({ intervalId: id }); 
    },

    loaders: {
        isFlowLoading: false,
        isRegisterLoading: false,
        isLoginLoading: false,
        isTwoStepLoading: false,
        isProfileLoading: false
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
        useSecureStorageStore.getState().setItem(key, value);
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
                useSecureStorageStore.getState().setItem("userName", name);
            }
            useSecureStorageStore.getState().setItem("email", email);
            useSecureStorageStore.getState().setItem("password", password);
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
        useSecureStorageStore.getState().setItem("onBoardingData",JSON.stringify(response));
        return response;
    },

    twoStepAuth: async (otp) => {
        const response = await TwoStepAuth(otp);
        return response;
    },

    updateProfile: async (name, email, two_fa, loginId) => {
        const { onChangeLoaders, persistStorage } = get();
        onChangeLoaders("isProfileLoading", true);
        const response = await EditProfile(name, email, two_fa, loginId);
        persistStorage("loginId",loginId);
        persistStorage("userName", name);
        persistStorage("email", email);
        persistStorage("twoFa", two_fa);
        onChangeLoaders("isProfileLoading", false);
        return response;
    }
}));

export const loginStore = useLoginStore.getState;