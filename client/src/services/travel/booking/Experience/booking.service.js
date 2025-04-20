import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const BOOKING_BASE = '/experience/booking';
// GET EXPERIANCE SEARCH RESULTS
const getExperianceSearchResults = (request) => {
    return TravelDashboardAPI.get(BOOKING_BASE + `/search`, { params: { ...request } })
        .then((res) => {
            return res.data.data
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}


const getPricingCategories = () => {
    return TravelDashboardAPI.get(BOOKING_BASE + "/list-pricing-category")
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}
// get product sessions
const getExperianceSessions = (bookingKey) => {
    return TravelDashboardAPI.get(BOOKING_BASE + `/get-product-sessions/${bookingKey}`)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// get product price updates
const getExperiancePriceUpdates = ({ productId, adults, children, bookingKey }) => {
    return TravelDashboardAPI.get(BOOKING_BASE + `/get-price-updates?productId=${productId}&categories={adults:${adults}${children ? `,children:'${children}'` : ""}}&bookingKey=${bookingKey}`)
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
    return TravelDashboardAPI.get(BOOKING_BASE + `/get-age-limit?productId=${experianceId}`)
        .then((res) => {
            return res?.data?.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// book an experiance
const bookAnExperiance = (payload) => {
    return TravelDashboardAPI.post(BOOKING_BASE + `/book` , {...payload})
        .then((res) => {
            return res?.data?.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const ExperienceBookingService = {
    getPricingCategories,
    getExperianceSearchResults,
    getExperianceSessions,
    getExperiancePriceUpdates,
    getExperianceAgeLimit,

    bookAnExperiance
}

export default ExperienceBookingService;