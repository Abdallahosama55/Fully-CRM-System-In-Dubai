import axios from "axios";

import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/constant";

const getNationality = () => {
  return axios.get(SERVICE_BASE + `/get-nationality`);
};

const constantService = {
  getNationality,
};

export default constantService;
