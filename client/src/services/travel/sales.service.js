import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "./config";
const SALES_BASE = '/accommodation/contract/sales';
// GET
const getSalesContracts = (page, size) => {
    return TravelDashboardAPI.get(SALES_BASE + `/list`, { params: { page, size } }).then((res) => {
        return {
            data: res.data.data.rows,
            totalCount: res.data.data.count,
            totalPages: res.data.data.totalPages,
        };
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

const getSalesContractsByPurchaseContract = (purchaseContractId) => {
    return TravelDashboardAPI.get(SALES_BASE + `/list-by-purchase?purchaseContractId=${purchaseContractId}`).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// ADD
const addSaleContract = (sale) => {
    return TravelDashboardAPI.post(SALES_BASE + '/add', {
        ...sale
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// Update
const updateSaleContract = (sale) => {
    return TravelDashboardAPI.put(SALES_BASE + '/edit/' + sale.id, {
        ...sale
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// Delete
const deleteSaleContract = (id) => {
    return TravelDashboardAPI.delete(SALES_BASE + '/delete/' + id)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}


const SalesAPI = {
    getSalesContracts,
    getSalesContractsByPurchaseContract,
    addSaleContract,
    updateSaleContract,
    deleteSaleContract,
}

export default SalesAPI;