import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "./config";
const CANCELLATION_BASE = '/accommodation/cancellation-policy';
// GET
const getCancelationPolicies = (accommodation_Id) => {
    return TravelDashboardAPI.get(CANCELLATION_BASE + `/list/${accommodation_Id}`).then((res) => {
        return res.data.data
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}
// GET

// ADD
const addCancelationPolicy = (policy) => {
    return TravelDashboardAPI.post(CANCELLATION_BASE + '/add', {
        ...policy
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// Update
const updateCancelationPolicy = (policy) => {
    return TravelDashboardAPI.put(CANCELLATION_BASE + '/edit/' + policy.id, {
        ...policy
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// Delete
const deleteCancelationPolicy = (id) => {
    return TravelDashboardAPI.delete(CANCELLATION_BASE + '/delete/' + id)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}


// TYPES

// GET POLICIES TYPES
const getCancelationPoliciesTypes = () => {
    return TravelDashboardAPI.get("/accommodation/common/list-cancellation-policy-types").then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// GET POLICIES PERIOD TYPES
const getCancelationPoliciesPeriodTypes = () => {
    return TravelDashboardAPI.get("/accommodation/common/list-cancellation-policy-period-types").then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// GET POLICIES DATE RANG TYPES
const getCancelationPoliciesDateRangeTypes = () => {
    return TravelDashboardAPI.get("/accommodation/common/list-cancellation-policy-date-range").then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

const CancelationPolicyAPI = {
    getCancelationPolicies,
    getCancelationPoliciesTypes,
    getCancelationPoliciesPeriodTypes,
    getCancelationPoliciesDateRangeTypes,
    addCancelationPolicy,
    updateCancelationPolicy,
    deleteCancelationPolicy,
}

export default CancelationPolicyAPI;