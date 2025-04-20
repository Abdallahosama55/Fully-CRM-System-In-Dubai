import axios from "axios";

import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/settings/department";

const getAll = () => {
    return axios.get(SERVICE_BASE + `/get`);
};

const addDepartement = (data) => {
    return axios.post(SERVICE_BASE + '/add', data);
};
const deleteDepartement = (id) => {
    return axios.delete(SERVICE_BASE + '/delete/' + id);
};
const editDepartement = (id, data) => {
    return axios.put(SERVICE_BASE + `/edit/${id}`, data);
};
const toggleActivationDepartement = (id) => {
    return axios.put(SERVICE_BASE + `/toggle-active/${id}`);
};

const departementService = {
    getAll,
    addDepartement,
    deleteDepartement,
    editDepartement,
    toggleActivationDepartement
};

export default departementService;
