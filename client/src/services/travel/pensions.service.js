import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "./config";
const PENSION_BASE = '/accommodation/pension/';
// GET
const getPensions = () => {
    return TravelDashboardAPI.get(PENSION_BASE + "/list/").then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// ADD
const addPension = (pension) => {
    return TravelDashboardAPI.post(PENSION_BASE + '/add', {
        ...pension
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// Update
const updatePension = (pension) => {
    return TravelDashboardAPI.put(PENSION_BASE + '/edit/' + pension.id, {
        ...pension
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// Delete
const deletePension = (id) => {
    return TravelDashboardAPI.delete(PENSION_BASE + '/delete/' + id)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const PensionsAPI = {
    getPensions,
    addPension,
    updatePension,
    deletePension,
}

export default PensionsAPI;