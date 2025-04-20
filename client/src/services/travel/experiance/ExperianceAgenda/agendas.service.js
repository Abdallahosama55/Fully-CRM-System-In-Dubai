import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "../../config";
const EXPERIANCE_BASE = "/experience/product/agendas";
// GET ALL AGENDAS
const getAgendas = (id) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/list/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET BY ID
const getById = (id) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/get-by-id/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// CREATE NEW AGENDA
const addAgendaItem = (agenda, id) => {
  console.log("adddddd :>> ", agenda);
  return TravelDashboardAPI.post(EXPERIANCE_BASE + `/add/${id}`, { ...agenda })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// UPDATE AGENDA
const updateAgendaItem = (editId, agenda) => {
  return TravelDashboardAPI.put(EXPERIANCE_BASE + `/edit/${editId}`, agenda)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// UPDATE AGENDA
const sortAgendas = (sortingData, productId) => {
  return TravelDashboardAPI.post(EXPERIANCE_BASE + `/sort/${productId}`, { sortingData })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// DELETE AGENDA
const deleteAgendaItem = (id) => {
  return TravelDashboardAPI.delete(EXPERIANCE_BASE + `/delete/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const AgendaService = {
  getAgendas,
  addAgendaItem,
  updateAgendaItem,
  deleteAgendaItem,
  getById,
  sortAgendas,
};

export default AgendaService;
