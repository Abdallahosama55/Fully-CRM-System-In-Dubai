import axios from "axios";
import { API_BASE } from "../config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const SERVICE_BASE = API_BASE + "vindo/event-partner";

// GET EVENT PARTNERS
const getEventPartners = (eventId) => {
  return axios
    .get(SERVICE_BASE + `/get/${eventId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET EVENT PARTNER
const getEventPartnerById = (eventId) => {
  return axios
    .get(SERVICE_BASE + `/get-by-id/${eventId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD EVENT PARTNER
const addEventPartner = (eventId, payload) => {
  return axios
    .post(SERVICE_BASE + `/add/${eventId}`, { ...payload })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// EDIT EVENT PARTNER
const editEventPartner = (id, payload) => {
  return axios
    .put(SERVICE_BASE + `/edit/${id}`, { ...payload, id: undefined })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// DELETE EVENT PARTNER
const deleteEventPartner = (id) => {
  return axios
    .delete(SERVICE_BASE + `/delete/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const EventPartnersService = {
  getEventPartners,
  getEventPartnerById,
  addEventPartner,
  editEventPartner,
  deleteEventPartner,
};

export default EventPartnersService;
