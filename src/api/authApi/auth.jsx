import { useLoginStore } from "../../store/loginStore";
import { AuthLogin } from './login';
import { AuthRegister } from "./register";

export const Authentication = async (type) => {
    const { email, userName, password, twoFa, gender, categoryId } = useLoginStore.getState();
    try {
        if (type === "login") {
            const response = await AuthLogin(email, password);
            return response;
        }
        else if (type === "register") {
            const response = await AuthRegister(userName, email, password, twoFa, gender, categoryId);
            return response;
        }
    }
    finally {
        localStorage.removeItem("password");
    }
};
