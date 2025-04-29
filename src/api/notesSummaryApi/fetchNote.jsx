import axios from "axios";
import { NOTES_SUMMARY_URL } from "../globalApi";

export const FetchNoteSummary = async (loginId,noteId) => {
    try {
        const response = await axios.post(`${NOTES_SUMMARY_URL}/fetchnote-details`,{
            loginId,
            noteId
        });
        return { state: true, data: response?.data?.data };
    }
    catch (err) {
        return { state: false, message:err?.data?.response?.message };
    }
};