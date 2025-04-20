import axios from "axios";
import { generatePath } from "react-router-dom";
import { API_BASE } from "services/config";

const SERVICE_BASE_MEETING = API_BASE + "vindo/meeting/";

const createMeeting = (data) => axios.post(SERVICE_BASE_MEETING + "add", data);
const UpdateLabel = (meetingId, data) =>
  axios.put(
    SERVICE_BASE_MEETING +
      generatePath("label/:id", {
        id: meetingId,
      }),
    data,
  );

const UpdateMeetingStatus = (meetingId, data) => {
  return axios.put(
    SERVICE_BASE_MEETING +
      generatePath(`${data.status.name}/:id`, {
        id: meetingId,
      }),
    {
      actionReason: data.status.name,
    },
  );
};
const getQueuesList = (params = {}) =>
  axios.get(SERVICE_BASE_MEETING + "upcoming", {
    params: { aiAgent: false, ...params },
  });
const getMeetingById = (id, params = {}) =>
  axios.get(SERVICE_BASE_MEETING + "get/" + id, { params: params });
const deleteMeeting = (id) => {
  return axios.delete(SERVICE_BASE_MEETING + "delete/" + id);
};
const updateMeeting = (id, data) => axios.put(SERVICE_BASE_MEETING + "edit/" + id, data);
const meetingsService = {
  UpdateLabel,
  getQueuesList,
  updateMeeting,
  getMeetingById,
  deleteMeeting,
  createMeeting,
  UpdateMeetingStatus,
};

export default meetingsService;
