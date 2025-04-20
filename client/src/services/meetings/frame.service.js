import axios from "axios";

import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/frame";

const upsert = (body) => {
  return axios.post(SERVICE_BASE + `/upsert`, body);
};

const addToFolder = (frameId, folderId) => {
  return axios.put(SERVICE_BASE + `/add-to-folder/${frameId}`, { folderId });
};

const updateFavorite = (frameId, isFav) => {
  return axios.put(SERVICE_BASE + `/update-favourite-status/${frameId}`, { isFav });
};

const FrameService = {
  upsert,
  addToFolder,
  updateFavorite,
};

export default FrameService;
