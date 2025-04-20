import axios from "axios";
import { API_BASE } from "services/config";

const SERVICE_BASE = API_BASE + "vindo/unauth/";

const getCompanyInfo = () => {
  return axios.get(SERVICE_BASE + "get-company-info").then((res) => {
    return res.data.data;
  });
};

const CompanyInfoService = {
  getCompanyInfo,
};

export default CompanyInfoService;
