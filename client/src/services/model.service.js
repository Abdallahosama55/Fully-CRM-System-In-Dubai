import axios from "axios";

import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "vindo/model";

const getOwnModel = () => {
  return axios.get(SERVICE_BASE + `/get-own-model`);
};
const addModel = (data) => {
  return axios.post(SERVICE_BASE + "/add", data);
};

const ModelService = {
  getOwnModel,
  addModel,
};

export default ModelService;
