import axios from "axios";
import { NOTES_URL } from "../globalApi";

export const AddNote = async (loginId,notename) => {
  try {
    const response = await axios.post(`${NOTES_URL}/addnote`, {
        loginId,
        notename
    });
    return { state: true, data: response.data };
  } catch (err) {
    const message = err?.response?.data?.message;
    return { state: false, message: message || "Something went wrong" };
  }
};

