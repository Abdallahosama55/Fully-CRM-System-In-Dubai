import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const COMMON_BASE = "/package/pricing";

const addPricingRule = (payload) => {
    return TravelDashboardAPI.post(COMMON_BASE + `/add-pricing-rule`, payload)
        .then((res) => {
            return res?.data?.data;
        })
        .catch((error) => {
            console.log(error);
            throw new Error(responseErrorMessageExtractor(error));
        });
}

const getPricingRule = (tripId) => {
    return TravelDashboardAPI.get(COMMON_BASE + `/get-pricing-rule/${tripId}`)
        .then((res) => {
            return res?.data?.data;
        })
        .catch((error) => {
            console.log(error);
            throw new Error(responseErrorMessageExtractor(error));
        });
}

const getTotalPricingItem = (tripId) => {
    return TravelDashboardAPI.get(COMMON_BASE + `/get-total-pricing-item/${tripId}`)
    .then((res) => {
        return res?.data?.data;
    })
    .catch((error) => {
        console.log(error);
        throw new Error(responseErrorMessageExtractor(error));
    });
}
const PackagesPricingService = {
    addPricingRule,
    getPricingRule,
    getTotalPricingItem
}

export default PackagesPricingService