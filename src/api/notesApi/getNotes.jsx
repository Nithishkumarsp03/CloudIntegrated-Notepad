import axios from "axios";
import { NOTES_URL } from "../globalApi";

export const GetNotes = async (loginId) => {
  try {
    const response = await axios.post(`${NOTES_URL}/fetchnotes`, {
      loginId
    });
    return { state: true, data: response.data };
  } catch (err) {
    const message = err?.response?.data?.message;
    if (message === 'No notes found for this user') {
      return { state: true, message:message };
    }
    return { state: false, message: message || "Something went wrong" };
  }
};

