import axios from "axios";
import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/employee/";
const SERVICE_BASE_V2 = API_BASE + "vindo/employee-v2/";

const add = (data) => {
  return axios.post(SERVICE_BASE + "add", data);
};

const edit = (data) => {
  return axios.put(SERVICE_BASE + "edit", data);
};
const changePassword = (data) => {
  return axios.patch(SERVICE_BASE_V2 + "change-password", data);
};
const search = ({ columnName = "fullName", searchKey = "", limit = 10, offset = 0 }) => {
  return axios.get(
    SERVICE_BASE +
      `search?columnName=${columnName}&searchKey=${searchKey}&limit=${limit}&offset=${offset}`,
  );
};

const getById = (id) => {
  return axios.get(SERVICE_BASE_V2 + `get-by-id/${id}`);
};

const toggleActivate = (data) => {
  return axios.put(SERVICE_BASE + "toggle-activate", data);
};

const addEditGeneralWorkingHours = (id, data) => {
  return axios.post(SERVICE_BASE + `general-working-hours/add-edit/${id}`, data);
};

const getGeneralWorkingHours = (id) => {
  return axios.get(SERVICE_BASE + `general-working-hours/get-by-employee/${id}`);
};

const inviteEmployee = (data) => {
  return axios.post(SERVICE_BASE + "invite-employee", data);
};
const editV2 = (id, data) => {
  return axios.put(SERVICE_BASE_V2 + `edit-profile`, data);
};
const EmployeeService = {
  add,
  edit,
  editV2,
  search,
  getById,
  toggleActivate,
  addEditGeneralWorkingHours,
  getGeneralWorkingHours,
  inviteEmployee,
  changePassword,
};

export default EmployeeService;
