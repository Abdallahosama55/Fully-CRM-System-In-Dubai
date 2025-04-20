import axios from "axios";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const API_BASE = import.meta.env.VITE_BASE_TRAVEL_ENDPOINT + "dashboard";
// GET VOUCHER DETAILS
const getVoucherDetails = (params) => {
  return axios
    .get(API_BASE + `/get-voucher-details`, { params: { ...params } })
    .then((res) => res.data.data)
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const VoucherDetailsService = {
    getVoucherDetails,
};

export default VoucherDetailsService;
