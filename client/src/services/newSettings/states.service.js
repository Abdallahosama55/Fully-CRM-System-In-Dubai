import axios from "axios";

import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/settings/state";

const getAll = () => {
    return axios.get(SERVICE_BASE + `/get`);
};

const addState = (data) => {
    return axios.post(SERVICE_BASE + '/add', data);
};
const deleteState = (id) => {
    return axios.delete(SERVICE_BASE + '/delete/' + id);
};
const editState = (id, data) => {
    return axios.put(SERVICE_BASE + `/edit/${id}`, data);
};
const toggleActivationState = (id) => {
    return axios.put(SERVICE_BASE + `/toggle-active/${id}`);
};
const getStatesByCountryId = (CountryId) => {
    return axios.get(SERVICE_BASE + `/get-by-country/${CountryId}`);
};

const statesService = {
    getAll,
    addState,
    deleteState,
    editState,
    toggleActivationState,
    getStatesByCountryId
};

export default statesService;
