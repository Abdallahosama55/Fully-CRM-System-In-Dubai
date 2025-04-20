import axios from "axios";
import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "vindo/unauth/";

const getSlider = (id) => {
  return axios.get(SERVICE_BASE + "get-slider/" + id);
};

const SliderService = {
  getSlider,
};

export default SliderService;
