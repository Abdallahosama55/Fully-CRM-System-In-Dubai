import axios from "axios";

import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/dimensions/folder";

const getAll = () => {
  return axios.get(SERVICE_BASE + `/get-all`);
};
const getAllByFolderId = (folderId) => {
  return axios.get(SERVICE_BASE + `/get-all` + (folderId ? `?parentId=${folderId}` : ""));
};
const addFolder = (data) => {
  return axios.post(SERVICE_BASE + "/add", data);
};
const getVersesByProjectId = (projectId) => {
  return axios.get(SERVICE_BASE + "/get-all-dimension/" + projectId);
};
const deleteFolder = (id) => {
  return axios.delete(SERVICE_BASE + "/delete/" + id);
};
const editFolder = (id, data) => {
  return axios.put(SERVICE_BASE + `/edit/${id}`, data);
};

// const toggleActivationServiceType = (id) => {
//     return axios.put(SERVICE_BASE + `/toggle-active/${id}`);
// };

const FolderService = {
  getAll,
  addFolder,
  editFolder,
  getVersesByProjectId,
  getAllByFolderId,
  deleteFolder,
};

export default FolderService;
