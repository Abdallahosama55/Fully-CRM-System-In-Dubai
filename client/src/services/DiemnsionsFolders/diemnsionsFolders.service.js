import axios from "axios";
import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/frame-folder/";

const addFrameFolder = (data) => {
  return axios.post(SERVICE_BASE + `add`, data);
};

const updateFrameFolderStructure = (eventId, frameFolder) => {
  return axios.put(SERVICE_BASE + `update-folder-structure/${eventId}`, {
    frameFolder,
  });
};

const updateFrameFolderParent = (folderId, parentFolderId) => {
  return axios.put(SERVICE_BASE + `update/${folderId}`, { folderId: parentFolderId });
};

const renameFrameFolder = (folderId, name) => {
  return axios.put(SERVICE_BASE + `rename/${folderId}`, { name });
};

const deleteFrameFolder = (folderId) => {
  return axios.delete(SERVICE_BASE + `delete/${folderId}`);
};

const DiemnsionsFoldersService = {
  addFrameFolder,
  updateFrameFolderStructure,
  updateFrameFolderParent,
  renameFrameFolder,
  deleteFrameFolder,
};

export default DiemnsionsFoldersService;
