import axios from "axios";
import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/community/";

const listCommunity = () => {
  return axios.get(SERVICE_BASE + "get");
};

const getCommunityById = (communityId) => {
  return axios.get(SERVICE_BASE + `get-by-id/${communityId}`);
};

const addCommunity = (data) => {
  return axios.post(SERVICE_BASE + "add", data);
};

const editCommunity = (communityId, data) => {
  return axios.put(SERVICE_BASE + `edit/${communityId}`, data);
};

const deleteCommunity = (communityId) => {
  return axios.delete(SERVICE_BASE + `delete/${communityId}`);
};

const CommunityService = {
  listCommunity,
  getCommunityById,
  addCommunity,
  editCommunity,
  deleteCommunity,
};

export default CommunityService;
