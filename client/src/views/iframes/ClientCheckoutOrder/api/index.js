import axios from "axios";

const UNITY_API_BASE = import.meta.env.VITE_BASE_ENDPOINT_DOMAIN + "/api/v6/mobile-game/";
const getCart = async (token) => {
  const response = await axios.get(UNITY_API_BASE + "cart/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return response;
};

const addOrder = async (payload, token) => {
  const response = await axios.post(UNITY_API_BASE + "order/add", payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return response;
};

const createPaymentIntent = async (token) => {
  const response = await axios.post(UNITY_API_BASE + "/stripe/create-payment-intent", {} , {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return response;
};

const UnityCheckoutService = {
  getCart,
  addOrder,
  createPaymentIntent
};

export default UnityCheckoutService;
