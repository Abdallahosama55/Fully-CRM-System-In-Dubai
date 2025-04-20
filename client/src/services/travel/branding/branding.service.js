import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const BRANDING_BASE = '/branding';
// GET BRANDING
const getBranding = () => {
    return TravelDashboardAPI.get(BRANDING_BASE + `/get`)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// GET BRANDING TEMPLATE
const getBrandingTemplate = (voucher) => {
    return TravelDashboardAPI.get(BRANDING_BASE + `/get-template?type=${voucher}`)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// GET BRANDING TEMPLATE
const addBranding = (params) => {
    return TravelDashboardAPI.post(BRANDING_BASE + `/add`, params)
        .then((res) => {
            return res.data;
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const BrandingService = {
    getBranding,
    getBrandingTemplate,
    addBranding
}

export default BrandingService;