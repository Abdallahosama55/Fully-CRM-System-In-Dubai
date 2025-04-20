import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "./config";
const PURCHASES_BASE = '/accommodation/contract/purchase';
// GET
const getPurchaseContracts = (page = 1, size = 10) => {
    return TravelDashboardAPI.get(PURCHASES_BASE + `/list?page=${page}&size=${size}`).then((res) => {
        return {
            data: res.data.data.rows,
            totalCount: res.data.data.count,
            totalPages: res.data.data.totalPages,
        };
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// ADD
const addPurchaseContract = (purchase) => {
    return TravelDashboardAPI.post(PURCHASES_BASE + '/add', {
        ...purchase
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// Update
const updatePurchaseContract = (purchase) => {
    return TravelDashboardAPI.put(PURCHASES_BASE + '/edit/' + purchase.id, {
        ...purchase
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// Delete
const deletePurchaseContract = (id) => {
    return TravelDashboardAPI.delete(PURCHASES_BASE + '/delete/' + id)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const PurchasesAPI = {
    getPurchaseContracts,
    addPurchaseContract,
    updatePurchaseContract,
    deletePurchaseContract,
}

export default PurchasesAPI;