import axios from "axios";
import { create } from "zustand";

export const useLoginStore = create((set, get) => ({
    isUserLoggedIn: false,
    userName: localStorage.getItem("userName"),
    email: localStorage.getItem("email"),
    gender: localStorage.getItem("gender"),
    password: localStorage.getItem("password"),
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

    setLocalStorage: (key, value) => {
        localStorage.setItem(key, value);
    },

    authentication: async (type, email, password, name) => {
        const { login, onChange } = get();
        if (name) {
            localStorage.setItem("userName", name);
        }
        localStorage.setItem("email", email);
        localStorage.setItem("password", password)
        set({ userName: name, email: email, password: password });  
        if (type === "login") {
            if (!email || !password) {
                return { state: false, message: "Email or password is Invalid" };
            }
            const response = await login();
            return response;
        }
        else {
            onChange("twoFa", false);
            if (!name || !email || !password) {
                return { state: false, message: "Email or password is Invalid" };
            }
            return;
        }
    },


    getOnBoardingFlow: async () => {
        const { userName, email, password } = get();
        if (!userName || !email || !password) {
            return { state: false, message:"Email or password is Invalid" };
        }
        try {   
            set(state => ({
                loaders: { ...state.loaders, isFlowLoading: true }
            }));
            const response = await axios.get("https://backend-notepad.vercel.app/notepad/v1/api/auth/fetchcategory");
            set({ onBoardingData: response.data });
            return { state:true,data: response.data };
        } catch (err) {
            return { state: false ,response:"Some error occured.Try again"};
        } finally {
            set(state => ({
                loaders: { ...state.loaders, isFlowLoading: false }
            }));
        }
    },

    register: async () => {
        const { userName, email, password, twoFa, gender, categoryId, setLocalStorage } = get();
        console.log(userName, email, password, twoFa, gender, categoryId)
        let response;
        const g = gender === "male" ? "M" : gender === "female" ? "F" : "other";
        try {
            set(state => ({
                loaders: { ...state.loaders, isRegisterLoading: true }
            }));

            response = await axios.post("https://backend-notepad.vercel.app/notepad/v1/api/auth/register", {
                name: userName,
                email: email,
                password: password,
                twofa: twoFa,
                gender: g,
                category_id: categoryId
            });
            set({
                token: response?.data?.token,
                isUserLoggedIn: true
            });

            setLocalStorage("token", response?.data?.token);
            set({ isUserLoggedIn: true })
            return { status: true, message: response?.data?.message };
        } catch (err) {
            return { status: false, message:err?.response?.data?.message};
        } finally {
            set(state => ({
                loaders: { ...state.loaders, isRegisterLoading: false }
            }));
        }
    },

    login: async () => {
        const { email, password, setLocalStorage } = get();
        console.log(email,password)
        try {
            set(state => ({
                ...state,
                loaders: { ...state.loaders, isLoginLoading: true },
                firstLogin: true
            }));

            const response = await axios.post("https://backend-notepad.vercel.app/notepad/v1/api/auth/login", {
                email: email,
                password: password
            });

            if (response?.data?.["two-fa"]) {
                setLocalStorage("twoStepToken", response?.data?.["two-fa"]);
                setLocalStorage("otpToken", response?.data?.otpToken);
                setLocalStorage('otpResponseReceived', 'true');
                return { state: false, twoFa: true };
            } else {
                const userData = response?.data?.userData;
                setLocalStorage("token", response?.data?.token);
                setLocalStorage("userName", userData?.name);
                setLocalStorage("gender", userData?.gender)
                set({ isUserLoggedIn: true, twoFa: true });
                return { state: true, message:response?.data?.message };
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
        const { email, setLocalStorage } = get();
        setLocalStorage("email", email);
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
            const userData = response?.data?.userData;
            setLocalStorage("token", response?.data?.token);
            setLocalStorage("token", response?.data?.token);
            setLocalStorage("userName", userData?.name);
            setLocalStorage("gender", userData?.gender)
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