import axios from "axios";

import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/settings/job-title";

const getAll = () => {
  return axios.get(SERVICE_BASE + `/get`);
};

const addJobTitle = (data) => {
  return axios.post(SERVICE_BASE + "/add", data);
};
const deleteJobTitle = (id) => {
  return axios.delete(SERVICE_BASE + "/delete/" + id);
};
const editJobTitle = (id, data) => {
  return axios.put(SERVICE_BASE + `/edit/${id}`, data);
};
const toggleActivationJobTitle = (id) => {
  return axios.put(SERVICE_BASE + `/toggle-active/${id}`);
};
const getAllActive = () => {
  return axios.get(SERVICE_BASE + `/get?type=active`);
};

const jobTitlesService = {
  getAll,
  addJobTitle,
  DeleteJobTitle: deleteJobTitle,
  editJobTitle,
  toggleActivationJobTitle,
  getAllActive,
};

export default jobTitlesService;
