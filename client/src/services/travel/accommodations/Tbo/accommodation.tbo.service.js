import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const ACOMMODATION_BASE = "/accommodation/tbo";

const getHotels = (request) => {
    return TravelDashboardAPI.get(ACOMMODATION_BASE + `/search`, { params: { ...request } })
        .then((res) => {
            return res.data.data
        }).catch((error) => {
            console.log(error)
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const getHotelRooms = (params) => {
  return TravelDashboardAPI.get(ACOMMODATION_BASE + `/get-hotel-rooms`, { params: { ...params } })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// BOOK LOCAL
const bookLocal = (payload) => {
  return TravelDashboardAPI.post(ACOMMODATION_BASE + `/book-local`, payload)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const AccommodationTboService = {
  getHotelRooms,
  getHotels,
  bookLocal,
};

export default AccommodationTboService;
