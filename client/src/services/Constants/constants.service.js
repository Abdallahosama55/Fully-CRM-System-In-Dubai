import axios from "axios";
import { API_BASE } from "services/config";

const SERVICE_BASE = API_BASE + "vindo/constant/";

const getScheduleTypes = () => {
  return axios.get(SERVICE_BASE + "get-scheduale-type");
};
const getMeetingStatus = () => {
  return axios.get(SERVICE_BASE + "get-meeting-status");
};
const ConstantService = {
  getMeetingStatus,
  getScheduleTypes,
};

export default ConstantService;
