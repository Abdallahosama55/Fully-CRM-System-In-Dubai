import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const ROOM_BASE = '/accommodation/contract/rates';
// ADD RATE
const addRate = (rate) => {
    return TravelDashboardAPI.post(ROOM_BASE + "/add", {
        ...rate
    }).then((res) => {
        return {
            data: res.data.data,
        };
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// GET RATE
const getRateBySeasonID = (seasonID) => {
    return TravelDashboardAPI.get(ROOM_BASE + `/get-by-id?seasonId=${seasonID}`).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// GET RATES COUNT
const getRatesCount = (accommodationid) => {
    return TravelDashboardAPI.get(ROOM_BASE + `/list?accommodationId=${accommodationid}`)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const RateService = {
    addRate,
    getRateBySeasonID,
    getRatesCount
}

export default RateService;