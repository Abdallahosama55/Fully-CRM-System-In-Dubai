import axios from "axios";

import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/settings/service";

const getAll = () => {
    return axios.get(SERVICE_BASE + `/get`);
};

const addServiceType = (data) => {
    return axios.post(SERVICE_BASE + '/add', data);
};
const deleteServiceType = (id) => {
    return axios.delete(SERVICE_BASE + '/delete/' + id);
};
const editServiceType = (id, data) => {
    return axios.put(SERVICE_BASE + `/edit/${id}`, data);
};
const toggleActivationServiceType = (id) => {
    return axios.put(SERVICE_BASE + `/toggle-active/${id}`);
};

const ServiceTypeService = {
    getAll,
    addServiceType,
    deleteServiceType,
    editServiceType,
    toggleActivationServiceType
};

export default ServiceTypeService;
