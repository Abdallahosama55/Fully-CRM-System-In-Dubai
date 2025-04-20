import axios from "axios";

import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "vindo/product";

const get = (search = "", name = "name", sortBy = "oldest") => {
  return axios.get(SERVICE_BASE + `/list?search=${search}&searchColumn=${name}&sortBy=${sortBy}`);
};

const addProduct = (data) => {
  return axios.post(SERVICE_BASE, data);
};

const getVariantData = (productsVariiant) => {
  return axios.post(SERVICE_BASE + "/get-variant-data", { productsVariiant });
};

const ProductDelete = (id) => {
  return axios.delete(SERVICE_BASE + `?products=${id}`);
};

const getProductId = (id) => {
  return axios.get(SERVICE_BASE + `/${id}`);
};

const editProduct = (id, data) => {
  return axios.put(SERVICE_BASE + `/edit/${id}`, data);
};

const ProductService = {
  get,
  getVariantData,
  addProduct,
  ProductDelete,
  getProductId,
  editProduct,
};

export default ProductService;
