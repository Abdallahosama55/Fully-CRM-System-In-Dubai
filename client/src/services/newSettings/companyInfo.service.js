import axios from "axios";

import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/settings/companyInfo";

const getAll = () => {
  return axios.get(SERVICE_BASE + `/get`);
};

const addContactPerson = (data) => {
  return axios.post(SERVICE_BASE + "/contact-person/add", data);
};

const editContactPerson = (id, data) => {
  return axios.post(SERVICE_BASE + `/contact-person/edit/${id}`, data);
};

const deleteContactPerson = (id) => {
  return axios.delete(SERVICE_BASE + `/contact-person/delete/${id}`);
};

const editWorkingTime = (id, data) => {
  return axios.put(SERVICE_BASE + `/edit-workingTime/${id}`, data);
};

const editContactInfo = (id, data) => {
  return axios.put(SERVICE_BASE + `/edit-contactInfo/${id}`, data);
};

const editAddress = (id, data) => {
  return axios.put(SERVICE_BASE + `/edit-address/${id}`, data);
};

const editMainInfo = (id, data) => {
  return axios.put(SERVICE_BASE + `/edit-main-info/${id}`, data);
};

const companyInfoService = {
  getAll,
  addContactPerson,
  editContactPerson,
  deleteContactPerson,
  editWorkingTime,
  editContactInfo,
  editAddress,
  editMainInfo,
};

export default companyInfoService;
