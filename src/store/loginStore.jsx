import { create } from "zustand";
import { Authentication, EditProfile, OnboardingFlow, TwoStepAuth } from "../api";

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