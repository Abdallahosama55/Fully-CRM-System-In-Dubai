import axios from "axios";
import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "vindo/slider/";

const getSlider = () => {
  return axios.get(SERVICE_BASE + "get");
};

const addSlider = (data) => {
  return axios.post(SERVICE_BASE + "add", data);
};

const editSlider = (data) => {
  return axios.put(SERVICE_BASE + "edit", data);
};

const deleteSlider = (data) => {
  return axios.put(SERVICE_BASE + "delete", data);
};

const SliderService = {
  getSlider,
  addSlider,
  editSlider,
  deleteSlider,
};

export default SliderService;
