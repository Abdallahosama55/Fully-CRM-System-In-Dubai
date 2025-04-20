import axios from "axios";
import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/slider/";
const SERVICE_BASE_ITEM = API_BASE + "vindo/slider-item/";
const getSliders = ({ limit = 10, page = 1 }) => {
  return axios.get(SERVICE_BASE + `get?page=${page}&limit=${limit}`);
};
const deleteSlider = (id) => {
  return axios.delete(SERVICE_BASE + "delete/" + id);
};
const addSlider = (data) => {
  return axios.post(SERVICE_BASE + "add", data);
};
const upsertSliderItem = (data) => axios.post(SERVICE_BASE_ITEM + "add-edit", data);
const getSliderById = (id) => {
  return axios.get(SERVICE_BASE + "get-by-id/" + id);
};
export const updateSliderInfo = (id, data) => {
  return axios.put(SERVICE_BASE + "edit/" + id, data);
};
const SliderService = {
  updateSliderInfo,
  getSliderById,
  upsertSliderItem,
  getSliders,
  addSlider,
  deleteSlider,
};

export default SliderService;
