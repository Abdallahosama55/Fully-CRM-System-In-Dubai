import axios from "axios";
import { API_BASE } from "../config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const SERVICE_BASE = API_BASE + "vindo/event/";

// GET EVENT SESSIONS
const getEventSessions = (params) => {
    return axios.get(SERVICE_BASE + `${params?.eventId}/session/list`, { params: { ...params } })
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// GET EVENT SESSIONS
const getEventSessionById = (params) => {
    return axios.get(SERVICE_BASE + `${params.eventId}/session/get/${params.id}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// ADD EVENT SESSIONS
const addEventSession = (eventId, payload) => {
    return axios.post(SERVICE_BASE + `${eventId}/session/add`, payload)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// EDIT EVENT SESSIONS
const editEventSession = (eventId, id, payload) => {
    return axios.put(SERVICE_BASE + `${eventId}/session/edit/${id}`, payload)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// DELETE EVENT SESSIONS
const deleteEventSession = (eventId, id) => {
    return axios.delete(SERVICE_BASE + `${eventId}/session/delete/${id}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};


const EventSessionsService = {
    getEventSessions,
    getEventSessionById,
    addEventSession,
    editEventSession,
    deleteEventSession
}

export default EventSessionsService;

