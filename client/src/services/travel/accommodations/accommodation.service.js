import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "../config";

const ACOMMODATION_BASE = "/accommodation";
// GET
const getAccommodations = (params) => {
  return TravelDashboardAPI.get(ACOMMODATION_BASE + `/list`, { params: { ...params } })
    .then((res) => {
      return {
        data: res.data.data.rows,
        totalCount: res.data.data.count,
        totalPages: res.data.data.totalPages,
      };
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};
// GET BY ID
const getAccommodationByID = (id) => {
  return TravelDashboardAPI.get(ACOMMODATION_BASE + `/get-by-id/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// DELETE
const deleteAccommodation = (accommodationId) => {
  return TravelDashboardAPI.delete(ACOMMODATION_BASE + "/delete/" + accommodationId)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// COMMON
const getLanguagesList = () => {
  return TravelDashboardAPI.get("/common/list-languages")
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getAccommodationTypesList = () => {
  return TravelDashboardAPI.get(ACOMMODATION_BASE + "/common/list-types")
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getAccommodationFacilitiesList = () => {
  return TravelDashboardAPI.get(ACOMMODATION_BASE + "/common/list-facilities")
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getAccommodationPensionsList = () => {
  return TravelDashboardAPI.get(ACOMMODATION_BASE + "/common/list-pensions")
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getAccommodationTabIndex = (id) => {
  return TravelDashboardAPI.get(ACOMMODATION_BASE + `/common/get-accommodation-index/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};
const getNationalites = () => {
  return TravelDashboardAPI.get(ACOMMODATION_BASE + `/common/list-nationalites`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// get cites
const getCites = (params) => {
  return TravelDashboardAPI.get(ACOMMODATION_BASE + `/common/get-cites`, { params: { ...params } })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};
// get cites
const getCitesNotAuth = (params, name) => {
  return TravelDashboardAPI.post(
    "/unauth/search-location",
    { type: ["CITY"], name },
    { params: { ...params } },
  )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};
// get hotel list by city
const getHotelListByCity = ({ city, country, ...rest }) => {
  return TravelDashboardAPI.get(ACOMMODATION_BASE + `/common/get-hotel-tbo-list-by-city`, {
    params: { ...rest, cityName: city, countryName: country },
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};
// get hotel info by name
const getHotelInfoByName = (hotelCode) => {
  return TravelDashboardAPI.get(
    ACOMMODATION_BASE + `/common/get-hotel-tbo-data-by-name?hotelCode=${hotelCode}`,
  )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const AccommodationAPI = {
  getAccommodations,
  getAccommodationByID,
  deleteAccommodation,
  getLanguagesList,
  getAccommodationTypesList,
  getAccommodationFacilitiesList,
  getAccommodationPensionsList,
  getAccommodationTabIndex,
  getNationalites,
  getCites,
  getHotelListByCity,
  getHotelInfoByName,
  getCitesNotAuth,
};

export default AccommodationAPI;
