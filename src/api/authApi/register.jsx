import axios from "axios";
import { useLoginStore } from "../../store/loginStore";
import { AUTH_URL } from "../globalApi";

export const AuthRegister = async (userName, email, password, twoFa, gender, categoryId ) => {
    const { onChangeLoaders } = useLoginStore.getState(); 
    const persistStorage = useLoginStore(e => e.persistStorage);
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
        persistStorage("token", response?.data?.token);
        persistStorage("userName", userData?.name);
        persistStorage("gender", userData?.gender);
        persistStorage("loginId", userData?.id);
        persistStorage("token", token);
        persistStorage("twoFa", `${twoFa}`);
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
