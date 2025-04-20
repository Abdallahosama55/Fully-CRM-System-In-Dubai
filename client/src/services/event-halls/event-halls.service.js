import axios from "axios";
import { API_BASE } from "../config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const SERVICE_BASE = API_BASE + "vindo/event-hall";

// GET EVENT HALLS
const getEventHalls = (eventId) => {
    return axios.get(SERVICE_BASE + `/get/${eventId}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// GET EVENT HALLS
const getEventHallById = (eventId) => {
    return axios.get(SERVICE_BASE + `/get-by-id/${eventId}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// ADD EVENT HALLS
const addEventHall = (eventId , payload) => {
    return axios.post(SERVICE_BASE + `/add/${eventId}` , {...payload})
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// EDIT EVENT HALLS
const editEventHall = (id, payload) => {
    return axios.put(SERVICE_BASE + `/edit/${id}` , {...payload , id: undefined})
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// DELETE EVENT HALLS
const deleteEventHall = (id) => {
    return axios.delete(SERVICE_BASE + `/delete/${id}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};


const EventHallsService = {
    getEventHalls,
    getEventHallById,
    addEventHall,
    editEventHall,
    deleteEventHall
}

export default EventHallsService;

