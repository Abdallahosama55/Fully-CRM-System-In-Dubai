import axios from "axios";
import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/pipeline-source/";

const addSourceToEventPipeline = (pipelineId, data) => {
  return axios.post(SERVICE_BASE + `add/${pipelineId}`, data);
};
const getSourcesOfEventPipeline = (pipelineId, params = {}) => {
  return axios.get(SERVICE_BASE + `get/${pipelineId}`, { params: { ...params } });
};
const deleteSourceFromEventPipeline = (id) => {
  return axios.delete(SERVICE_BASE + `delete/${id}`);
};
const PipelineSources = {
  addSourceToEventPipeline,
  getSourcesOfEventPipeline,
  deleteSourceFromEventPipeline,
};

export default PipelineSources;
