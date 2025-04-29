    import axios from "axios";
    import { useLoginStore } from "../../store/loginStore";

    export const AuthLogin = async (email, password) => {
        const { onChange, onChangeLoaders } = useLoginStore.getState(); 
        try {
            onChangeLoaders("isLoginLoading", true);
            const response = await axios.post("https://backend-notepad.vercel.app/notepad/v1/api/auth/login", {
                email,
                password
            });
            if (response?.data?.["two-fa"]) {
                localStorage.setItem("twoStepToken", response?.data?.["two-fa"]);
                localStorage.setItem("otpToken", response?.data?.otpToken);
                localStorage.setItem("otpResponseReceived", "true");
                localStorage.setItem("twoFa", "true");
                onChange("twoFa", "true");
                onChange("twoStepToken", response?.data?.["two-fa"]);
                onChange("otpToken", response?.data?.otpToken);
                return {
                    state: false,
                    twoFa: true,
                    message: "Two-Factor Authentication required",
                };
            } else {
                const token = response?.data?.token;
                const userData = response?.data?.userData;
                localStorage.setItem("token", response?.data?.token);
                localStorage.setItem("userName", userData?.name);
                localStorage.setItem("gender", userData?.gender);
                localStorage.setItem("loginId", userData?.id);
                localStorage.setItem("token", token);
                localStorage.setItem("twoFa", "false");
                onChange("twoFa", "false");
                onChange("token", response?.data?.token);
                onChange("userName", userData?.name);
                onChange("gender", userData?.gender);
                onChange("loginId", userData?.id);
                onChange("token", token);
                onChange("isUserLoggedIn", true);
                return {
                    state: true,
                    message: response?.data?.message,
                };
            }
        } catch (err) {
            return {
                state: false,
                message: err?.response?.data?.message || "Some error occurred. Try again."
            };
        }
        finally {
            localStorage.removeItem("twoStepToken");
            onChangeLoaders("isLoginLoading", false);
        }
    };
