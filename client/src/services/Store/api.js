import axios from "axios";
import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "customer/order/";

const addOrder = (data) => axios.post(SERVICE_BASE + "add", data);

const StoreService = { addOrder };
export default StoreService;
