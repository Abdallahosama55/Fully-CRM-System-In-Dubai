import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const COMMON_BASE = "/package/common";

const listDestinations = (params) => {
    return TravelDashboardAPI.get(COMMON_BASE + `/list-destinations`, { params: params })
        .then((res) => {
            return res?.data?.data?.rows;
        })
        .catch((error) => {
            console.log(error);
            throw new Error(responseErrorMessageExtractor(error));
        });
}

const listThemes = () => {
    return TravelDashboardAPI.get(COMMON_BASE + "/list-themes")
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
}

const listWhoCanJoin = () => {
    return TravelDashboardAPI.get(COMMON_BASE + "/list-who-can-join")
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
}

const PackagesCommonService = {
    listDestinations,
    listThemes,
    listWhoCanJoin
}

export default PackagesCommonService