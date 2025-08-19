import { create } from "zustand";
import { Authentication, EditProfile, OnboardingFlow, TwoStepAuth } from "../api";
import secureLocalStorage from "react-secure-storage";

export const useLoginStore = create((set, get) => ({
    isUserLoggedIn: secureLocalStorage.getItem("isUserLoggedIn"),
    userName: secureLocalStorage.getItem("userName"),
    email: secureLocalStorage.getItem("email"),
    gender: secureLocalStorage.getItem("gender"),
    password: secureLocalStorage.getItem("password"),
    twoFa: JSON.parse(secureLocalStorage.getItem("twoFa")),
    notification: false,
    categoryId: secureLocalStorage.getItem("categoryId"),
    onBoardingData: [],
    firstLogin: false,
    loginId: secureLocalStorage.getItem("loginId"),
    token: secureLocalStorage.getItem("token"),
    otpToken: secureLocalStorage.getItem("otpToken"),
    onBoardingData: secureLocalStorage.getItem("onBoardingData"),
    timer: parseInt(secureLocalStorage.getItem("timer"), 10),
    intervalId: null,
    
    startTimer: (time) => {
        secureLocalStorage.setItem("timer", time.toString());
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
                secureLocalStorage.setItem("timer", "0");
                set({ timer: 0, intervalId: null });
            } else {
                const updatedTime = currentTime - 1;
                secureLocalStorage.setItem("timer", updatedTime.toString());
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
        secureLocalStorage.clear();
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
        secureLocalStorage.setItem(key, value);
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
                secureLocalStorage.setItem("userName", name);
            }
            secureLocalStorage.setItem("email", email);
            secureLocalStorage.setItem("password", password);
            onChange("email", email);
            onChange("password", password);
            return;
        }
        console.log(password)
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
        secureLocalStorage.setItem("onBoardingData",JSON.stringify(response));
        return response;
    },

    twoStepAuth: async (otp) => {
        const response = await TwoStepAuth(otp);
        return response;
    },

    updateProfile: async (name, email, two_fa, loginId) => {
        console.log(name,email,two_fa,loginId)
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