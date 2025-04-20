import axios from "axios";
import { API_BASE } from "services/config";
const SERVICE_BASE = API_BASE + "vindo/task/";
const getAllTask = (params = {}) =>
  axios.get(SERVICE_BASE + "get-all", {
    params: {
      limit: 10,
      page: 1,
      ...params,
    },
  });

const addTask = (data) => {
  return axios.post(SERVICE_BASE + `add`, data);
};
const taskService = {
  getAllTask,
  addTask,
};

export default taskService;
