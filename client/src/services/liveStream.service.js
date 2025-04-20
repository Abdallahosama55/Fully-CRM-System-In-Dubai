import axios from "axios";
import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "vindo/event/";

const createLive = (data) => {
  return axios.post(SERVICE_BASE + "add", data);
};

const listLiveStreams = (params = {}) => {
  return axios.get(SERVICE_BASE + `get`, { params: { ...params } });
};

const getById = (id) => {
  return axios.get(SERVICE_BASE + `get-by-id/${id}`);
};
const getByIdHost = (id, token) => {
  return axios.get(SERVICE_BASE + `get-by-id-host/${id}?token=${token}`);
};

const goLive = (eventId, data) => {
  return axios.post(SERVICE_BASE + `go-live/${eventId}`, data);
};

const endLive = (eventId, data) => {
  return axios.post(SERVICE_BASE + `end-live/${eventId}`, data);
};

const LiveStreamService = {
  createLive,
  listLiveStreams,
  getByIdHost,
  getById,
  goLive,
  endLive,
};

export default LiveStreamService;
