import axios from "axios";
import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/vverse-media/";
const FOLDERS_SERVICE_BASE = API_BASE + "vindo/vverse-media-folder/";

const getAll = (params = {}) => {
  return axios.get(SERVICE_BASE + "get-all", { params: { ...params } });
};

const getByType = (type = "", limit = 9, offset = 0, params = {}) => {
  return axios.get(SERVICE_BASE + `get-by-type/${type}?limit=${limit}&offset=${offset}`, {
    params: { ...params },
  });
};

const getAllFolders = (params = {}) => {
  return axios.get(FOLDERS_SERVICE_BASE + "get", { params: { ...params } });
};

const addFolder = (data) => {
  return axios.post(FOLDERS_SERVICE_BASE + "add", data);
};

const deleteFolder = (folderId) => {
  return axios.delete(FOLDERS_SERVICE_BASE + `delete/${folderId}`);
};

const renameFolder = (folderId, name) => {
  return axios.put(FOLDERS_SERVICE_BASE + `rename/${folderId}`, { name });
};

const updateFolder = (folderId, newFolderId) => {
  return axios.put(FOLDERS_SERVICE_BASE + `update/${folderId}`, { folderId: newFolderId });
};

const add = (data) => {
  return axios.post(SERVICE_BASE + "add", data);
};

const updateMedia = (mediaId, folderId) => {
  return axios.put(SERVICE_BASE + `update-folder/${mediaId}`, { folderId });
};

const deleteMedia = (mediaId) => {
  return axios.delete(SERVICE_BASE + `delete/${mediaId}`);
};

const updateFolderStructure = (mediaFolder) => {
  return axios.put(FOLDERS_SERVICE_BASE + `update-folder-structure`, {
    mediaFolder,
  });
};

const VverseMediaService = {
  getAll,
  getAllFolders,
  getByType,
  addFolder,
  add,
  updateMedia,
  deleteMedia,
  deleteFolder,
  renameFolder,
  updateFolder,
  updateFolderStructure,
};

export default VverseMediaService;
