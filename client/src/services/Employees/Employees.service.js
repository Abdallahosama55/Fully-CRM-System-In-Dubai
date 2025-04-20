import axios from "axios";

import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/employee-v2";

const getAll = (page, limit) => {
  return axios.get(SERVICE_BASE + `/get?page=${page}&limit=${limit}`);
};

const getAllSearch = (data, page = 1, limit = 100) => {
  return axios.post(SERVICE_BASE + `/search?page=${page}&limit=${limit}`, data);
};

const getAllSearchMini = (data) => {
  return axios.post(SERVICE_BASE + `/search?view=mini`, data);
};

const addEmployee = (data) => {
  return axios.post(SERVICE_BASE + "/add", data);
};
// const deleteCity = (id) => {
//     return axios.delete(SERVICE_BASE + '/delete/' + id);
// };
const toggleActivate = (id, isActive) => {
  return axios.put(SERVICE_BASE + `/toggle-activate/` + id);
};
// const toggleActivationCity = (id) => {
//     return axios.put(SERVICE_BASE + `/toggle-active/${id}`);
// };
const getById = (employeeId) => {
  return axios.get(SERVICE_BASE + `/get-by-id/${employeeId}`);
};

const editMainInfo = (id, data) => {
  return axios.put(SERVICE_BASE + `/edit-main-info/` + id, data);
};
const editAddreeInfo = (id, data) => {
  return axios.put(SERVICE_BASE + `/edit-address/` + id, data);
};
const AddEditWorkingHours = (id, data) => {
  return axios.post(SERVICE_BASE + `/general-working-hours/add-edit/` + id, data);
};
const inviteEmployee = (data) => {
  return axios.post(SERVICE_BASE + "/invite-employee", data);
};
const employeesService = {
  getAll,
  getAllSearch,
  getAllSearchMini,
  toggleActivate,
  addEmployee,
  getById,
  editMainInfo,
  editAddreeInfo,
  AddEditWorkingHours,
  inviteEmployee,
};

export default employeesService;
