import axios from "axios";
import { API_BASE } from "../config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const SERVICE_BASE = API_BASE + "vindo/event/";

// GET EVENT PARTICIPANT
const getEventParticipants = (params) => {
    return axios.get(SERVICE_BASE + `${params?.eventId}/participant/list`, { params: { ...params } })
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// GET EVENT PARTICIPANT
const getEventParticipantById = (params) => {
    return axios.get(SERVICE_BASE + `${params.eventId}/participant/get/${params.id}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// ADD EVENT PARTICIPANT
const addEventParticipant = (eventId, payload) => {
    return axios.post(SERVICE_BASE + `${eventId}/participant/add`, payload)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// EDIT EVENT PARTICIPANT
const editEventParticipant = (eventId, id, payload) => {
    return axios.put(SERVICE_BASE + `${eventId}/participant/edit/${id}`, payload)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// DELETE EVENT PARTICIPANT
const deleteEventParticipant = (eventId, id) => {
    return axios.delete(SERVICE_BASE + `${eventId}/participant/delete/${id}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};


const EventParticipantsService = {
    getEventParticipants,
    getEventParticipantById,
    addEventParticipant,
    editEventParticipant,
    deleteEventParticipant
}

export default EventParticipantsService;

