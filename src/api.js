import axios from "axios";

export const api = axios.create({
  baseURL: "https://college-api-j14o.onrender.com",
});