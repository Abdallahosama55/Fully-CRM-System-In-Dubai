import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "../../config";
const BOOKING_QUESTIONS_BASE = "/experience/product/booking-question";
// GET ALL BOOKING QUESTIONS
const getQuestions = (productId) => {
  return TravelDashboardAPI.get(BOOKING_QUESTIONS_BASE + `/list/${productId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET BY ID
const getById = (id) => {
  return TravelDashboardAPI.get(BOOKING_QUESTIONS_BASE + `/get-by-id/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// CREATE NEW BOOKING QUESTION
const addQuestion = (productId, question) => {
  return TravelDashboardAPI.post(BOOKING_QUESTIONS_BASE + `/add/${productId}`, { ...question })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// UPDATE BOOKING QUESTION
const updateQuestion = (question) => {
  return TravelDashboardAPI.put(BOOKING_QUESTIONS_BASE + `/edit/${question.id}`, { ...question })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// DELETE BOOKING QUESTION
const deleteQuestion = (id) => {
  return TravelDashboardAPI.delete(BOOKING_QUESTIONS_BASE + `/delete/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const BookingQuestionsService = {
  getQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getById,
};

export default BookingQuestionsService;
