import axios from "axios";

import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "vindo/brand";

const search = (search = "") => {
  return axios.get(SERVICE_BASE + `/search?search=${search}`);
};
const addBrand = (formData) => {
  return axios.post(SERVICE_BASE, formData);
};
const BrandDelete = (id) => {
  return axios.delete(SERVICE_BASE + `?brands=${id}`);
};

const getBrandId = (id) => {
  return axios.get(SERVICE_BASE + `/${id}`);
};
const editBrand = (id, formData) => {
  return axios.put(SERVICE_BASE + `/edit/${id}`, formData);
};
const BrandsService = {
  search,
  addBrand,
  BrandDelete,
  getBrandId,
  editBrand,
};

export default BrandsService;
