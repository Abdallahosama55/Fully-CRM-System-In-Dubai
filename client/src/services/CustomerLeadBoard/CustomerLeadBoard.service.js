import axios from "axios";
import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/";
// const SERVICE_BASE = API_BASE + "vindo/employee-v2";
//tasks
const addTask = (data) => {
  return axios.post(SERVICE_BASE + `taskDemo`, data);
};
const getTasks = (params = {}) => {
  return axios.get(SERVICE_BASE + `taskDemo`, { params: { ...params } });
};
const deleteTask = (id) => {
  return axios.delete(SERVICE_BASE + `taskDemo/${id}`);
};

const updateTaskPriority = (taskId, priorityId) => {
  return axios.patch(SERVICE_BASE + `taskDemo/${taskId}`, { priorityId: priorityId });
};
const updateTaskAssignTo = (taskId, assignToId) => {
  return axios.patch(SERVICE_BASE + `taskDemo/${taskId}`, { assignToId: assignToId });
};
//notes
const addNote = (data) => {
  return axios.post(SERVICE_BASE + `addNoteDemo`, data);
};
const getNotes = (params = {}) => {
  return axios.get(SERVICE_BASE + `getNotesDemo`, { params: { ...params } });
};
const deleteNote = (id) => {
  return axios.delete(SERVICE_BASE + `deleteNoteDemo/${id}`);
};
//emails
const sendEmail = (data) => {
  return axios.post(SERVICE_BASE + `EmailDemo`, data);
};
const getEmails = (params = {}) => {
  return axios.get(SERVICE_BASE + `EmailDemo`, { params: { ...params } });
};
//calls
const addCall = (data) => {
  return axios.post(SERVICE_BASE + `addCallDemo`, data);
};
const getCalls = (params = {}) => {
  return axios.get(SERVICE_BASE + `getCallsDemo`, { params: { ...params } });
};
//meetings
const getMeetings = (params = {}) => {
  return axios.get(SERVICE_BASE + `getMeetingsDemo`, { params: { ...params } });
};
const updateMeetingReminder = (meetingId, statusId) => {
  return axios.patch(SERVICE_BASE + `updateMeetingReminderDemo/${meetingId}`, {
    statusId: statusId,
  });
};
const updateMeetingDuration = (meetingId, durationId) => {
  return axios.patch(SERVICE_BASE + `updateMeetingDurationDemo/${meetingId}`, {
    durationId: durationId,
  });
};
//CustomerProperties
const getCustomerProperties = (params = {}) => {
  return axios.get(SERVICE_BASE + `getCustomerPropertiesDemo`, { params: { ...params } });
};
const CustomerLeadBoardService = {
  addTask,
  getTasks,
  deleteTask,
  addNote,
  getNotes,
  deleteNote,
  sendEmail,
  getEmails,
  updateTaskAssignTo,
  updateTaskPriority,
  addCall,
  getCalls,
  getMeetings,
  getCustomerProperties,
  updateMeetingReminder,
  updateMeetingDuration,
};

export default CustomerLeadBoardService;
