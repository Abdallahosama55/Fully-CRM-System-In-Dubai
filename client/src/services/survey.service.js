import axios from "axios";
import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "survey/";

const getSurvey = ({ limit, offset }) => {
  return axios.get(SERVICE_BASE + `get-list?limit=${limit}&offset=${offset}`);
};

const addSurvey = (data) => {
  return axios.post(SERVICE_BASE + "add", data);
};

const SurveyService = {
  addSurvey,
  getSurvey,
};

export default SurveyService;
