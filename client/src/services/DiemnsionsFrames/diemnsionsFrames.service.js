import axios from "axios";
import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/frame/";

const listFrames = (type, dimensionId) => {
  return axios.get(SERVICE_BASE + `list/${type}/${dimensionId}`);
};

const addToFolder = (frameId, folderId) => {
  return axios.put(SERVICE_BASE + `add-to-folder/${frameId}`, { folderId });
};

const listFolderFrames = (type, dimensionId) => {
  return axios.get(SERVICE_BASE + `list-folder/${type}/${dimensionId}`);
};

const listFavourite = (type, dimensionId) => {
  return axios.get(SERVICE_BASE + `list-favourite/${type}/${dimensionId}`);
};

const listHidden = (type, dimensionId) => {
  return axios.get(SERVICE_BASE + `list-hidden/${type}/${dimensionId}`);
};

// to change status set isFav to => favourite : true or hidden : null or normal : false status
const updateStatus = (frameId, isFav) => {
  return axios.put(SERVICE_BASE + `update-status/${frameId}`, { isFav });
};

// set folderId to null if the frame has no parent
const updateFolder = (frameId, folderId) => {
  return axios.put(SERVICE_BASE + `update-folder/${frameId}`, { folderId });
};

const DiemnsionsFramesService = {
  listFrames,
  addToFolder,
  listFolderFrames,
  listFavourite,
  listHidden,
  updateStatus,
  updateFolder,
};

export default DiemnsionsFramesService;
