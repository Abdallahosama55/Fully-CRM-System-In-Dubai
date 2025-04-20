import axios from "axios";

import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/constant";

const getJobTypes = () => {
  return axios.get(SERVICE_BASE + `/job-type/get`);
};
const getJobLocations = () => {
  return axios.get(SERVICE_BASE + `/job-location/get`);
};
// const addCity = (data) => {
//     return axios.post(SERVICE_BASE + '/add', data);
// };
// const deleteCity = (id) => {
//     return axios.delete(SERVICE_BASE + '/delete/' + id);
// };
// const editCity = (id, data) => {
//     return axios.put(SERVICE_BASE + `/edit/${id}`, data);
// };
// const toggleActivationCity = (id) => {
//     return axios.put(SERVICE_BASE + `/toggle-active/${id}`);
// };
// const getCitiesByStateId = (StateId) => {
//     return axios.get(SERVICE_BASE + `/get-by-state/${StateId}`);
// };
const constantsService = {
  getJobTypes,
  getJobLocations,
};

export default constantsService;
