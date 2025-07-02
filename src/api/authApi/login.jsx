    import axios from "axios";
    
import { useLoginStore } from "../../store/loginStore";
    


    export const AuthLogin = async (email, password) => {
        const { onChange, onChangeLoaders, persistStorage } = useLoginStore.getState(); 
        try {
            onChangeLoaders("isLoginLoading", true);
            const response = await axios.post("https://backend-notepad.vercel.app/notepad/v1/api/auth/login", {
                email:email,
                password:password
            });
            if (response?.data?.["two-fa"]) {
                persistStorage("twoStepToken", response?.data?.["two-fa"]);
                persistStorage("otpToken", response?.data?.otpToken);
                persistStorage("twoFa", "true");
                return {
                    state: false,
                    twoFa: true,
                    message: "Two-Factor Authentication required",
                };
            } else {
                const token = response?.data?.token;
                const userData = response?.data?.userData;
                persistStorage("token", response?.data?.token);
                persistStorage("userName", userData?.name);
                persistStorage("loginId", userData?.id);
                persistStorage("gender", userData?.gender);
                persistStorage("token", token);
                persistStorage("isUserLoggedIn", true);
                persistStorage("twoFa", "false");
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
