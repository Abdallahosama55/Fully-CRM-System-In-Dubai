import axios from "axios";

import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "/social-event";

const getAgoraRteTokens = (channel, role, uid, expiry) => {
  return axios
    .get(`${SERVICE_BASE}/agora/rte`, {
      params: { channel, role, uid, expiry },
    })
    .then((res) => res.data);
};

const createWhiteboardRoom = () => {
  return axios.get(`${SERVICE_BASE}/agora/whiteboard/create-room`);
};

const genWhiteboardRoomToken = (whiteboardRoomId) => {
  return axios.get(`${SERVICE_BASE}/agora/whiteboard/gen-room-token`, {
    params: { whiteboardRoomId },
  });
};

const createMeeting = (data) => {
  return axios.post(`${SERVICE_BASE}/create`, data);
};

const attendEvent = (eventId) => {
  return axios.put(`${SERVICE_BASE}/attend-event/${eventId}`);
};

const getMyCalendar = ({ date }) => {
  return axios.get(`${SERVICE_BASE}/my-calendar?date=${date}`);
};

const confirmMeet = (meetingId) => {
  return axios.put(`${SERVICE_BASE}/confirm/${meetingId}`);
};

const declineMeet = (meetingId) => {
  return axios.put(`${SERVICE_BASE}/declin/${meetingId}`);
};

const getMedia = () => {
  return axios.get(`${SERVICE_BASE}/get-media`);
};

const SocialEventService = {
  getAgoraRteTokens,
  createWhiteboardRoom,
  genWhiteboardRoomToken,
  createMeeting,
  attendEvent,
  getMyCalendar,
  confirmMeet,
  declineMeet,
  getMedia,
};

export default SocialEventService;
