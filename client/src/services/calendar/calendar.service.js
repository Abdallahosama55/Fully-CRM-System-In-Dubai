import axios from "axios";

import { API_BASE } from "services/config";

const SERVICE_BASE_CALENDAR = API_BASE + "vindo/calendar/";

const getData = ({ type, ...params }) => {
  return axios.get(SERVICE_BASE_CALENDAR + `get`, {
    params: {
      calenderType: type,
      aiAgent: false,
      includeQueueAppointments: "yes",
      ...params,
    },
  });
};

const calendarService = {
  getData,
};

export default calendarService;
