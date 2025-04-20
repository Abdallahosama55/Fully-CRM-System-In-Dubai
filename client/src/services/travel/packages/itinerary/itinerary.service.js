import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const COMMON_BASE = "/package/itinerary";
const getItineraryDays = (tripId) => {
    return TravelDashboardAPI.get(COMMON_BASE + `/list`, { params: {tripId} })
        .then((res) => {
            return res?.data?.data;
        })
        .catch((error) => {
            console.log(error);
            throw new Error(responseErrorMessageExtractor(error));
        });
}

const addItineraryDay = (payload) => {
    return TravelDashboardAPI.post(COMMON_BASE + `/add-day`, { ...payload })
        .then((res) => {
            return res?.data?.data;
        })
        .catch((error) => {
            console.log(error);
            throw new Error(responseErrorMessageExtractor(error));
        });
}


const editItineraryDescription = (payload) => {
    return TravelDashboardAPI.put(COMMON_BASE + `/edit-itinerary-description/${payload?.id}`, { ...payload })
        .then((res) => {
            return res?.data?.data;
        })
        .catch((error) => {
            console.log(error);
            throw new Error(responseErrorMessageExtractor(error));
        });
}


const addItemToItinerary = (payload) => {
    return TravelDashboardAPI.post(COMMON_BASE + `/add-item-to-itinerary`, { ...payload })
    .then((res) => {
        return res?.data?.data;
    })
    .catch((error) => {
        console.log(error);
        throw new Error(responseErrorMessageExtractor(error));
    });
}


const deleteItemFromItinerary = (params) => {
    return TravelDashboardAPI.delete(COMMON_BASE + `/remove-item-from-itinerary`, { params })
    .then((res) => {
        return res?.data?.data;
    })
    .catch((error) => {
        console.log(error);
        throw new Error(responseErrorMessageExtractor(error));
    });
}

const getLibraryItems = (params) => {
    return TravelDashboardAPI.get(COMMON_BASE + `/get-library-items`, { params: params })
        .then((res) => {
            return res?.data?.data;
        })
        .catch((error) => {
            console.log(error);
            throw new Error(responseErrorMessageExtractor(error));
        });
}

const getItineraryItemById = (itineraryId) => {
    return TravelDashboardAPI.get(COMMON_BASE + `/get-itinerary-item-by-id/${itineraryId}`)
    .then((res) => {
        return res?.data?.data;
    })
    .catch((error) => {
        console.log(error);
        throw new Error(responseErrorMessageExtractor(error));
    });
}

const ItineraryService = {
    getLibraryItems,
    getItineraryDays,
    getItineraryItemById,
    
    addItineraryDay,
    editItineraryDescription,
    addItemToItinerary,
    deleteItemFromItinerary
}

export default ItineraryService