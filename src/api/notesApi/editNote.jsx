import axios from "axios";
import { NOTES_URL } from "../globalApi";

export const EditNote = async (uuid,notetitle) => {
  try {
    const response = await axios.post(`${NOTES_URL}/editnotes`, {
        uuid,
        notetitle
    });
    return { state: true, data: response.data };
  } catch (err) {
    const message = err?.response?.data?.message;
    return { state: false, message: message || "Something went wrong" };
  }
};

