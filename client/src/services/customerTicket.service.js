import axios from "axios";
import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "customer/ticket/";

const add = (data) => {
  return axios.post(SERVICE_BASE + "add", data);
};

const addReplay = (data) => {
  return axios.put(SERVICE_BASE + "add-replay", data);
};

const close = (ticketId) => {
  return axios.put(SERVICE_BASE + `close/${ticketId}`);
};

const getById = (id) => {
  return axios.get(SERVICE_BASE + `get-by-id/${id}`);
};

const CustomerTicketService = {
  add,
  addReplay,
  close,
  getById,
};

export default CustomerTicketService;
