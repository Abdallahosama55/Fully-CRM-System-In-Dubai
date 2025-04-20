import axios from "axios";
import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "vindo/calendar/";

const getData = (type, date) => {
  return axios.get(SERVICE_BASE + `meetings?type=${type}&date=${date}`);
};

const CalendarService = {
  getData,
};

export default CalendarService;
