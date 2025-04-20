import axios from "axios";
import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "vindo/dimension-desk/";

const list = (id) => {
  return axios.get(SERVICE_BASE + `list/${id}`);
};
const add = (data) => {
  return axios.post(SERVICE_BASE + "add", data);
};
const edit = (data) => {
  return axios.put(SERVICE_BASE + "edit", data);
};

const deleteDesk = (id) => {
  return axios.put(SERVICE_BASE + `delete/${id}`);
};

const DimensionDeskService = {
  list,
  add,
  edit,
  deleteDesk,
};

export default DimensionDeskService;
