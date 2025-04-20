import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "./config";
const ROOM_BASE = '/accommodation/contract/rates';
// add
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

// get
const getPurchaseRateByIds = (data) => {
    return TravelDashboardAPI.get(ROOM_BASE + `/get-by-id?purchaseContractId=${data.purchaseContractId}&seasonId=${data.seasonId}`)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// get
const getSaleRateByIds = (data) => {
    return TravelDashboardAPI.get(ROOM_BASE + `/get-by-id?purchaseContractId=${data.purchaseContractId}&seasonId=${data.seasonId}&salesContractId=${data.salesContractId}`)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}


const RateAPI = {
    addRate,
    getPurchaseRateByIds,
    getSaleRateByIds
}

export default RateAPI;