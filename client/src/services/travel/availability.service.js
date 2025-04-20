import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "./config";
const AVAILABILITY_BASE = '/accommodation/availability';
// GET AVAILABILITY
const getAvailabilities = (request) => {
    return TravelDashboardAPI.get(AVAILABILITY_BASE + `/list`, { params: { ...request } })
        .then((res) => {
            return res.data.roomTypeDatesGrouped
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// GET AVAILABILITIES BY ACCOMDATION ID
const getAvailabilityByAccomdationId = (id) => {
    return TravelDashboardAPI.get(AVAILABILITY_BASE + `/list-accommodation-availability/${id}`)
        .then((res) => {
            return res.data.data
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// GET AVAILABILITY BY ID
const getAvailabilityById = (query) => {
    return TravelDashboardAPI.get(AVAILABILITY_BASE + `/list-availability-details`, { ...{ params: query } })
        .then((res) => {
            return res.data.data
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// GET ROOM TYPES
const getRoomTypes = (request) => {
    return TravelDashboardAPI.get(AVAILABILITY_BASE + `/get-room-type`, { params: { ...request } })
        .then((res) => {
            return res.data.data
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// ADD
const addAvailability = (availability) => {
    return TravelDashboardAPI.post(AVAILABILITY_BASE + '/add', {
        ...availability
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// ADD
const updateAvailability = (availability) => {
    return TravelDashboardAPI.put(AVAILABILITY_BASE + '/edit', {
        ...availability
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}


const AvailabilityAPI = {
    getAvailabilities,
    getAvailabilityById,
    updateAvailability,
    getAvailabilityByAccomdationId,
    getRoomTypes,
    addAvailability,
}

export default AvailabilityAPI;