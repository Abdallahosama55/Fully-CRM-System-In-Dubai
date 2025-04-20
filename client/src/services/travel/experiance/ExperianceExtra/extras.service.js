import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "../../config";
const EXPERIANCE_BASE = "/experience/product/extras";
// GET ALL AGENDAS
const getExtras = (productId) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/list/${productId}`)
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

// CREATE NEW Extra
const addExteaItem = (extra, productId) => {
  return TravelDashboardAPI.post(EXPERIANCE_BASE + `/add/${productId}`, { ...extra })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// CREATE NEW Extra
const passExtraStep = (productId) => {
  return TravelDashboardAPI.post(EXPERIANCE_BASE + `/add/${productId}`, { isPassed: true })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// UPDATE EXTRA
const updateExtraItem = (extra) => {
  return TravelDashboardAPI.put(EXPERIANCE_BASE + `/edit/${extra.id}`, { ...extra })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// DELETE EXTRA
const deleteExtraItem = (id) => {
  return TravelDashboardAPI.delete(EXPERIANCE_BASE + `/delete/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const ExtrasService = {
  getExtras,
  addExteaItem,
  updateExtraItem,
  deleteExtraItem,
  getById,
  passExtraStep,
};

export default ExtrasService;
