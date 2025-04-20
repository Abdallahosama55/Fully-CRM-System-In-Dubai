import axios from "axios";
import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "vindo/store/";
const VINDO_UNAUTH_SERVICE_BASE = API_BASE + "vindo/unauth/";
const VINDO_Tax = API_BASE + "vindo/tax/";

const getStoreInfo = () => axios.get(SERVICE_BASE + "get-store-info");

const getLanguage = () => {
  return axios.get(VINDO_UNAUTH_SERVICE_BASE + `language-list`);
};
const getCurrency = () => {
  return axios.get(VINDO_UNAUTH_SERVICE_BASE + `currency-list`);
};
const updateStoreInfo = (data) => {
  return axios.put(SERVICE_BASE + `update-store-info`, data);
};
//
const listPaymentGateway = () => {
  return axios.get(SERVICE_BASE + `list-payment-gateway`);
};
const listCompanyPaymentGateway = () => {
  return axios.get(SERVICE_BASE + `list-company-payment-gateway`);
};
const addCompanyPaymentGateway = (data) => {
  return axios.post(SERVICE_BASE + `add-company-payment-gateway`, data);
};
const deleteCompanyPaymentGateway = (id) => {
  return axios.delete(SERVICE_BASE + `delete-company-payment-gateway/${id}`);
};
const updateCompanyPaymentGateway = (id, data) => {
  return axios.put(SERVICE_BASE + `edit-company-payment-gateway/${id}`, data);
};
const listOrder = () => {
  return axios.get(SERVICE_BASE + `list-order`);
};
const getOrderbyid = (id) => {
  return axios.get(SERVICE_BASE + `get-order-by-id/${id}`);
};

const getlistTax = () => {
  return axios.get(VINDO_Tax + `list`);
};
const addTax = (data) => {
  return axios.post(VINDO_Tax + `add`, data);
};
const deleteTax = (id) => {
  return axios.delete(VINDO_Tax + `delete/${id}`);
};
const editTax = (id, data) => {
  return axios.put(VINDO_Tax + `edit/${id}`, data);
};

const StoreService = {
  getStoreInfo,
  getLanguage,
  getCurrency,
  updateStoreInfo,
  addCompanyPaymentGateway,
  listPaymentGateway,
  listCompanyPaymentGateway,
  deleteCompanyPaymentGateway,
  updateCompanyPaymentGateway,
  listOrder,
  getOrderbyid,
  getlistTax,
  addTax,
  deleteTax,
  editTax,
};
export default StoreService;
