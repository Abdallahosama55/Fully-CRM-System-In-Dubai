import axios from "axios";
export const TRAVEL_API_URL = import.meta.env.VITE_BASE_TRAVEL_ENDPOINT + "dashboard/";
const TravelDashboardAPILocal = axios.create({
  baseURL: TRAVEL_API_URL,
  headers: {
    Authorization: localStorage.getItem("vindo-token") || "",
  },
});


TravelDashboardAPILocal.interceptors.request.use((config) => {
  const token = localStorage.getItem("vindo-token");
  if (token) {
    config.headers["Authorization"] = `${token}`;
  }
  return config;
});

export const TravelDashboardAPI = TravelDashboardAPILocal;
