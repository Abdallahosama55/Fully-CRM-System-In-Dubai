import axios from "axios";
import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "vindo/ticket/";

const search = ({ limit = 10, offset = 0, searchKey = "", columnName = "name" }) => {
  return axios.get(
    SERVICE_BASE +
      `search?limit=${limit}&offset=${offset}&searchKey=${searchKey}&columns[]=${columnName}`,
  );
};

const add = (data) => {
  return axios.post(SERVICE_BASE + "add", data);
};

const addReplay = (data) => {
  return axios.put(SERVICE_BASE + "add-replay", data);
};

const updateType = (data, ticketId) => {
  return axios.put(SERVICE_BASE + `update-type/${ticketId}`, data);
};

const updateStatus = (data, ticketId) => {
  return axios.put(SERVICE_BASE + `update-status/${ticketId}`, data);
};

const updatePriority = (data, ticketId) => {
  return axios.put(SERVICE_BASE + `update-priority/${ticketId}`, data);
};

const reassignTicket = (data, ticketId) => {
  return axios.put(SERVICE_BASE + `re-assign/${ticketId}`, data);
};

const getById = (id) => {
  return axios.get(SERVICE_BASE + `get-by-id/${id}`);
};

const TicketService = {
  add,
  search,
  addReplay,
  updateType,
  updateStatus,
  updatePriority,
  getById,
  reassignTicket,
};

export default TicketService;
