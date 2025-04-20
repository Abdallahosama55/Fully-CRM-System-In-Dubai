import axios from "axios";
import { API_BASE } from "../config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const SERVICE_BASE = API_BASE + "vindo/event-section";

// GET EVENT SECTIONS
const getEventSections = (eventId) => {
    return axios.get(SERVICE_BASE + `/get/${eventId}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// GET EVENT SECTIONS
const getEventSectionById = (eventId) => {
    return axios.get(SERVICE_BASE + `/get-by-id/${eventId}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// ADD EVENT SECTION
const addEventSection = (eventId , payload) => {
    return axios.post(SERVICE_BASE + `/add/${eventId}` , {...payload})
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// EDIT EVENT SECTION
const editEventSection = (id, payload) => {
    return axios.put(SERVICE_BASE + `/edit/${id}` , {...payload , id: undefined})
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// DELETE EVENT SECTION
const deleteEventSection = (id) => {
    return axios.delete(SERVICE_BASE + `/delete/${id}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};


const EventsSectionsService = {
    getEventSections,
    getEventSectionById,
    addEventSection,
    editEventSection,
    deleteEventSection
}

export default EventsSectionsService;

