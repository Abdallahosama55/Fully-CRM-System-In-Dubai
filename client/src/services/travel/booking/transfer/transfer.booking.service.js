import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const BOOKING_BASE = '/transfer';
// GET TRANSFER SEARCH RESULTS
const getTransferSearchResults = (request) => {
    const newRequet={
        ...request,
        from : JSON.stringify(request?.from),
        to: JSON.stringify(request?.to),
    }

    return TravelDashboardAPI.get(BOOKING_BASE + `/search-vehicle`, { params: { ...newRequet } })
        .then((res) => {
            return res.data.data
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// book an transfer
const bookAnTransfer = (payload) => {
    return TravelDashboardAPI.post(BOOKING_BASE + `/book-transfer`, { ...payload })
        .then((res) => {
            return res?.data?.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const TransferBookingService = {
    getTransferSearchResults,
    bookAnTransfer
}

export default TransferBookingService;