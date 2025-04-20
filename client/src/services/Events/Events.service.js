import axios from "axios";
import { API_BASE, API_BASE_DOMAIN } from "../config";

const SERVICE_BASE = API_BASE + "vindo/event/";
const SERVICE_BASE_DOMAIN = API_BASE_DOMAIN + "vindo/event/";
const COMMON_SERVICE_BASE = API_BASE + "common/event/";

const addEvent = (data) => {
  return axios.post(SERVICE_BASE + `add`, data);
};

const updateEvent = (data, id) => {
  return axios.put(SERVICE_BASE + `edit/${id}`, data);
};
const getEvents = (params = {}) => {
  return axios.get(SERVICE_BASE + `get`, { params: { ...params } });
};
const deleteEvent = (id) => {
  return axios.delete(SERVICE_BASE + `delete/${id}`);
};

const getEventById = (id, params = {}) => {
  return axios.get(SERVICE_BASE + `get-by-id/${id}`, { params: { ...params } });
};

const checkEmailEventAccess = (eventId, email) => {
  return axios.get(COMMON_SERVICE_BASE + `check-email-event-access/${eventId}?email=${email}`);
};

const eventEnroll = (eventId) => {
  return axios.post(SERVICE_BASE_DOMAIN + `enroll/${eventId}`);
};

const getSpeakerProfile = (eventId, userId) => {
  return axios.get(SERVICE_BASE_DOMAIN + `${eventId}/speaker/get-by-id/${userId}`);
};

const updateSpeakerProfile = (eventId, userId, data) => {
  return axios.put(SERVICE_BASE_DOMAIN + `${eventId}/speaker/edit/${userId}`, data);
};

const EventService = {
  addEvent,
  getEvents,
  deleteEvent,
  getEventById,
  updateEvent,
  checkEmailEventAccess,
  eventEnroll,
  getSpeakerProfile,
  updateSpeakerProfile,
};

export default EventService;
