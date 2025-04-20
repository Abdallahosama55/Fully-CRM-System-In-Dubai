import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const EXPERIANCE_BASE = "/experience/product";
// PRICING CATEGORIES
// GET PRICING CATEGORIES
const getPricingCategories = (id) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/product-pricing-categories/list/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD PRICING CATEGORIES
const addPricingCategories = (data, id) => {
  return TravelDashboardAPI.post(EXPERIANCE_BASE + `/product-pricing-categories/add/${id}`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// RATE
// GET PRICING RATES
const getPricingRates = (productId) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/product-pricing-rates/list/${productId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET PRICING RATES
const getPricingRateByID = (rateId) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/product-pricing-rates/get-by-id/${rateId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD PRICING RATES
const addPricingRate = (data, productId) => {
  return TravelDashboardAPI.post(EXPERIANCE_BASE + `/product-pricing-rates/add/${productId}`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD PRICING RATES
const updatePricingRate = (data) => {
  return TravelDashboardAPI.put(EXPERIANCE_BASE + `/product-pricing-rates/edit/${data.id}`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// CLONE PRICING RATES
const clonePricingRate = (rateId, productId) => {
  return TravelDashboardAPI.post(EXPERIANCE_BASE + `/product-pricing-rates/clone/${rateId}`, {
    productId,
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// DELETE PRICING RATES
const deletePricingRate = (rateId) => {
  return TravelDashboardAPI.delete(EXPERIANCE_BASE + `/product-pricing-rates/delete/${rateId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// DELETE PRICING RATES
const setPricingRateAsDefault = (rateId) => {
  return TravelDashboardAPI.put(EXPERIANCE_BASE + `/product-pricing-rates/set-default/${rateId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// PRICING
// GET EXPERIANCE PRICING RATES
const getExperiancePricingRates = (productId, sessionId) => {
  return TravelDashboardAPI.get(
    EXPERIANCE_BASE + `/product-pricing/list-product-pricing-rates/${productId}`,
    { params: { sessionId } },
  )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};
// ADD EXPERIANCE PRICING RATES
const addExperiencePricess = (prices, productId) => {
  return TravelDashboardAPI.post(EXPERIANCE_BASE + `/product-pricing/add/${productId}`, { prices })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};
// COMMON
// GET SYSTEM PRICING RATES
const getPricingCategorySystem = () => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/pricing-common/list-pricing-category-systme`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET SYSTEM EXPERIENCE SESSION
const getExperienceSessions = (productId) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/session/list-sessions/${productId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET SYSTEM EXPERIENCE SESSION UNUSED
const getUnusedExperienceSessions = (productId) => {
  return TravelDashboardAPI.get(EXPERIANCE_BASE + `/product-pricing-rates/list-filter-sessions/${productId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const PricingTap = {
  getPricingCategories,
  addPricingCategories,
  // rates
  getPricingRates,
  getPricingRateByID,
  addPricingRate,
  updatePricingRate,
  clonePricingRate,
  deletePricingRate,
  setPricingRateAsDefault,
  // pricing
  getExperiancePricingRates,
  addExperiencePricess,
  getUnusedExperienceSessions,
  // common
  getPricingCategorySystem,
  getExperienceSessions,
};

export default PricingTap;
