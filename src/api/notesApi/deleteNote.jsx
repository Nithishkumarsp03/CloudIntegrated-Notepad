import axios from "axios";
import { NOTES_URL } from "../globalApi";

export const DeleteNote = async (uuid) => {
    try {
        const response = await axios.delete(`${NOTES_URL}/deletenotes`, {
            data: {uuid}
        });
        console.log(response.data)
        return { state: true, data: response.data };
    } catch (err) {
        const message = err?.response?.data?.message;
        return { state: false, message: message || "Something went wrong" };
    }
};

