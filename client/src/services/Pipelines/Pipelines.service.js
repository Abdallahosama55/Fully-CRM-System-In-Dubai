import axios from "axios";
import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/";

const addItemStage = (data) => {
  // console.log("data==>", data);
  return axios.post(SERVICE_BASE + `pipeline-stage`, data);
};
const getStageItems = (params = {}) => {
  return axios.get(SERVICE_BASE + `pipeline-stage`, { params: { ...params } });
};

const updateStageItem = (id, data) => {
  return axios.put(SERVICE_BASE + `pipeline-stage/${id}`, data);
};
const deleteStageItem = (id) => {
  return axios.delete(SERVICE_BASE + `pipeline-stage/${id}`);
};
const updateStageItemOrder = (stageId, newOrder) => {
  return axios.patch(SERVICE_BASE + `pipeline-stage/${stageId}`, { newOrder: newOrder });
};
// Priority
const addPriorityItem = (data) => {
  return axios.post(SERVICE_BASE + `deals-priority`, data);
};

const getPriorityItems = (params = {}) => {
  return axios.get(SERVICE_BASE + `deals-priority`, { params: { ...params } });
};

const updatePriorityItemOrder = (leadPriorityId, newOrder) => {
  return axios.patch(SERVICE_BASE + `deals-priority/${leadPriorityId}`, { newOrder: newOrder });
};
const deletePriorityItem = (id) => {
  return axios.delete(SERVICE_BASE + `deals-priority/${id}`);
};
const updatePriorityItem = (id, data) => {
  return axios.put(SERVICE_BASE + `deals-priority/${id}`, data);
};
const deleteAndMoveStageItem = (data) => {
  return axios.post(
    SERVICE_BASE +
      `pipeline-stage/${data?.stageIdToRemove}/move?destinationStageId=` +
      data?.stageIdToMoveTo,
  );
};
const PipelinesService = {
  addItemStage,
  addPriorityItem,
  deleteStageItem,
  updateStageItem,
  getStageItems,
  getPriorityItems,
  updateStageItemOrder,
  deletePriorityItem,
  updatePriorityItem,
  updatePriorityItemOrder,
  deleteAndMoveStageItem,
};

export default PipelinesService;
