import axios from 'axios';

axios.defaults.baseURL = "https://backend-notepad.vercel.app/notepad/v1/api";
export const AUTH_URL = `/auth`
export const NOTES_URL = `/notes`;
export const NOTES_SUMMARY_URL = `/notesummary`;