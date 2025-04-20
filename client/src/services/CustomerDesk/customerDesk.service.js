import axios from "axios";
import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "customer/desk/";

const get = (type) => {
  return axios.get(SERVICE_BASE + "get?type=" + type);
};

const CustomerDeskService = {
  get,
};

export default CustomerDeskService;
