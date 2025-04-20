import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "../../config";
const EXPERIANCE_BASE = "/experience/product";
// GET CONFIRM BOOKING TYPE INFO
const getConfirmBookingType = (productId) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/confirm-booking-type/get/${productId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD CONFIRM BOOKING TYPE INFO
const addConfirmBookingType = (productId, req) => {
  return TravelDashboardAPI.post(EXPERIANCE_BASE + `/confirm-booking-type/add/${productId}`, req)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET CONTACT INFO
const getContactInfoQuestions = () => {
  return TravelDashboardAPI.get(
    EXPERIANCE_BASE + `/contact-information/list-system-contact-information`,
  )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET CONTACT INFO
const getContactInfo = (productId) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/contact-information/get/${productId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD CONTACT INFO
const addContactInfo = (productId, data) => {
  return TravelDashboardAPI.post(EXPERIANCE_BASE + `/contact-information/add/${productId}`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};
const BookingTab = {
  getConfirmBookingType,
  addConfirmBookingType,
  getContactInfo,
  addContactInfo,
  getContactInfoQuestions,
};

export default BookingTab;
