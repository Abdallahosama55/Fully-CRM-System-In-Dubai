import axios from "axios";

import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "vindo/warehouse";

const search = (search = "") => {
  return axios.get(SERVICE_BASE + `/search?search=${search}`);
};
const addWarehouse = (formData) => {
  return axios.post(SERVICE_BASE, formData);
};
const WarehouseDelete = (id) => {
  return axios.delete(SERVICE_BASE + `?warehouses=${id}`);
};

const getWarehouseId = (id) => {
  return axios.get(SERVICE_BASE + `/${id}`);
};
const editWarehouse = (id, formData) => {
  return axios.put(SERVICE_BASE + `/edit/${id}`, formData);
};
const WarehousesService = {
  search,
  addWarehouse,
  WarehouseDelete,
  getWarehouseId,
  editWarehouse,
};

export default WarehousesService;
