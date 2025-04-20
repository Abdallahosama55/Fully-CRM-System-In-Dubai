import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "../../config";
const PICK_UP_BASE = "/experience/product";
// ADD PICK UP TYPE
const addPickUpType = (pickUpType, productId) => {
  return TravelDashboardAPI.post(PICK_UP_BASE + `/pick-up/add/${productId}`, { pickUp: pickUpType })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET PICK UP TYPE
const getPickUpType = (productId) => {
  return TravelDashboardAPI.get(PICK_UP_BASE + `/pick-up/get/${productId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};
// !MEETING POINTS
// GET PICK UP MEETING POINT BY ID
const getPickUpMeetingPoints = (productId) => {
  return TravelDashboardAPI.get(PICK_UP_BASE + `/pick-up-start-point/list/${productId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET PICK UP MEETING POINTS
const getPickUpMeetingPointById = (id) => {
  return TravelDashboardAPI.get(PICK_UP_BASE + `/pick-up-start-point/get-by-id/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD PICK UP MEETING POINT
const addPickUpMeetingPoint = (id, data) => {
  return TravelDashboardAPI.post(PICK_UP_BASE + `/pick-up-start-point/add/${id}`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// EDIT PICK UP MEETING POINT
const updatePickUpMeetingPoint = (data) => {
  return TravelDashboardAPI.put(PICK_UP_BASE + `/pick-up-start-point/edit/${data.id}`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// DELETE PICK UP MEETING POINT
const deletePickUpMeetingPoint = (id) => {
  return TravelDashboardAPI.delete(PICK_UP_BASE + `/pick-up-start-point/delete/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ! PickUp SERVICES
// GET ALL PICK-UP LOCATIONS
const getPickUpLocations = (productId) => {
  return TravelDashboardAPI.get(PICK_UP_BASE + `/pick-up-places/list/${productId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET PICK-UP LOCATION POINT BY ID
const getPickUpLocationById = (id) => {
  return TravelDashboardAPI.get(PICK_UP_BASE + `/pick-up-places/get-by-id/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD PICK-UP LOCATION
const addPickUpLocation = (productId, data) => {
  return TravelDashboardAPI.post(PICK_UP_BASE + `/pick-up-places/add/${productId}`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// EDIT PICK-UP LOCATION
const updatePickUpLocation = (data) => {
  return TravelDashboardAPI.put(PICK_UP_BASE + `/pick-up-places/edit/${data.id}`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// DELETE PICK-UP LOCATION
const deletePickUpLocation = (id) => {
  return TravelDashboardAPI.delete(PICK_UP_BASE + `/pick-up-places/delete/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ! PICKUP TIMING
// GET PICK-UP TIMING
const getPickTiming = (productId) => {
  return TravelDashboardAPI.get(PICK_UP_BASE + `/pickup-begin/get/${productId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD PICK-UP TIMING
const addPickUpTiming = (productId, data) => {
  return TravelDashboardAPI.post(PICK_UP_BASE + `/pickup-begin/add/${productId}`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ! Locations (PICK-UP || DROP-OF)
// GET ALL (PICK-UP || DROP-OF) LOCATIONS
const getLocations = (productId, isDropOf = false) => {
  return TravelDashboardAPI.get(
    PICK_UP_BASE + `${isDropOf ? "/drop-off-places" : "/pick-up-places"}/list/${productId}`,
  )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET (PICK-UP || DROP-OF) LOCATION POINT BY ID
const getLocationById = (id, isDropOf = false) => {
  return TravelDashboardAPI.get(
    PICK_UP_BASE + `${isDropOf ? "/drop-off-places" : "/pick-up-places"}/get-by-id/${id}`,
  )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD (PICK-UP || DROP-OF) LOCATION
const addLocation = (productId, data, isDropOf = false) => {
  return TravelDashboardAPI.post(
    PICK_UP_BASE + `${isDropOf ? "/drop-off-places" : "/pick-up-places"}/add/${productId}`,
    data,
  )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// EDIT (PICK-UP || DROP-OF) LOCATION
const updateLocation = (data, isDropOf = false) => {
  return TravelDashboardAPI.put(
    PICK_UP_BASE + `${isDropOf ? "/drop-off-places" : "/pick-up-places"}/edit/${data.id}`,
    data,
  )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// DELETE (PICK-UP || DROP-OF) LOCATION
const deleteLocation = (id, isDropOf = false) => {
  return TravelDashboardAPI.delete(
    PICK_UP_BASE + `${isDropOf ? "/drop-off-places" : "/pick-up-places"}/delete/${id}`,
  )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ! DROP-OF SERVICE
// ADD DROP-OF SERVICE
const addDropOfService = (productId, data) => {
  return TravelDashboardAPI.post(PICK_UP_BASE + `/drop-off-service/add/${productId}`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET DROP-OF SERVICE
const getDropOfService = (productId) => {
  return TravelDashboardAPI.get(PICK_UP_BASE + `/drop-off-service/get/${productId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const PickUpTab = {
  addPickUpType,
  getPickUpType,
  // meeting points
  getPickUpMeetingPoints,
  getPickUpMeetingPointById,
  addPickUpMeetingPoint,
  updatePickUpMeetingPoint,
  deletePickUpMeetingPoint,
  // PICK-UP TIMING
  getPickTiming,
  addPickUpTiming,
  // LOCATION SERVICE
  getLocations,
  getLocationById,
  addLocation,
  updateLocation,
  deleteLocation,
  // DROP-Of SERVICE
  addDropOfService,
  getDropOfService,
};

export default PickUpTab;
