import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const PROMOTION_BASE = '/accommodation/contract/promotion';
// GET
const getPromotions = (accommodation_Id, page = 1, size = 10) => {
    return TravelDashboardAPI.get(PROMOTION_BASE + `/list/${accommodation_Id}?page=${page}&size=${size}`).then((res) => {
        return {
            data: res.data.data.rows,
            totalCount: res.data.data.count,
            totalPages: res.data.data.totalPages,
        };
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}
// GET BY ID
const getPromotionById = (promotionId) => {
    return TravelDashboardAPI.get(PROMOTION_BASE + `/get-by-id/${promotionId}`).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// ADD
const addPromotion = (promotion) => {
    return TravelDashboardAPI.post(PROMOTION_BASE + '/add', {
        ...promotion
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// Update
const updatePromotion = (promotion) => {
    return TravelDashboardAPI.put(PROMOTION_BASE + '/edit/' + promotion.id, {
        ...promotion
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// Delete
const deletePromotion = (id) => {
    return TravelDashboardAPI.delete(PROMOTION_BASE + '/delete/' + id)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const PromotionService = {
    getPromotions,
    getPromotionById,
    addPromotion,
    updatePromotion,
    deletePromotion,
}

export default PromotionService;