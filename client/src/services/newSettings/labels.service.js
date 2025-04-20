import axios from "axios";

import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/settings/label";

const getAll = () => {
  return axios.get(SERVICE_BASE + `/get`);
};

const addLabel = (data) => {
  return axios.post(SERVICE_BASE + "/add", data);
};
const deleteLabel = (id) => {
  return axios.delete(SERVICE_BASE + "/delete/" + id);
};
const editLabel = (id, data) => {
  return axios.put(SERVICE_BASE + `/edit/${id}`, data);
};

const labelsService = {
  getAll,
  addLabel,
  deleteLabel,
  editLabel,
};

export default labelsService;
