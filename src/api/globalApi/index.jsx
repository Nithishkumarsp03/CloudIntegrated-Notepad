import axios from 'axios';

axios.defaults.baseURL = "https://backend-notepad.vercel.app/notepad/v1/api";
// axios.defaults.baseURL = "http://10.40.39.229:8000//notepad/v1/api";
export const AUTH_URL = `/auth`
export const NOTES_URL = `/notes`;
export const NOTES_SUMMARY_URL = `/notesummary`;