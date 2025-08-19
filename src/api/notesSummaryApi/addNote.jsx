import axios from "axios";
import { NOTES_SUMMARY_URL } from "../globalApi";

export const AddNoteSummary = async (loginId, noteId, notes) => {
    try {
        const response = await axios.post(`${NOTES_SUMMARY_URL}/addnew-notedetails`, {
            loginId,
            noteId,
            notes,
        });

        return { state: true, data: response.data };
    } catch (err) {
        if (!err.response) {
            return { state: false, message: "Network error. Please try again." };
        }
        return {
            state: false,
            message: err.response?.data?.message || "Something went wrong.",
        };
    }
};
