import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-API-key": process.env.REACT_APP_API_KEY,
  },
});
