import axios from "axios";
import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/unauth/";

const getById = (id) => {
  return axios.get(SERVICE_BASE + `get-slider/${id}`);
};
const getUpCommingEvents = () => {
  return axios.get(SERVICE_BASE + `get-upcomming-events`);
};

const SliderService = {
  getById,
  getUpCommingEvents,
};

export default SliderService;
