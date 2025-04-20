import axios from "axios";

import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "agora/";

const getAgoraRteTokens = (channel, role, uid, expiry) => {
  return axios
    .get(`${SERVICE_BASE}rte`, {
      params: { channel, role, uid, expiry },
    })
    .then((res) => res.data);
};

const createWhiteboardRoom = () => {
  return axios.get(`${SERVICE_BASE}whiteboard/create-room`);
};

const genWhiteboardRoomToken = (whiteboardRoomId) => {
  return axios.get(`${SERVICE_BASE}whiteboard/gen-room-token`, {
    params: { whiteboardRoomId },
  });
};

const AgoraService = {
  getAgoraRteTokens,
  createWhiteboardRoom,
  genWhiteboardRoomToken,
};

export default AgoraService;
