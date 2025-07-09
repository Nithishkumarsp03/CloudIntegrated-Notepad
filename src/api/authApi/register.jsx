import axios from "axios";
import { useLoginStore } from "../../store/loginStore";
import { AUTH_URL } from "../globalApi";

export const AuthRegister = async (userName, email, password, twoFa, gender, categoryId ) => {
    const { onChange, onChangeLoaders } = useLoginStore.getState(); 
    const g = gender === "male" ? "M" : gender === "female" ? "F" : "other";
    try {
        onChangeLoaders("isRegisterLoading",true);
        const response = await axios.post(`${AUTH_URL}/register`, {
            name: userName,
            email,
            password,
            twofa: twoFa,
            gender: g,
            category_id: categoryId
        });

        const token = response?.data?.token;
        const userData = response?.data?.user;
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("userName", userData?.name);
        localStorage.setItem("gender", userData?.gender);
        localStorage.setItem("loginId", userData?.id);
        localStorage.setItem("isUserLoggedIn", true);
        localStorage.setItem("token", token);
        localStorage.setItem("twoFa", `${twoFa}`);
        onChange("twoFa", `${twoFa}`);
        onChange("token", response?.data?.token);
        onChange("userName", userData?.name);
        onChange("gender", userData?.gender);
        onChange("loginId", userData?.id);
        onChange("token", token);
        onChange("isUserLoggedIn", true);
        return {
            status: true,
            message: response?.data?.message,
            token: token
        };
    } catch (err) {
        return {
            status: false,
            message: err?.response?.data?.message || "Some error occurred. Try again."
        };
    }
    finally {
        onChangeLoaders("isRegisterLoading", false);
    }
};
