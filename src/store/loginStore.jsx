import axios from "axios";
import { create } from "zustand";

export const useLoginStore = create((set, get) => ({
    isUserLoggedIn: false,
    loginName: "",
    loginEmail: "",
    loginPass: "",
    loginConfirmPass: "",
    userName: localStorage.getItem("userName"),
    email: localStorage.getItem("email"),
    gender: localStorage.getItem("gender"),
    phone: "add a phone number",
    twoFa: false,
    notification: true,
    categoryId: "",
    onBoardingData: [],
    firstLogin: false,
    loaders: {
        isFlowLoading: false,
        isRegisterLoading: false,
        isLoginLoading: false,
        isTwoStepLoading: false
    },

    resetAll: () => {
        localStorage.removeItem("email");
        set({
            loginName: "",
            loginEmail: "",
            loginPass: "",
            loginConfirmPass: "",
        })
    },

    onChange: (key, value) => {
        set({ [key]: value })
    },

    getOnBoardingFlow: async () => {
        const { loginName, loginEmail, loginPass } = get();
        console.log(loginName, loginEmail, loginPass)
        if (!loginName || !loginEmail || !loginPass) {
            return { state: false };
        }

        try {
            set(state => ({
                loaders: { ...state.loaders, isFlowLoading: true }
            }));

            const response = await axios.get("https://backend-notepad.vercel.app/notepad/v1/api/auth/fetchcategory");
            set({ onBoardingData: response.data });
            return { state:true,data: response.data };
        } catch (err) {
            return { state: false };
        } finally {
            set(state => ({
                loaders: { ...state.loaders, isFlowLoading: false }
            }));
        }
    },

    register: async () => {
        const { loginName, loginEmail, loginPass, twoFa, gender, categoryId } = get();
        const g = gender === "male" ? "M" : gender === "female" ? "F" : "other";
        localStorage.setItem("userName", loginName);
        localStorage.setItem("email", loginEmail);
        localStorage.setItem("gender", gender)
        try {
            set(state => ({
                loaders: { ...state.loaders, isRegisterLoading: true }
            }));

            const response = await axios.post("https://backend-notepad.vercel.app/notepad/v1/api/auth/register", {
                name: loginName,
                email: loginEmail,
                password: loginPass,
                twofa: twoFa,
                gender: g,
                category_id: categoryId
            });

            set({
                token: response.data.token,
                isUserLoggedIn: true
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("isUserLoggedIn", "true");
            set({isUserLoggedIn:true})
            return { status: true, message: response.data.message };
        } catch (err) {
            return { status: false, message: err };
        } finally {
            set(state => ({
                loaders: { ...state.loaders, isRegisterLoading: false }
            }));
        }
    },

    login: async () => {
        const { loginEmail, loginPass } = get();
        localStorage.setItem("email", loginEmail);
        try {
            set(state => ({
                ...state,
                loaders: { ...state.loaders, isLoginLoading: true },
                firstLogin: true
            }));

            const response = await axios.post("https://backend-notepad.vercel.app/notepad/v1/api/auth/login", {
                email: loginEmail,
                password: loginPass
            });


            if (response?.data?.["two-fa"]) {
                localStorage.setItem("twoStepToken", response?.data?.["two-fa"]);
                localStorage.setItem("otpToken", response?.data?.otpToken);
                return { state: false, twoFa: true };
            } else {
                const userData = response.data.userData;
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userName", userData.name);
                localStorage.setItem("email", userData.email);
                localStorage.setItem("gender", userData.gender)
                set({ isUserLoggedIn: true, twoFa: true });
                return { state: true };
            }
        } catch (err) {
            return { state: false, message: err?.response?.data?.message };
        } finally {
            set(state => ({
                ...state,
                loaders: { ...state.loaders, isLoginLoading: false },
                firstLogin: false
            }));
        }
    },

    twoStepAuth: async (otp) => {
        const { email } = get();
        const otpToken = localStorage.getItem("otpToken");
        try {
            set(state => ({
                ...state,
                loaders: { ...state.loaders, isTwoStepLoading: true },
                firstLogin: true
            }));

            const response = await axios.post(
                "https://backend-notepad.vercel.app/notepad/v1/api/auth/check-otp",
                {
                    email: email,
                    otp: otp,
                    otpToken: otpToken
                },
                {
                    headers: {
                        Authorization: `Bearer ${otpToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            set({isUserLoggedIn:true})
            return { state: true };

        }
        catch (err) {
            return { state: false, message: err?.response?.data?.message };
        }
        finally {
            set(state => ({
                ...state,
                loaders: { ...state.loaders, isTwoStepLoading: false },
                firstLogin: false
            }));
        }
    },

    loginId: "",
    token: localStorage.getItem("token"),
    otpToken: localStorage.getItem("otpToken"),
}));