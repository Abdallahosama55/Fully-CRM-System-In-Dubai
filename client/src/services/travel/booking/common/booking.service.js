import BOOKINGS_TYPES from "constants/BOOKINGS_TYPES";
import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const BOOKING_BASE = "/common";
// GET BOOKINGS
const getBookings = ({ page, size, type, ...rest }) => {
  return TravelDashboardAPI.get(BOOKING_BASE + `/list-bookings`, {
    params: {
      size,
      page,
      type: type ? type : BOOKINGS_TYPES.ALL,
      ...rest,
    },
  })
    .then((res) => {
      return {
        data: res.data.data.rows,
        total: res.data.data.count,
        totalPages: res.data.data?.totalPages,
      };
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getHotelBookingById = (params) => {
  return TravelDashboardAPI.get(BOOKING_BASE + `/booking-details/get-hotel-reservation-data`, {
    params: params,
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getExperienceBookingById = (params) => {
  return TravelDashboardAPI.get(BOOKING_BASE + `/booking-details/get-experince-reservation-data`, {
    params: params,
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getFlightBookingById = (params) => {
  console.log("params", params);
  return TravelDashboardAPI.get(BOOKING_BASE + `/booking-details/get-flight-reservation-data`, {
    params: params,
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getTransferBookingById = (params) => {
  console.log("params", params);
  return TravelDashboardAPI.get(BOOKING_BASE + `/booking-details/get-transfer-reservation-data`, {
    params: params,
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getAirportHotelTransferBookingById = (params) => {
  return TravelDashboardAPI.get(
    BOOKING_BASE + `/booking-details/get-airport-hotel-transfer-reservation-data`,
    { params: params },
  )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const sendVoucherEmail = (payload) => {
  return TravelDashboardAPI.post(BOOKING_BASE + `/booking-details/send-email`, { payload })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getDownloadVoucher = (params) => {
  return TravelDashboardAPI.get(BOOKING_BASE + `/booking-details/download-voucher`, {
    params: params,
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getPrintVoucher = (params) => {
  return TravelDashboardAPI.get(BOOKING_BASE + `/booking-details/print-voucher`, { params: params })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const BookingsService = {
  getBookings,
  getHotelBookingById,
  getExperienceBookingById,
  getFlightBookingById,
  getTransferBookingById,
  getAirportHotelTransferBookingById,
  sendVoucherEmail,
  getDownloadVoucher,
  getPrintVoucher,
};

export default BookingsService;
