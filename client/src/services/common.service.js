import axios from "axios";
import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "common/dimensions/";
const COMMON_MEETING = API_BASE + "common/meeting/";
const COMMON_EVENT = API_BASE + "common/event/";
const VINDO_SERVICE_BASE = API_BASE + "vindo/common/";
const DIRECT_CALL = API_BASE + "vindo/direct-call/";
const COMMON_TEST_BASE = `${import.meta.env.VITE_BASE_ENDPOINT_DOMAIN}/api/v6`;

const getDimensionData = (dimId, companyId) => {
  return axios.get(SERVICE_BASE + `get-dimention-data?id=${dimId}&companyId=${companyId}`);
};

const customerSearch = ({ limit = 100, offset = 0, searchKey = "" }) => {
  return axios.get(
    VINDO_SERVICE_BASE + `customer-search?limit=${limit}&offset=${offset}&searchKey=${searchKey}`,
  );
};

const uploadFile = (file) => {
  const formData = new FormData();
  formData.set("file", file);

  return axios.post(API_BASE + `common/upload-file`, formData, {
    headers: {
      "Content-Type": "Multipart/form-data",
    },
  });
};

const accept = (callId) => {
  return axios.put(DIRECT_CALL + `accept/${callId}`);
};

const getMeetingInfo = (meetingId, type = "", token = "") => {
  return axios
    .get(`${COMMON_MEETING}get-meeting-info/${meetingId}?type=${type}&token=${token}`)
    .then((res) => res.data);
};

const getEventInfo = (eventId) => {
  return axios
    .get(`${COMMON_TEST_BASE}/company/vindo/unauth/get-event-info/${eventId}`)
    .then((res) => res.data);
};

const getPublicUserData = (userId) => {
  return axios.get(`${COMMON_MEETING}get-user-data/${userId}`).then((res) => res.data);
};

const uploadImage = (formData) => {
  return axios.post(VINDO_SERVICE_BASE + `upload-file`, formData);
};

const signUpJoinMeeting = (data) => {
  return axios.post(COMMON_TEST_BASE + `/customer-portal/auth/signup`, data);
};

const signOTPValidity = (data) => {
  return axios.post(COMMON_TEST_BASE + `/customer-portal/auth/check-otp`, data);
};

const completeSignUp = (data) => {
  return axios.post(COMMON_TEST_BASE + `/customer-portal/auth/complete-sign-up`, data);
};

const addToMyCalendar = (meetingId) => {
  return axios.post(COMMON_TEST_BASE + `/customer-portal/meetings/add-to-calendar/${meetingId}`);
};

const login = (data) => {
  return axios.post(COMMON_TEST_BASE + `/customer-portal/auth/login`, data);
};

const updateInfo = (data) => {
  return axios.put(VINDO_SERVICE_BASE + "update-info", data);
};

const enrollEvent = (enrollId, data) => {
  return axios.post(COMMON_TEST_BASE + `/customer-portal/events/enroll/${enrollId}`, data);
};

const checkEmailEventAccessAndEnroll = (eventId, email) => {
  return axios.get(COMMON_EVENT + `check-email-event-access-and-enroll/${eventId}?email=${email}`);
};

const CommonService = {
  getDimensionData,
  getPublicUserData,
  customerSearch,
  uploadFile,
  getMeetingInfo,
  accept,
  uploadImage,
  updateInfo,
  signUpJoinMeeting,
  signOTPValidity,
  completeSignUp,
  addToMyCalendar,
  login,
  getEventInfo,
  enrollEvent,
  checkEmailEventAccessAndEnroll,
};

export default CommonService;
