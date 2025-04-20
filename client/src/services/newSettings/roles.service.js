import axios from "axios";

import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/settings/role";

const getAll = () => {
    return axios.get(SERVICE_BASE + `/get`);
};

const addRole = (data) => {
    return axios.post(SERVICE_BASE + '/add', data);
};
const deleteRole = (id) => {
    return axios.delete(SERVICE_BASE + '/delete/' + id);
};
const editRole = (id, data) => {
    return axios.put(SERVICE_BASE + `/edit/${id}`, data);
};
// const toggleActivationCountry = (id) => {
//     return axios.put(SERVICE_BASE + `/toggle-active/${id}`);
// };
const getActiveAll = () => {
    return axios.get(SERVICE_BASE + `/get?type=active`);
};

const rolesService = {
    getAll,
    addRole,
    deleteRole,
    editRole,
    getActiveAll
};

export default rolesService;
