import axios from "axios";

import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "vindo/category";

const search = (isParentCategory = false, search = "") => {
  return axios.get(
    SERVICE_BASE +
    `/search?${isParentCategory && `isParentCategory=${isParentCategory}`
    }&search=${search}`,
  );
};
const addCategory = (formData) => {
  return axios.post(SERVICE_BASE, formData);
};
const CategoryDelete = (id) => {
  return axios.delete(SERVICE_BASE + `?categories=${id}`);
};

const getCategoryId = (id) => {
  return axios.get(SERVICE_BASE + `/${id}`);
};

const getCategoriesByIDs = (categories) => {
  return axios.post(SERVICE_BASE + `/get-categories-data`, {categories});
};
const getParentCategory = (id) => {
  return axios.get(SERVICE_BASE + `/sub-categories/${id}`);
};
const editCategory = (id, formData) => {
  return axios.put(SERVICE_BASE + `/edit/${id}`, formData);
};
const CategoryService = {
  search,
  addCategory,
  CategoryDelete,
  getCategoryId,
  editCategory,
  getParentCategory,
  getCategoriesByIDs
};

export default CategoryService;
