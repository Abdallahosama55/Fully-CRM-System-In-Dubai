import axios from "axios";

import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "vindo/web-builder";

const addOrEditWebPage = (content) => {
    return axios.post(`${SERVICE_BASE}/add-web-builder`, { content })
        .then((res) => res.data);
};

const getWebPage = () => {
    return axios.get(`${SERVICE_BASE}/get-web-builder`)
        .then((res) => {
            return res?.data?.data?.content
        });
};

const WebBuilderService = {
    addOrEditWebPage,
    getWebPage
}

export default WebBuilderService;
