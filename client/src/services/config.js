import axios from "axios";

axios.defaults.headers.authorization = localStorage.getItem("vindo-token") || "";

export const API_BASE = import.meta.env.VITE_BASE_ENDPOINT;
export const API_BASE_DOMAIN = import.meta.env.VITE_BASE_ENDPOINT_DOMAIN + "/api/v6/";
export const AI_API_BASE = import.meta.env.VITE_BASE_AI_ENDPOINT;
export const AI_API_BASE_TRAVEL_ENDPOINT = import.meta.env.VITE_BASE_TRAVEL_ENDPOINT;
