import axios from "axios";
import { PROFILE_URL } from "../globalApi";

export const EditProfile = async (name, email, two_fa, password, loginId) => { 
    try {
        const response = await axios.post(`${PROFILE_URL}/editprofile`, {
            name,
            email,
            two_fa,
            password,
            loginId
        });
        return {state:true,response:response};
    }
    catch (err) {
        return {state:false,response:err};
    }
};