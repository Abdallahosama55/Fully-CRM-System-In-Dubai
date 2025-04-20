import axios from "axios";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const TRANSFER_CLIENT_BOOKING_LINK = import.meta.env.VITE_BASE_TRAVEL_ENDPOINT + '/v1/b2c/transfer';
// GET TRANSFER SEARCH RESULTS
const getTransferSearchResults = (request) => {
    const newRequet = {
        ...request,
        from: JSON.stringify(request?.from),
        to: JSON.stringify(request?.to),
    }

    return axios.get(TRANSFER_CLIENT_BOOKING_LINK + `/search-vehicle`, { params: { ...newRequet } })
        .then((res) => {
            return res.data.data
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const getVehicleTypes = () => {
    return axios.get(TRANSFER_CLIENT_BOOKING_LINK + `/list-vehicle-type`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            console.log(error);
            throw new Error(responseErrorMessageExtractor(error));
        });
};

const getVehicleBrands = () => {
    return axios.get(TRANSFER_CLIENT_BOOKING_LINK + `/list-vehicle-brand`)
        .then((res) => {
            return res?.data?.data?.rows;
        })
        .catch((error) => {
            console.log(error);
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// GET TRANSFER BY ID
const getTransferById = (id) => {
    return axios.get(TRANSFER_CLIENT_BOOKING_LINK + `/get-by-id/${id}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// book an transfer
const bookAnTransfer = (payload) => {
    return axios.post(TRANSFER_CLIENT_BOOKING_LINK + `/book-transfer`, { ...payload })
        .then((res) => {
            return res?.data?.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const TransferBookingService = {
    getTransferSearchResults,
    bookAnTransfer,
    getTransferById,
    getVehicleTypes,
    getVehicleBrands
}

export default TransferBookingService;