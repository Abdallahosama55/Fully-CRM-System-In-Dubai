import axios from "axios";
export const TRAVEL_API_URL = import.meta.env.VITE_BASE_TRAVEL_ENDPOINT_DASHBOARD;
export const TravelDashboardAPI = axios.create({
  baseURL: TRAVEL_API_URL,
  headers: {
    Authorization: localStorage.getItem("vindo-token") || "",
  },
});
