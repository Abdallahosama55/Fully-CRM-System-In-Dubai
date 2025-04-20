import { AVAILABILITY_TYPES, PICK_UP_TYPES } from "constants/EXPERIENCE";
import { TravelDashboardAPI } from "../../config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
const STEPS_BASE = "/experience/product/product-steps";
// GET STEPS
const getExperianceSteps = (productId) => {
  return TravelDashboardAPI.get(STEPS_BASE + `/get/${productId}`)
    .then((res) => {
      /*
      {
    "id": 215,
    "lastFinishedTabIndex": 5,
    "lastFinishedStepIndex": 3,
    "pickUp": "PICK_UP_ONLY",
    "availabilityType": "DATESANDTIME"
  }
      */
      const { lastFinishedTabIndex, lastFinishedStepIndex, pickUp, availabilityType } = res.data.data;

      switch (lastFinishedTabIndex) {
        case 0:
          // Experience tab
          return {
            lastFinishedTabIndex,
            lastFinishedStepIndex: lastFinishedStepIndex > 5 ? 5 : lastFinishedStepIndex,
            pickUp,
            availabilityType
          }
        case 1:
          // Availability tab
          let tempAvailabilityTabLastFinishedStepIndex = 0;
          if (availabilityType === AVAILABILITY_TYPES.DATE_AND_TIME) {
            tempAvailabilityTabLastFinishedStepIndex = lastFinishedStepIndex > 4 ? 4: lastFinishedStepIndex;
          } else if (availabilityType === AVAILABILITY_TYPES.PASS) {
            tempAvailabilityTabLastFinishedStepIndex = lastFinishedStepIndex > 3 ? 3: lastFinishedStepIndex;
          }

          return {
            lastFinishedTabIndex,
            lastFinishedStepIndex: tempAvailabilityTabLastFinishedStepIndex,
            pickUp,
            availabilityType
          }
        case 2:
          // Cancellation tab
          return {
            lastFinishedTabIndex,
            lastFinishedStepIndex: 0,
            pickUp,
            availabilityType
          }
        case 3:
          // Pricing tab
          return {
            lastFinishedTabIndex,
            lastFinishedStepIndex: 0,
            pickUp,
            availabilityType
          }
        case 4:
          // Meet & Pick tab
          console.log({lastFinishedStepIndex})
          let tempMeetAndPickUpTabLastFinishedStepIndex = 0;
          if (pickUp === PICK_UP_TYPES.MEET_ON_LOCATION || pickUp === PICK_UP_TYPES.PICK_UP_ONLY) {
            tempMeetAndPickUpTabLastFinishedStepIndex =  lastFinishedStepIndex > 2 ? 2: lastFinishedStepIndex;
          } else if (pickUp === PICK_UP_TYPES.MEET_ON_LOCATION_OR_PICK_UP) {
            tempMeetAndPickUpTabLastFinishedStepIndex = lastFinishedStepIndex > 4 ? 4: lastFinishedStepIndex;
          }

          console.log({
            lastFinishedTabIndex,
            lastFinishedStepIndex: tempMeetAndPickUpTabLastFinishedStepIndex,
            pickUp,
            availabilityType
          })
          return {
            lastFinishedTabIndex,
            lastFinishedStepIndex: tempMeetAndPickUpTabLastFinishedStepIndex,
            pickUp,
            availabilityType
          }
        case 5:
          // Booking tab
          return {
            lastFinishedTabIndex,
            lastFinishedStepIndex: lastFinishedStepIndex > 2 ? 2 : lastFinishedStepIndex,
            pickUp,
            availabilityType
          }
        case 6:
          // Advanced tab
          return {
            lastFinishedTabIndex,
            lastFinishedStepIndex: lastFinishedStepIndex > 2 ? 2 : lastFinishedStepIndex,
            pickUp,
            availabilityType
          }
        default:
          return {
            lastFinishedTabIndex: 6,
            lastFinishedStepIndex: lastFinishedStepIndex > 2 ? 2 : lastFinishedStepIndex,
            pickUp,
            availabilityType
          }
      }
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// UPDATE STEPS
const updateExperianceSteps = (steps) => {
  return TravelDashboardAPI.put(STEPS_BASE + `/update`, steps)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const StepsService = {
  getExperianceSteps,
  updateExperianceSteps,
};

export default StepsService;
