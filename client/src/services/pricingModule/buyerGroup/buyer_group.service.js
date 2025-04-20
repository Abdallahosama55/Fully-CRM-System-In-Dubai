import axios from "axios";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";


const SERVICE_BASE_OFFICES = import.meta.env.VITE_BASE_TRAVEL_ENDPOINT + "/dashboard/buyer-group/";

const addBuyerGroup = (params) => {
    return axios.post(SERVICE_BASE_OFFICES + "add", params)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
};


const editBuyerGroup = (params) => {
    return axios.put(SERVICE_BASE_OFFICES + `edit/${params.id}`, params)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
};

const getBuyerGroupById = (id) => {
    return axios.get(SERVICE_BASE_OFFICES + `get-by-id/${id}`)
        .then((res) => {
        return res.data.data;
    }).catch((error) => {
        console.log(error)
        throw new Error(responseErrorMessageExtractor(error));
    })
};

const getBuyerGroups = (params) => {
    return axios.get(SERVICE_BASE_OFFICES + `list`, {
        params: params,
    }).then((res) => {
        return res.data.data
    }).catch((error) => {
        console.log(error)
        throw new Error(responseErrorMessageExtractor(error));
    })
};


const deleteBuyerGroupById = (id) => {
    return axios.delete(SERVICE_BASE_OFFICES + `delete/${id}`).then((res) => {
        return res.data.data;
    }).catch((error) => {
        console.log(error)
        throw new Error(responseErrorMessageExtractor(error));
    })
};

const BuyerGroupService = {
    addBuyerGroup,
    editBuyerGroup,
    getBuyerGroupById,
    getBuyerGroups,
    deleteBuyerGroupById
};

export default BuyerGroupService;
