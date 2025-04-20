import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { v4 as uuidv4 } from "uuid";

const ACOMMODATION_BASE = "/accommodation/tbo";

const getHotels = (payload) => {
  return TravelDashboardAPI.post(ACOMMODATION_BASE + `/search-local`, payload)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getHotelRooms = (payload) => {
  const mapRooms = (rooms) =>
    rooms?.map?.((el) => ({
      ...el,
      bookingKey: el?.bookingKey || uuidv4(),
      childs: el?.children,
      children: undefined,
      isLocalRoom: true,
    })) || [];

  return TravelDashboardAPI.post(ACOMMODATION_BASE + `/get-local-hotel-rooms`, {
    ...payload,
  })
    .then((res) => {
      return {
        ...res.data.data,
        roomsData: res.data.data?.roomsData.map((el) => {
          return {
            ...el,
            rooms: mapRooms(el.rooms),
          };
        }),
      };
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

const AccommodationLocalService = {
  getHotelRooms,
  getHotels,
  bookLocal,
};

export default AccommodationLocalService;
