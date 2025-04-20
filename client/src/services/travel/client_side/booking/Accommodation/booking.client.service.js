import axios from "axios";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const ACCOMMODATION_CLIENT_BOOKING_LINK = import.meta.env.VITE_BASE_TRAVEL_ENDPOINT + '/v1/b2c/accommodation';
// GET HOTELS
const getHotels = (request) => {
    return axios.get(ACCOMMODATION_CLIENT_BOOKING_LINK + `/get-hotel`, { params: { ...request } })
        .then((res) => {
            return res.data.data
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// GET PENSIONS
const getAccommodationPensionsList = () => {
    return axios.get(ACCOMMODATION_CLIENT_BOOKING_LINK + '/list-pensions')
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const getAccommodationTypesList = () => {
    return axios.get(ACCOMMODATION_CLIENT_BOOKING_LINK + '/list-types')
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// GET BY ID
const getAccommodationByID = (id) => {
    return axios.get(ACCOMMODATION_CLIENT_BOOKING_LINK + `/get-by-id/${id}`)
        .then((res) => {
            return res.data.data
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// GET HOTEL INFO
const getHotelRooms = (request) => {
    return axios.get(ACCOMMODATION_CLIENT_BOOKING_LINK + `/get-hotel-rooms`, { params: { ...request } })
        .then((res) => {
            return res.data.data
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// RESERVE ROOM
const reserveRoom = (payload) => {
    return axios.post(ACCOMMODATION_CLIENT_BOOKING_LINK + `/pre-book`, payload)
        .then((res) => {
            return res?.data?.data
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const BookingClientService = {
    getHotels,
    getHotelRooms,
    getAccommodationPensionsList,
    getAccommodationTypesList,
    reserveRoom,
    getAccommodationByID
}

export default BookingClientService;