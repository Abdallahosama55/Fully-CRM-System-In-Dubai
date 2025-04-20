import axios from "axios";
import { API_BASE } from "services/config";

const SERVICE_BASE = API_BASE + "vindo/livekey/";

const get = () => {
  return axios.get(SERVICE_BASE + "get");
};

const add = (data) => {
  return axios.post(SERVICE_BASE + "add", data);
};

const deleteLivekey = (id) => {
  return axios.delete(SERVICE_BASE + `delete/${id}`);
};

const edit = (id, data) => {
  return axios.put(SERVICE_BASE + `edit/${id}`, data);
};

const LivekeyService = {
  get,
  add,
  deleteLivekey,
  edit,
};

export default LivekeyService;
