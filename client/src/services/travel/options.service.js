import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "./config";
const OPTION_BASE = '/accommodation/contract/option';
// GET
const getOptions = (accommodation_Id, page = 1, size = 10) => {
    return TravelDashboardAPI.get(OPTION_BASE + `/list/${accommodation_Id}?page=${page}&size=${size}`).then((res) => {
        return {
            data: res.data.data.rows,
            totalCount: res.data.data.count,
            totalPages: res.data.data.totalPages,
        };
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// GET
const getOptionById = (option_id) => {
    return TravelDashboardAPI.get(OPTION_BASE + `/get-by-id/${option_id}`).then((res) => {
        return res.data.data
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// ADD
const addOption = (option) => {
    return TravelDashboardAPI.post(OPTION_BASE + '/add', {
        ...option
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// Update
const updateOption = (option) => {
    console.log(option)
    return TravelDashboardAPI.put(OPTION_BASE + '/edit/' + option.id, {
        ...option
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// Delete
const deleteOption = (id) => {
    return TravelDashboardAPI.delete(OPTION_BASE + '/delete/' + id)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const OptionsAPI = {
    getOptions,
    getOptionById,
    addOption,
    updateOption,
    deleteOption,
}

export default OptionsAPI;