import axios from "axios";

import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/settings/country";

const getAll = () => {
    return axios.get(SERVICE_BASE + `/get`);
};

const addCountry = (data) => {
    return axios.post(SERVICE_BASE + '/add', data);
};
const deleteCountry = (id) => {
    return axios.delete(SERVICE_BASE + '/delete/' + id);
};
const editCountry = (id, data) => {
    return axios.put(SERVICE_BASE + `/edit/${id}`, data);
};
const toggleActivationCountry = (id) => {
    return axios.put(SERVICE_BASE + `/toggle-active/${id}`);
};
const getActiveAll = () => {
    return axios.get(SERVICE_BASE + `/get-active`);
};

const countriesService = {
    getAll,
    addCountry,
    deleteCountry,
    editCountry,
    toggleActivationCountry,
    getActiveAll
};

export default countriesService;
