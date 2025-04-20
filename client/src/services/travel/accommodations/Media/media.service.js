import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "../../config";
const MEDIA_BASE = "/accommodation/media";

// GET METAVERS SLIDERS
const getMetaversSliders = async () => {
    return TravelDashboardAPI.get(MEDIA_BASE + `/get-dimension`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// GET MEDIA INFO
const getMediaInfo = async (id) => {
    return TravelDashboardAPI.get(MEDIA_BASE + `/get/${id}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// ADD MEDIA INFO
const addMediaInfo = async (id, data) => {
    return TravelDashboardAPI.post(MEDIA_BASE + `/add/${id}`, { ...data })
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
}

const AccommodationMediaService = {
    getMetaversSliders,
    getMediaInfo,
    addMediaInfo,
}

export default AccommodationMediaService;

