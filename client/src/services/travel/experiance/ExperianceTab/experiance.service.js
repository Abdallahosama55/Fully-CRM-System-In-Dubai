import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "../../config";
const EXPERIANCE_BASE = "/experience/product";
// CREATE EXPERIANCE
const createExperiance = (generalInfo, id) => {
  return TravelDashboardAPI.post(
    EXPERIANCE_BASE + "/general-info/add",
    id ? { ...generalInfo, id } : generalInfo,
  )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// CREATE EXPERIANCE
const getExperianceGeneralInfo = (id) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/general-info/get/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// categories-and-themes
// LIST CATEGORIES
const getCategories = () => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/categories-and-themes/list-categories`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// LIST THEMES
const getThemes = () => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/categories-and-themes/list-themes`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getCategoriesAndThemes = (productId) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/categories-and-themes/get/${productId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const addCategoriesAndThemes = (data, productId) => {
  return TravelDashboardAPI.post(EXPERIANCE_BASE + `/categories-and-themes/add/${productId}`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// inclusions
// LIST SERVICES
const getServices = () => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/inclusions-exclusions/list-services`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// LIST LANGUAGES
const getLanguages = () => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/inclusions-exclusions/list-language`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// LIST LANGUAGES NOT AUTH
const getLanguagesNotAuth = () => {
  return TravelDashboardAPI.get("/unauth/list-language")
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// EDIT INCLUSION
const addOrEditInclusions = (data, id) => {
  return TravelDashboardAPI.post(EXPERIANCE_BASE + `/inclusions-exclusions/add/${id}`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// EDIT INCLUSION
const getInclusions = (id) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/inclusions-exclusions/get/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// media
// ADD AND UPDATE MEDIA
const addOrEditMedia = (data, productId) => {
  return TravelDashboardAPI.post(EXPERIANCE_BASE + `/media/add/${productId}`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};
// GET MEDIA
const getMedia = (productId) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/media/list/${productId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// things to know
// GET PHYSICAL DIFFICULTY
const getPhysicalDifficulty = () => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/things-to-know/list-physical-difficulty-level`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET RESTRICTION
const getRestrictionsList = () => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/things-to-know/list-restriction`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD THINGS TO KNOW
const addThingsToKnow = (data, productId) => {
  return TravelDashboardAPI.post(EXPERIANCE_BASE + `/things-to-know/add/${productId}`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET THINGS TO KNOW
const getThingsToKnow = (productId) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/things-to-know/get/${productId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD EXPERIANCE TYPE
const addExperianceType = ({ id, type }) => {
  return TravelDashboardAPI.post(EXPERIANCE_BASE + `/type/add/${id}`, { type })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET EXPERIANCE TYPE
const getExperianceType = (productId) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/type/get/${productId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// UPDATE DONE STEPS
const updateDoneSteps = ({ id, doneSteps }) => {
  return TravelDashboardAPI.post(EXPERIANCE_BASE + `/done-steps/add/${id}`, { doneSteps })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET DONE STEPS
const getDoneSteps = (id) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/done-steps/get/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};
const ExperianceTap = {
  createExperiance,
  getExperianceGeneralInfo,
  getCategories,
  getThemes,
  getCategoriesAndThemes,
  addCategoriesAndThemes,
  getServices,
  getLanguages,
  addOrEditInclusions,
  addOrEditMedia,
  getMedia,
  getInclusions,
  getPhysicalDifficulty,
  getRestrictionsList,
  addThingsToKnow,
  getThingsToKnow,
  addExperianceType,
  getExperianceType,
  updateDoneSteps,
  getDoneSteps,
  getLanguagesNotAuth,
};

export default ExperianceTap;
