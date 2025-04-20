import axios from "axios";
import { API_BASE } from "./config";

const COMMON_BASE = API_BASE + "/common-unauth/";
const SERVICE_BASE = API_BASE + "vindo/";

const getCommonExploreList = ({ limit = 20, offset = 0, tag = "" }) => {
  return axios.get(COMMON_BASE + `explore?tag=${tag}&limit=${limit}&offset=${offset}`);
};

const getMyDimensions = ({ limit = 20, offset = 0 }) => {
  return axios.get(SERVICE_BASE + `my-dimension?limit=${limit}&offset=${offset}`);
};

const unAuthSearch = ({ limit = 20, offset = 0, serach = "", tag = "" }) => {
  return axios.get(
    COMMON_BASE + `search?searchKey=${serach}&limit=${limit}&offset=${offset}&tag=${tag}`,
  );
};

const search = ({ limit = 20, offset = 0, serach = "", tag = "" }) => {
  return axios.get(
    SERVICE_BASE +
      `dimensions/search?searchKey=${serach}&limit=${limit}&offset=${offset}&tag=${tag}`,
  );
};

const getExploreList = ({ limit = 20, offset = 0, tag = "" }) => {
  return axios.get(COMMON_BASE + `explore?tag=${tag}&limit=${limit}&offset=${offset}`);
};

const ExploreService = {
  getCommonExploreList,
  getMyDimensions,
  getExploreList,
  search,
  unAuthSearch,
};

export default ExploreService;
