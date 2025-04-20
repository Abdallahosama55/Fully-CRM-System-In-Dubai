import axios from "axios";
import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/";

const addPipelineTemplate = (data) => {
  return axios.post(SERVICE_BASE + `pipeline-template`, data);
};
const getPipelineTemplates = (params = {}) => {
  return axios.get(SERVICE_BASE + `pipeline-template`, { params: { ...params } });
};
const deleteTemplate = (id) => {
  return axios.delete(SERVICE_BASE + `pipeline-template/${id}`);
};
const updateTemplate = (id, data) => {
  return axios.put(SERVICE_BASE + `pipeline-template/${id}`, data);
};
const getPipelines = (params = {}) => {
  return axios.get(SERVICE_BASE + `pipeline`, { params: { ...params } });
};
const getPipelinesStatistics = (params = {}) => {
  return axios.get(SERVICE_BASE + `pipeline/statistics`, { params: { ...params } });
};
const pipelineTemplateService = {
  addPipelineTemplate,
  getPipelineTemplates,
  deleteTemplate,
  updateTemplate,
  getPipelines,
  getPipelinesStatistics,
};

export default pipelineTemplateService;
