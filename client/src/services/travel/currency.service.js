import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "./config";
const CURRENCY_BASE = '/common/list-currency';
// GET
const getCurrencyTypes = async () => {
    return TravelDashboardAPI.get(CURRENCY_BASE)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const CurrencyAPI = {
    getCurrencyTypes
}

export default CurrencyAPI;