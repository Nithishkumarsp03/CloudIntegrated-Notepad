import axios from "axios";
import { AUTH_URL } from "../globalApi";

export const ResetPassword = async (loginId) => {
    try {
        const response = await axios.post(`${AUTH_URL}/request-reset`, {
            loginId
        });
        return { state: true, response: response };
    }
    catch (err) {
        return { state: false, response: err };
    }
};