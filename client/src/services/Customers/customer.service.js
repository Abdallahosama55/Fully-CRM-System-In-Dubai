import axios from "axios";
import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/customer/";

const add = (data) => {
  return axios.post(SERVICE_BASE + `add`, data);
};
const inviteCustomer = (data) => {
  return axios.post(SERVICE_BASE + `invite-customer`, data);
};
const get = (params = {}) => {
  return axios.get(SERVICE_BASE + `get`, { params: { ...params } });
};
const getStatistics = (id) => axios.get(SERVICE_BASE + `statistics/${id}`);
const getSources = (id) => axios.get(SERVICE_BASE + `get-sources/${id}`);
const search = (params = {}) => {
  return axios.post(SERVICE_BASE + `search?page=${params.page}&limit=${params.limit}`, {
    ...params.body,
    status: params.body.status || "active",
  });
};

const getAllMini = (params = {}) => {
  return axios.post(SERVICE_BASE + `search?view=mini`, params);
};

const sendEmail = (params = {}) => {
  return axios.post(SERVICE_BASE + `send-email`, params);
};

const getById = (id) => {
  return axios.get(SERVICE_BASE + `get-by-id/${id}`);
};
const portalDetailsToggleActivation = (isActive, id) => {
  //to do :change the url
  return axios.get(SERVICE_BASE + `get-by-id/${id}`);
};
const update = (id, body) => {
  console.log(id, body);
  return axios.put(SERVICE_BASE + `edit/${id}`, body);
};
const updateStatus = (id, body) => {
  return axios.put(SERVICE_BASE + `toggle-activate/${id}`, body);
};
export const updatePortalStatus = (id, status) =>
  axios.put(SERVICE_BASE + `toggle-activate/${id}`, { status });

const deleteAttachment = (attachmentId, customerId) => {
  return axios.delete(SERVICE_BASE + `attachment/delete/${attachmentId}`, {
    data: {
      customerId: customerId,
    },
  });
};
export const updateContactStatus = (id, data) =>
  axios.patch(SERVICE_BASE + `edit-type/${id}`, data);

const CustomerService = {
  add,
  getAllMini,
  sendEmail,
  inviteCustomer,
  getStatistics,
  getSources,
  get,
  search,
  getById,
  portalDetailsToggleActivation,
  updateStatus,
  update,
  deleteAttachment,
  updateContactStatus,
};

export default CustomerService;
