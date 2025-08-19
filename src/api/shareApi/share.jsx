import axios from "axios";
import { SHARE_URL } from "../globalApi";

export const ShareNote = async (uuid) => { 
    try {
        const response = await axios.post(`${SHARE_URL}`, {
            uuid
        });
        return {state:true,response:response.data};
    }
    catch (err) {
        return {state:false,response:err};
    }
};      