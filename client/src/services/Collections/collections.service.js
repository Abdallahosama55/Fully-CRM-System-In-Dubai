import axios from "axios";
import { AI_API_BASE } from "../config";
const SERVICE_BASE = AI_API_BASE + "collections/";

const listCollections = () => {
  return axios.get(SERVICE_BASE + "list?limit=30");
};

const queryCollections = (params = {}) => {
  let queryParams = "";
  for (const [key, value] of Object.entries(params)) {
    queryParams + key + "=" + value + "&";
  }
  return axios.get(SERVICE_BASE + `query?${queryParams}`);
};

const getCollectionByName = (collectionName) => {
  return axios.get(SERVICE_BASE + `get-one?collectionName=${collectionName}`);
};

const getDocumentByid = (collectionName, ids) => {
  return axios.get(
    SERVICE_BASE + `get-one?collectionName=${collectionName}&ids=${ids}`
  );
};

const createOrEditCollection = (data) => {
  return axios.post(SERVICE_BASE + "create-update", data);
};

const deleteCollection = (collectionName) => {
  return axios.delete(SERVICE_BASE + `delete?collectionName=${collectionName}`);
};

const addOrEditsDocuments = (data) => {
  return axios.post(SERVICE_BASE + `add-update-to-collection`, data);
};

const getMetadata = (collectionName) => {
  return axios.get(
    SERVICE_BASE + `get-metadata?collectionName=${collectionName}`
  );
};

const deleteDocument = (collectionName = "", ids = "") => {
  return axios.delete(
    SERVICE_BASE + `delete-document?collectionName=${collectionName}&ids=${ids}`
  );
};

const CollectionsService = {
  listCollections,
  queryCollections,
  getCollectionByName,
  createOrEditCollection,
  deleteCollection,
  addOrEditsDocuments,
  getMetadata,
  deleteDocument,
  getDocumentByid,
};

export default CollectionsService;
