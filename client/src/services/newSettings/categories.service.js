import axios from "axios";

import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/settings/customer-category";

const getCategory = () => {
  return axios.get(SERVICE_BASE + "/get");
};

const addCategory = (params) => {
  return axios.post(SERVICE_BASE + `/add`, { ...params });
};

const deleteCategory = (id) => {
  return axios.delete(SERVICE_BASE + `/delete/${id}`);
};

const updateCategory = (id, params) => {
  return axios.put(SERVICE_BASE + `/edit/${id}`, { ...params });
};

const categoryService = {
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
