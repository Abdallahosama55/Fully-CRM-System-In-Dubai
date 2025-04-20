import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "./config";
const SEASONS_BASE = '/accommodation/contract/season';
// GET
const getSeasons = (accommodation_Id, page, size) => {
    return TravelDashboardAPI.get(SEASONS_BASE + `/list/${accommodation_Id}`, { params: { page, size } })
        .then((res) => {
            return {
                data: res.data.data.rows,
                totalCount: res.data.data.count,
                totalPages: res.data.data.totalPages,
            };
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const getSeasonById = (seasonId) => {
    return TravelDashboardAPI.get(SEASONS_BASE + `/get-by-id/${seasonId}`)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// ADD
const addSeason = (season) => {
    return TravelDashboardAPI.post(SEASONS_BASE + '/add', {
        ...season
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// Update
const updateSeason = (season) => {
    return TravelDashboardAPI.put(SEASONS_BASE + '/edit/' + season.id, {
        ...season
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// Delete
const deleteSeason = (id) => {
    return TravelDashboardAPI.delete(SEASONS_BASE + '/delete/' + id)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const SeasonAPI = {
    getSeasons,
    addSeason,
    updateSeason,
    deleteSeason,
    getSeasonById,
}

export default SeasonAPI;