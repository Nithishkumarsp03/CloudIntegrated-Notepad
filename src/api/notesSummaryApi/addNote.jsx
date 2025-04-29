import axios from "axios";
import { NOTES_SUMMARY_URL } from "../globalApi";

export const AddNoteSummary = (loginId,noteId,notes) => {
    try {
        const response = axios.post(`${NOTES_SUMMARY_URL}/addnew-notedetails`,{
            loginId,
            noteId,
            notes
        });
        return { state: true, data: response.data };
    }
    catch (err) {
        return { state: false, message:err?.data?.response?.message };
    }
};