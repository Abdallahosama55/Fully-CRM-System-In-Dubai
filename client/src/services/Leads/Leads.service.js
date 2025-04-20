import axios from "axios";
import { API_BASE } from "../config";

const SERVICE_BASE_leads = API_BASE + "vindo/";
const SERVICE_BASE = API_BASE + "vindo/employee-v2";
const commonAPI_BASE = `${import.meta.env.VITE_BASE_ENDPOINT_DOMAIN}/api/v6`;
const addLead = (data) => {
  return axios.post(SERVICE_BASE_leads + `deal`, data);
};
const updateLead = (id, data) => {
  return axios.put(SERVICE_BASE_leads + `deal/${id}`, data);
};
const getLeads = (params = {}) => {
  return axios.get(SERVICE_BASE_leads + `deal`, { params: { ...params } });
};
const getLeadById = (id) => axios.get(SERVICE_BASE_leads + `deal/${id}`);
const deleteLead = (id) => {
  return axios.delete(SERVICE_BASE_leads + `deal/${id}`);
};
const updateLeadStage = (data) => {
  return axios.patch(SERVICE_BASE_leads + `deal/move`, { ...data });
};
const getAssignToEmplyees = (page, limit) => {
  return axios.get(SERVICE_BASE + `/get?page=${page}&limit=${limit}`);
};
const getSourceList = (params = {}) => {
  return axios.get(SERVICE_BASE + `emplyees`, { params: { ...params } });
};
const getCommonData = (params = {}) => {
  return axios.get(commonAPI_BASE + "/common", { params: { ...params } });
};
const LeadService = {
  addLead,
  updateLead,
  getLeadById,
  getLeads,
  deleteLead,
  updateLeadStage,
  getAssignToEmplyees,
  getSourceList,
  getCommonData,
};

export default LeadService;
