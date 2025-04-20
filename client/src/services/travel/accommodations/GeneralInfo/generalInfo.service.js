import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "../../config";
const GENERAL_INFO_BASE = "/accommodation/general-info";


// GET ACCOMDATION GENERAL INFO
const getGeneralInfo = (id) => {
    return TravelDashboardAPI.get(GENERAL_INFO_BASE + `/get/${id}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};


// ADD ACCOMDATION GENERAL INFO
const addGeneralInfo = (data) => {
    return TravelDashboardAPI.post(GENERAL_INFO_BASE + `/add`, { ...data })
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};


// EDIT ACCOMDATION GENERAL INFO
const editGeneralInfo = (accommodationID, data) => {
    return TravelDashboardAPI.put(GENERAL_INFO_BASE + `/edit/${accommodationID}`, { ...data })
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

const AccommodationGeneralInfoService = {
    getGeneralInfo,
    addGeneralInfo,
    editGeneralInfo
}

export default AccommodationGeneralInfoService;

