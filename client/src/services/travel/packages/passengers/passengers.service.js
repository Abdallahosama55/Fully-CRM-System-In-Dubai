import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const COMMON_BASE = "/package/passengers";

const listSystemContactInformation = () => {
  return TravelDashboardAPI.get(COMMON_BASE + `/list-system-contact-information`)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const listPassengersRequierdInformation = (tripId) => {
  return TravelDashboardAPI.get(
    COMMON_BASE + `/list-passengers-requierd-information?tripId=${tripId}`,
  )
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const addContactInformation = (payload) => {
  return TravelDashboardAPI.post(COMMON_BASE + `/add-contact-information`, payload)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const addWhoCanSeeParticipants = (payload) => {
  return TravelDashboardAPI.put(COMMON_BASE + "/add-who-can-see-participants", payload)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getWhoCanSeeParticipants = (tripId) => {
  return TravelDashboardAPI.get(COMMON_BASE + `/get-who-can-see-participants/${tripId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getQuestions = (id) => {
  return TravelDashboardAPI.get(COMMON_BASE + `/get-questions?id=${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const addQuestion = (payload) => {
  return TravelDashboardAPI.post(COMMON_BASE + "/add-question", payload)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const editQuestion = (payload) => {
  return TravelDashboardAPI.put(COMMON_BASE + `/edit-question?id=${payload?.id}`, payload)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const deleteQuestion = (id) => {
  return TravelDashboardAPI.delete(COMMON_BASE + `/delete-question?id=${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const PackagesPassengersService = {
  addContactInformation,
  addWhoCanSeeParticipants,
  getWhoCanSeeParticipants,
  addQuestion,
  editQuestion,
  deleteQuestion,
  getQuestions,
  listSystemContactInformation,
  listPassengersRequierdInformation,
};

export default PackagesPassengersService;
