import axios from "axios";
import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "customer/meeting/";

const book = (data) => {
  return axios.post(SERVICE_BASE + "book", data);
};

const getByDay = (timeZone, deskId) => {
  return axios.get(SERVICE_BASE + `get-by-day?timeZone=${timeZone}&deskId=${deskId}`);
};

const CustomerMeetingService = {
  book,
  getByDay,
};

export default CustomerMeetingService;
