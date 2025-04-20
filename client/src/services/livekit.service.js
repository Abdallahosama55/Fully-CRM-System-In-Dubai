import axios from "axios";
import { API_BASE } from "./config";

axios.defaults.withCredentials = false;

const SERVICE_BASE = API_BASE + "vindo/livekit/";
const getRoom = (room) => {
  return axios.get(SERVICE_BASE + `get-room/${room}`);
};

const updateRoomMetadata = (roomName, data) => {
  return axios.put(SERVICE_BASE + `update-room-metadata/${roomName}`, data);
};

const generateToken = (data) => {
  return axios.post(SERVICE_BASE + "generate-token", data);
};

const updateParticipant = (roomName, identity, data) => {
  return axios.put(SERVICE_BASE + `update-participant/${roomName}/${identity}`, { options: data });
};

const removeRoomParticipant = (room, identity) => {
  return axios.delete(SERVICE_BASE + `remove-participant/${room}/${identity}`);
};

const LivekitService = {
  getRoom,
  updateRoomMetadata,
  generateToken,
  updateParticipant,
  removeRoomParticipant,
};

export default LivekitService;
