import axios from "axios";
import { API_BASE } from "services/config";
const SERVICE_BASE = API_BASE + "vindo/customer-activity/";
const getAllActivity = (params = {}) =>
  axios.get(SERVICE_BASE + "get-all", {
    params: {
      limit: 10,
      page: 1,
      ...params,
    },
  });

const addActivity = (data) => {
  return axios.post(SERVICE_BASE + `add`, data);
};
const customerActivityService = {
  getAllActivity,
  addActivity,
};

export default customerActivityService;
