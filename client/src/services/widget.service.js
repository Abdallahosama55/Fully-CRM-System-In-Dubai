import axios from "axios";
import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "vindo/widget/";

const getData = () => {
  return axios.get(SERVICE_BASE + "get-data");
};

const update = (data) => {
  return axios.put(SERVICE_BASE + "update", data);
};

const WidgetService = {
  getData,
  update,
};

export default WidgetService;
