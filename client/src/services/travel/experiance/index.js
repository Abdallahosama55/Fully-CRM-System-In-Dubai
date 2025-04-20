import ExperianceTap from "./ExperianceTab/experiance.service";
import PricingTap from "./PricingTab/pricing.service";
import AvailabilityTab from "./AvailabilityTab/availability.service";
import BookingTab from "./BookingTab/booking.service";
import PickUpTab from "./PickUpTab/pick_up.service";

import AgendaService from "./ExperianceAgenda/agendas.service";
import ExtrasService from "./ExperianceExtra/extras.service";
import StepsService from "./ExperianceSteps/steps.service";
import BookingQuestionsService from "./BookingQuestions/booking_questions.service";
import AdvancedService from "./AdvancedTab/advanced.service";

import { TravelDashboardAPI } from "../config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
const EXPERIANCE_BASE = "/experience/product";

const getAllExperiances = (params) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/list`, {
    params: { ...params },
  })
    .then((res) => {
      return {
        data: res.data.data.rows,
        total: res.data.data.count,
      };
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const activateExperiance = (productId) => {
  return TravelDashboardAPI.put(EXPERIANCE_BASE + `/activate/${productId}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const deleteExperiance = (id) => {
  return TravelDashboardAPI.delete(EXPERIANCE_BASE + `/delete/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const ExperianceService = {
  ExperianceTap,
  PricingTap,
  PickUpTab,
  BookingTab,
  AvailabilityTab,

  AgendaService,
  ExtrasService,
  BookingQuestionsService,
  StepsService,
  AdvancedService,

  deleteExperiance,
  getAllExperiances,
  activateExperiance,
};

export default ExperianceService;
