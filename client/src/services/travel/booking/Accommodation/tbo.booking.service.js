import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const BOOKING_BASE = '/accommodation/tbo';
// GET HOTELS
const getHotels = (request) => {
    return TravelDashboardAPI.get(BOOKING_BASE + `/search-local`, { params: { ...request } })
        .then((res) => {
            return res.data.data
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// GET HOTEL INFO
const getHotelRooms = (request) => {
    return TravelDashboardAPI.get(BOOKING_BASE + `/get-hotel-rooms`, { params: { ...request } })
        .then((res) => {
            return res.data.data
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}


const TboBookingService = {
    getHotels,
    getHotelRooms,
}

export default TboBookingService;