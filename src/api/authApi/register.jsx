import axios from "axios";
import { useLoginStore } from "../../store/loginStore";
import { AUTH_URL } from "../globalApi";
import secureLocalStorage from "react-secure-storage";

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
        secureLocalStorage.setItem("token", response?.data?.token);
        secureLocalStorage.setItem("userName", userData?.name);
        secureLocalStorage.setItem("gender", userData?.gender);
        secureLocalStorage.setItem("loginId", userData?.id);
        secureLocalStorage.setItem("isUserLoggedIn", true);
        secureLocalStorage.setItem("token", token);
        secureLocalStorage.setItem("twoFa", `${twoFa}`);
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
