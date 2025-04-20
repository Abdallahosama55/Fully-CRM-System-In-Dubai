import axios from "axios";
import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const BASE_URL = import.meta.env.VITE_BASE_ENDPOINT_DOMAIN + "/api/v6/vindo/web-builder"

const getPageContent = (params) => {
    return axios.get(BASE_URL + `/client/get-page-content`, { params: params })
        .then((res) => {
            console.log(res ,)
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};


const getPageById = (id) => {
    return axios.get(BASE_URL + `/get-page-content/${id}`)
        .then((res) => {
            console.log(res ,)
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

const getPagesList = (params) => {
    return TravelDashboardAPI.get(BASE_URL + `/list`, { params: params })
        .then((res) => {
            console.log(res ,)
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

const addPage = (payload) => {
    return TravelDashboardAPI.post(BASE_URL + `/add`, payload)
        .then((res) => {
            console.log(res ,)
            return res?.data?.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

const editPage = (payload) => {
    console.log(payload)
    return TravelDashboardAPI.put(BASE_URL + `/edit/${payload?.id}`, payload)
        .then((res) => {
            console.log(res ,)
            return res?.data?.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};


const deletePage = (id) => {
    return TravelDashboardAPI.delete(BASE_URL + `/delete/${id}`)
        .then((res) => {
            console.log(res ,)
            return res?.data?.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};



const WebBuilderService = {
    getPageContent,
    getPagesList,
    getPageById,

    addPage,
    editPage,
    deletePage,
}

export default WebBuilderService;