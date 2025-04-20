import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const AVAILABILITY_BASE = '/accommodation/availability';
// GET AVAILABILITY
const getAvailabilities = (params) => {
    return TravelDashboardAPI.get(AVAILABILITY_BASE + `/list`, { params: { ...params } })
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
const getAvailabilityById = (params) => {
    return TravelDashboardAPI.get(AVAILABILITY_BASE + `/list-availability-details`, { ...{ params: params } })
        .then((res) => {
            return res.data.data
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// GET ROOM TYPES
const getRoomTypes = (params) => {
    return TravelDashboardAPI.get(AVAILABILITY_BASE + `/get-room-type`, { params: { ...params } })
        .then((res) => {
            return res.data.data
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// GET ROOM CAPACITY
const getRoomsCapacity = (accommodationId) => {
    return TravelDashboardAPI.get(AVAILABILITY_BASE + `/get-room-capacity/${accommodationId}`)
        .then((res) => {
            return res.data.data
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}
// get-last-action-type
const getLastActionType = (accommodationId) => {
    return TravelDashboardAPI.get(AVAILABILITY_BASE + `/get-last-action-type?accommodationId=${accommodationId}`)
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
// ADD Automatically
const addAutomatically = (prams) => {
    return TravelDashboardAPI.post(AVAILABILITY_BASE + '/add-automatically', {
        ...prams
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}
// Close Automatically
const closeAutomatically = (prams) => {
    return TravelDashboardAPI.post(AVAILABILITY_BASE + '/close-automatically', {
        ...prams
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// update
const updateAvailability = (availability) => {
    return TravelDashboardAPI.put(AVAILABILITY_BASE + '/edit', {
        ...availability
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}


const AvailabilityService = {
    getAvailabilities,
    getAvailabilityById,
    getAvailabilityByAccomdationId,
    getRoomTypes,
    getRoomsCapacity,
    getLastActionType,
    updateAvailability,
    addAvailability,
    addAutomatically,
    closeAutomatically
}

export default AvailabilityService;