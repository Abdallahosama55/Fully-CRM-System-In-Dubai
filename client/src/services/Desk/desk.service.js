import axios from "axios";
import { API_BASE } from "../config";

const SERVICE_BASE = API_BASE + "vindo/desk/";

const addDesk = (data) => {
  return axios.post(SERVICE_BASE + "add", data);
};

const editDesk = (data) => {
  return axios.put(SERVICE_BASE + "edit", data);
};

const editDeskAI = (data) => {
  return axios.put(SERVICE_BASE + "edit-ai", data);
};

const searchDesks = ({ limit = 10, offset = 0, searchKey = "", columnName = "name" }) => {
  return axios.get(
    SERVICE_BASE +
    `search?limit=${limit}&offset=${offset}&searchKey=${searchKey}&columnName=${columnName}`,
  );
};
const getEmployeeDisk = () => {
  return axios.get(SERVICE_BASE + "get-employee-default-desk");
};

const getById = (id) => {
  return axios.get(SERVICE_BASE + `get-by-id/${id}`);
};

const addEditDeskEmployee = (data) => {
  return axios.post(SERVICE_BASE + "add-edit-employee", data);
};
const getAttachments = (id) => {
  return axios.get(SERVICE_BASE + "attachment/get", {
    params: {
      deskId: id,
    },
  });
};
const addAttachment = (id, data) => {
  return axios.post(SERVICE_BASE + `attachment/add?deskId=${id}`, data);
};
const deleteAttachment = (id) => axios.delete(SERVICE_BASE + `attachment/delete/${id}`);
const deleteDesk = (id) => axios.delete(SERVICE_BASE + `delete/${id}`);
const getDeskEmployees = (id) => {
  return axios.get(SERVICE_BASE + `get-employees/${id}`);
};
const updateMetaverse = (id, data) => axios.put(SERVICE_BASE + `metaverse/edit?deskId=${id}`, data);
const getMetaverse = (id) => axios.get(SERVICE_BASE + `metaverse/get?deskId=${id}`);
const getDesksEmployees = (type) => {
  return axios.get(SERVICE_BASE + `get-desks-employees`, {
    params: {
      type: type,
    },
  });
};

const DeskService = {
  addDesk,
  addAttachment,
  editDesk,
  editDeskAI,
  updateMetaverse,
  getMetaverse,
  searchDesks,
  getById,
  addEditDeskEmployee,
  getDeskEmployees,
  getDesksEmployees,
  getAttachments,
  deleteAttachment,
  deleteDesk,
  getEmployeeDisk,
};

export default DeskService;
