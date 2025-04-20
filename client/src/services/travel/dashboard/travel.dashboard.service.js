import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "./config";

// GET HOTELS
const add = (data) => {
  return TravelDashboardAPI.post(`/airport-hotel-transfer/add`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};
const airportSearch = (data = {}) => {
  return TravelDashboardAPI.get(`/charter/search-airport`, { params: { ...data } })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getListVehicle = (data) => {
  return TravelDashboardAPI.get(`/transfer/list-vehicle`, { params: { ...data } })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};
const searchAirportHotelTransfer = (data = {}) => {
  return TravelDashboardAPI.post(`/airport-hotel-transfer/search`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};
const getOneOfAirportHotelTransfer = (id) => {
  return TravelDashboardAPI.get(`/airport-hotel-transfer/get/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const searchEngine = (data) => {
  return TravelDashboardAPI.post(`/airport-hotel-transfer/search-engine`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};
const airportHotelTransferBooking = (data) => {
  return TravelDashboardAPI.post(`/airport-hotel-transfer/book`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};
const accommodationList = (data) => {
  https: return TravelDashboardAPI.get(`/accommodation/list-with-tbo`, { params: { ...data } })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};
const airportsAccommodationList = (data) => {
  return TravelDashboardAPI.get(`/common/list-airports-accomodations`, {
    params: { ...data },
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const edit = (id, data) => {
  return TravelDashboardAPI.put(`/airport-hotel-transfer/edit/${id}`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const TravelDashboard = {
  add,
  airportSearch,
  getListVehicle,
  searchAirportHotelTransfer,
  getOneOfAirportHotelTransfer,
  searchEngine,
  accommodationList,
  edit,
  airportsAccommodationList,
  airportHotelTransferBooking,
};

export default TravelDashboard;
