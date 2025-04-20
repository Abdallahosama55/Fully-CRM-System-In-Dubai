import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "../../../config";

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


const getSeasonsType = (accommodationID) => {
    return TravelDashboardAPI.get(SEASONS_BASE + `/get-season-type/${accommodationID}`)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}


// disabel Open Season
const disabelOpenSeason = (params) => {
    return TravelDashboardAPI.put(SEASONS_BASE + '/disabel-open-season', {
        ...params
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// activate Open Season
const setActivateSeasonType = (params) => {
    return TravelDashboardAPI.put(SEASONS_BASE + '/activate-season-type', {
        ...params
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}


const SeasonService = {
    getSeasons,
    getSeasonsType,
    addSeason,
    updateSeason,
    deleteSeason,
    getSeasonById,
    disabelOpenSeason,
    setActivateSeasonType,
}

export default SeasonService;