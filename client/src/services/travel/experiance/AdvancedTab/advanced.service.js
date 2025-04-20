import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "../../config";
const ADVANCED_BASE = "/experience/product/advanced";

// GET ALL ADVANCED
const getAdvanced = (id) => {
  return TravelDashboardAPI.get(ADVANCED_BASE + `/get-advanced/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD ADVANCED SETTINGS
const addAdvancedSettings = (productId, data) => {
  return TravelDashboardAPI.put(ADVANCED_BASE + `/settings/${productId}`, { ...data })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD ADVANCED TIME-ZONE
const addAdvancedTimeZone = (productId, data) => {
  return TravelDashboardAPI.put(ADVANCED_BASE + `/time-zone/${productId}`, { ...data })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD ADVANCED TIME-ZONE
const addAdvancedAdvanced = (productId, data) => {
  return TravelDashboardAPI.put(ADVANCED_BASE + `/advanced/${productId}`, { ...data })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const AdvancedService = {
  getAdvanced,
  addAdvancedSettings,
  addAdvancedAdvanced,
  addAdvancedTimeZone,
};

export default AdvancedService;
