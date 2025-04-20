import axios from "axios";
import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "stripe/";

const createPaymentIntent = (data) => axios.post(SERVICE_BASE + "create-payment-intent", data);

const StripeService = {
  createPaymentIntent,
};
export default StripeService;
