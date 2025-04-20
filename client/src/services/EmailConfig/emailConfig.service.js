import axios from "axios";
import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/email-configuration/";

const saveEmailConfig = (data) => {
  return axios.post(SERVICE_BASE + `general/add-edit`, data);
};
const addGroupEmailConfig = (data) => {
  return axios.post(SERVICE_BASE + `group/add`, data);
};
const editGroupEmailConfig = (id, data) => {
  return axios.put(SERVICE_BASE + `group/edit/${id}`, data);
};
const getEmailConfig = (params = {}) => {
  return axios.get(SERVICE_BASE + `general/get`, { params: { ...params } });
};
const getMainGroups = (params = {}) => {
  return axios.get(SERVICE_BASE + `group/get-main-groups`, { params: { ...params } });
};

const deleteGroupConfig = (groupId) => {
  return axios.delete(SERVICE_BASE + `group/delete/${groupId}`);
};
const EmailConfigService = {
  getEmailConfig,
  saveEmailConfig,
  addGroupEmailConfig,
  deleteGroupConfig,
  getMainGroups,
  editGroupEmailConfig,
};

export default EmailConfigService;
