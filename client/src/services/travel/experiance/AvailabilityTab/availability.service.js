import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "../../config";
const EXPERIANCE_BASE = "/experience/product/session";
// ADD AVAILABILITY
const addAvailability = (productId, data) => {
  return TravelDashboardAPI.post(EXPERIANCE_BASE + `/add-availability/${productId}`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET AVAILABILITY
const getAvailability = (productId) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/get-availability-data/${productId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD DATE AND TIME AVAILABILITY ALL AGENDAS
// const addJustTime = (req, productId) => {
//     return TravelDashboardAPI.post(EXPERIANCE_BASE + `/add-just-dates/${productId}`, req)
//         .then((res) => {
//             return res.data.data;
//         }).catch((error) => {
//             throw new Error(responseErrorMessageExtractor(error));
//         })
// }

// ADD DATE AND TIME AVAILABILITY ALL AGENDAS
// const addPassAvilabilty = (req, productId) => {
//     return TravelDashboardAPI.post(EXPERIANCE_BASE + `/add-pass/${productId}`, req)
//         .then((res) => {
//             return res.data.data;
//         }).catch((error) => {
//             throw new Error(responseErrorMessageExtractor(error));
//         })
// }

// GET AVAILABILITY TYPE
const getAvailabilityType = (productId) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/get-product-availability/${productId}`)
    .then((res) => {
      console.log("res :>> ", res);
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET PRODUCT DURATION
const getProductDuration = (productId) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/get-product-duration/${productId}`)
    .then((res) => {
      return res.data.totalProductDurationMinutes;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD SESSION
const addSession = (productId, data) => {
  return TravelDashboardAPI.post(EXPERIANCE_BASE + `/add-dates-time/${productId}`, data)
    .then((res) => {
      return {
        status: true,
        date: res.data.data,
      };
    })
    .catch((error) => {
      if (Boolean(error.response.data?.data?.matchingDates)) {
        return {
          status: false,
          matchingDates: error.response.data?.data?.matchingDates,
        };
      } else {
        throw new Error(responseErrorMessageExtractor(error));
      }
    });
};

// GET SESSIONS
const getSessions = (productId) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/list-sessions/${productId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getSessionById = (sessionId) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/list-session-details/${sessionId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// DELETE SESSION
const deleteSession = (productId) => {
  return TravelDashboardAPI.delete(EXPERIANCE_BASE + `/delete/${productId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD CAPACITY
const addCapacity = (productId, data) => {
  return TravelDashboardAPI.put(EXPERIANCE_BASE + `/add-capacity/${productId}`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD MINIMUM NOTICE
const addMinimumNotice = (productId, data) => {
  return TravelDashboardAPI.put(EXPERIANCE_BASE + `/add-minimum-notice/${productId}`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const AvailabilityTab = {
  addAvailability,
  getAvailability,

  // addJustTime,
  // addPassAvilabilty,
  getAvailabilityType,
  getProductDuration,

  addSession,
  getSessions,
  deleteSession,
  getSessionById,

  addCapacity,
  addMinimumNotice,
};

export default AvailabilityTab;
