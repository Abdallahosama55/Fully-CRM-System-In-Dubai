import axios from "axios";
import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "vindo/booked-meeting/";

const callsSearch = ({ limit = 10, offset = 0, searchKey = "", columnName = "name" }) => {
  return axios.post(
    SERVICE_BASE +
      `calls-search/?limit=${limit}&offset=${offset}&searchKey=${searchKey}&columnName=${columnName}`,
  );
};

const getById = (id) => {
  return axios.get(SERVICE_BASE + `get-by-id/${id}`);
};

const addMeeting = (data) => {
  return axios.post(SERVICE_BASE + "add-meeting", data);
};

const editMeeting = (data, id) => {
  return axios.put(SERVICE_BASE + `edit-meeting/${id}`, data);
};

const deleteMeeting = (id) => {
  return axios.delete(SERVICE_BASE + `delete-meeting/${id}`);
};

const listEmployeeMeetings = () => {
  return axios.get(SERVICE_BASE + "list-employee-meetings");
};
const bookMeeting = (data) => {
  return axios.post(SERVICE_BASE + "book-meeting", data);
};

const BookedMeetingService = {
  callsSearch,
  getById,
  addMeeting,
  editMeeting,
  deleteMeeting,
  listEmployeeMeetings,
  bookMeeting,
};

export default BookedMeetingService;
