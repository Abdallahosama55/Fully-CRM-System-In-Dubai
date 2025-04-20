import axios from "axios";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const EXPERIANCE_CLIENT_BOOKING_LINK = import.meta.env.VITE_BASE_TRAVEL_ENDPOINT + '/v1/b2c/experience';
// GET EXPERIANCE SEARCH RESULTS
const getExperianceSearchResults = (request) => {
    return axios.get(EXPERIANCE_CLIENT_BOOKING_LINK + `/search`, { params: { ...request } })
        .then((res) => {
            return res.data.data
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}


const getPricingCategories = () => {
    return axios.get(EXPERIANCE_CLIENT_BOOKING_LINK + "/list-pricing-category")
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}
// get product sessions
const getExperianceSessions = (bookingKey) => {
    return axios.get(EXPERIANCE_CLIENT_BOOKING_LINK + `/get-product-sessions/${bookingKey}`)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// get product price updates
const getExperiancePriceUpdates = ({ productId, adults, children, bookingKey }) => {
    return axios.get(EXPERIANCE_CLIENT_BOOKING_LINK + `/get-price-updates?productId=${productId}&categories={adults:${adults}${children ? `,children:'${children}'` : ""}}&bookingKey=${bookingKey}`)
        .then((res) => {
            return {
                ...res?.data?.data[0],
                bookingKey: res?.data?.newBookingKey
            };
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// book an experiance
const getExperianceAgeLimit = (experianceId) => {
    return axios.get(EXPERIANCE_CLIENT_BOOKING_LINK + `/get-age-limit?productId=${experianceId}`)
        .then((res) => {
            return res?.data?.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// book an experiance
const bookAnExperiance = (payload) => {
    return axios.post(EXPERIANCE_CLIENT_BOOKING_LINK + `/book` , {...payload})
        .then((res) => {
            return res?.data?.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}


// book an experiance
const getContactInformation = (experianceId) => {
    return axios.get(EXPERIANCE_CLIENT_BOOKING_LINK + `/get-contact-information/${experianceId}`)
        .then((res) => {
            return res?.data?.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}


const ExperienceBookingClientService = {
    getPricingCategories,
    getExperianceSearchResults,
    getExperianceSessions,
    getExperiancePriceUpdates,
    getExperianceAgeLimit,
    getContactInformation,

    bookAnExperiance
}

export default ExperienceBookingClientService;