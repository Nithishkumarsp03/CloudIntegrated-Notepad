import axios from "axios";

import { useLoginStore } from "../../store/loginStore";
import { AUTH_URL } from "../globalApi";
import { useSecureStorageStore } from "../../hooks";

export const AuthLogin = async (email, password) => {
    const { onChangeLoaders, persistStorage } = useLoginStore.getState();
    const { removeItem } = useSecureStorageStore.getState();

    try {
        onChangeLoaders("isLoginLoading", true);
        const response = await axios.post(`${AUTH_URL}/login`, {
            email: email,
            password: password
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
        removeItem("twoStepToken");
        onChangeLoaders("isLoginLoading", false);
    }
};
