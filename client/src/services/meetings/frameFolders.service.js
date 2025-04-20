import axios from "axios";

import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/frame-folder";

const addFolder = (body) => {
  return axios.post(SERVICE_BASE + `/add`, body);
};

const renameFolder = (folderId, name) => {
  return axios.put(SERVICE_BASE + `/rename/${folderId}`, { name });
};

const deleteFolder = (folderId) => {
  return axios.delete(SERVICE_BASE + `/${folderId}`);
};

const FrameFoldersService = {
  addFolder,
  deleteFolder,
  renameFolder,
};

export default FrameFoldersService;
