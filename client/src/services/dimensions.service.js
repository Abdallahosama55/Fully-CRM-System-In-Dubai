import axios from "axios";
import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "vindo/dimensions/";

const getMyDimensions = () => {
  return axios.get(SERVICE_BASE + "my-dimension", {
    params: { limit: 100, offset: 0 },
  });
};

const searchDimensions = ({ limit = 100, offset = 0, searchKey = "" }) => {
  return axios.get(SERVICE_BASE + `search?limit=${limit}&offset=${offset}&searchKey=${searchKey}`);
};

const addDimension = (data) => {
  return axios.post(SERVICE_BASE + "add-dimension", data);
};

const editDimension = (data) => {
  return axios.post(SERVICE_BASE + "edit-dimension", data);
};

const deleteDimension = (id) => {
  return axios.delete(SERVICE_BASE + `delete-dimension/${id}`);
};

const renameDimension = (id, data) => {
  return axios.put(SERVICE_BASE + `rename-dimension/${id}`, data);
};
const pushToCustomer = (data) => {
  return axios.post(SERVICE_BASE + "push-to-customer", data);
};
const addDimentionToFolder = (dimentionId, folderId) => {
  return axios.put(SERVICE_BASE + `/add-to-folder`, {
    dimensionId: dimentionId,
    folderId: folderId == 0 ? null : folderId,
  });
};
const setDimensionEditMode = (dimentionId, customerId) => {
  return axios.put(SERVICE_BASE + `/set-dimension-edit-mode/${dimentionId}`, {
    customerId: customerId,
  });
};

const backupDimensionsList = (dimensionId) => {
  return axios.get(SERVICE_BASE + `backup/list?dimensionId=${dimensionId}`);
};

const backupDimensionRestore = (dimensionId, backupId) => {
  return axios.put(SERVICE_BASE + "backup/restore", {
    dimensionId,
    backupId,
  });
};

const DimensionsService = {
  addDimension,
  editDimension,
  searchDimensions,
  deleteDimension,
  renameDimension,
  getMyDimensions,
  pushToCustomer,
  addDimentionToFolder,
  setDimensionEditMode,
  backupDimensionsList,
  backupDimensionRestore,
};

export default DimensionsService;
