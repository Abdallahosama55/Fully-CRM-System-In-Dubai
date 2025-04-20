// manual-booking
import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const BOOKING_BASE = "/manual-booking";

const listHotels = (params) => {
  return TravelDashboardAPI.get(BOOKING_BASE + `/accommodation/list-hotels`, {
    params: { ...params },
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const listHotelRooms = (payload) => {
  return TravelDashboardAPI.post(BOOKING_BASE + `/accommodation/get-hotel-rooms`, payload)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const bookHotel = (data) => {
  return TravelDashboardAPI.post(BOOKING_BASE + `/accommodation/book`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(
        Array.isArray(error?.response?.data?.errors) && error.response.data.errors.length > 0
          ? error?.response?.data?.errors[0]
          : error?.response?.data?.message || "something went wrong with the server",
      );
    });
};

const AccommodationBookingService = {
  listHotels,
  listHotelRooms,
  bookHotel,
};

const listExperiences = (params) => {
  return TravelDashboardAPI.get(BOOKING_BASE + `/experience/list-experience`, {
    params: { ...params },
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getExperiencePrice = ({ supplierId, experienceId, categories }) => {
  return TravelDashboardAPI.get(BOOKING_BASE + `/experience/get-price`, {
    params: { supplierId, experienceId, categories },
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const bookExperience = (data) => {
  return TravelDashboardAPI.post(BOOKING_BASE + `/experience/book`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(
        Array.isArray(error?.response?.data?.errors) && error.response.data.errors.length > 0
          ? error?.response?.data?.errors[0]
          : error?.response?.data?.message || "something went wrong with the server",
      );
    });
};

const ExperienceBookingService = {
  listExperiences,
  getExperiencePrice,
  bookExperience,
};

const listSuppliers = (params) => {
  return TravelDashboardAPI.get(BOOKING_BASE + `/list-suppliers`, { params: { ...params } })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const listAgents = () => {
  return TravelDashboardAPI.get(BOOKING_BASE + `/list-agents`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};
const bookFlight = (data) => {
  return TravelDashboardAPI.post(BOOKING_BASE + `/flight/book`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(
        Array.isArray(error?.response?.data?.errors) && error.response.data.errors.length > 0
          ? error?.response?.data?.errors[0]
          : error?.response?.data?.message || "something went wrong with the server",
      );
    });
};

const GetListFligtInSpecficDate = (data) => {
  return TravelDashboardAPI.post(`charter/list-flight-in-specific-date`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(
        Array.isArray(error?.response?.data?.errors) && error.response.data.errors.length > 0
          ? error?.response?.data?.errors[0]
          : error?.response?.data?.message || "something went wrong with the server",
      );
    });
};

const flightBooking = {
  bookFlight,
  GetListFligtInSpecficDate,
};

const bookTransfer = (data) => {
  return TravelDashboardAPI.post(BOOKING_BASE + `/airport-hotel-transfer/book`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(
        Array.isArray(error?.response?.data?.errors) && error.response.data.errors.length > 0
          ? error?.response?.data?.errors[0]
          : error?.response?.data?.message || "something went wrong with the server",
      );
    });
};

const transferBooking = {
  bookTransfer,
};

const ManualBookingService = {
  Accommodation: AccommodationBookingService,
  Experience: ExperienceBookingService,
  listSuppliers,
  listAgents,
  flightBooking,
  transferBooking,
};

export default ManualBookingService;
