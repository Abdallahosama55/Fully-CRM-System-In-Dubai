import axios from "axios";
import { API_BASE_DOMAIN } from "../config";

const SERVICE_BASE = API_BASE_DOMAIN + "customer-portal/events/";
const UN_AUTH_SERVICE_BASE = API_BASE_DOMAIN + "customer-portal/unauth/";

const eventEnroll = (eventId) => {
  return axios.post(SERVICE_BASE + `enroll/${eventId}`);
};

const unAuthEventEnroll = (eventId, email) => {
  return axios.post(UN_AUTH_SERVICE_BASE + `event-enroll/${eventId}`, { email });
};

const CustmerPortalService = {
  eventEnroll,
  unAuthEventEnroll,
};

export default CustmerPortalService;
