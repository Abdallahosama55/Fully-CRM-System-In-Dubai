import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const COMMON_BASE = "/package/engagement";

const addPackageMessageTemplate = (payload) => {
  return TravelDashboardAPI.post(COMMON_BASE + `/add-template`, payload)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const addPackageMessage = (payload) => {
  return TravelDashboardAPI.post(COMMON_BASE + `/add-message`, payload)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const listEngagementTags = () => {
  return TravelDashboardAPI.get(COMMON_BASE + `/list-tags`)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const listEngagementTemplates = (params) => {
  console.log(params, "params");
  return TravelDashboardAPI.get(COMMON_BASE + `/list-templates`, { params })
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};


const listEngagementMessages = (tripId) => {
  return TravelDashboardAPI.get(COMMON_BASE + `/list-messages/${tripId}`)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const deleteMessage = (messageId) => {
  return TravelDashboardAPI.delete(COMMON_BASE + `/delete-message/${messageId}`)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
}

const PackagesEngagementService = {
  addPackageMessageTemplate,
  addPackageMessage,
  listEngagementTags,
  listEngagementTemplates,
  listEngagementMessages,
  deleteMessage
};

export default PackagesEngagementService;
