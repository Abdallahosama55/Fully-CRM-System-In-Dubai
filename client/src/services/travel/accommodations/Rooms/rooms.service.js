import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "../../config";
const MEDIA_BASE = "/accommodation/room";

// GET ROOMS LIST
const getRoomsList = async (id) => {
    return TravelDashboardAPI.get(MEDIA_BASE + `/list-rooms/${id}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// GET ROOMS TYPES LIST
const getRoomsTypesList = async () => {
    return TravelDashboardAPI.get(`/accommodation/common/list-room-types`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// GET ROOMS ACCESSORIES LIST
const getRoomAccessories = async () => {
    return TravelDashboardAPI.get(`/accommodation/common/list-room-accessories`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// GET ROOM BY ID
const getRoomByID = async (roomID) => {
    return TravelDashboardAPI.get(MEDIA_BASE + `/get-room-info/${roomID}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
};

// ADD NEW ROOM
const addRoom = (accommodationID, data) => {
    return TravelDashboardAPI.post(MEDIA_BASE + `/add/${accommodationID}`, { ...data })
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
}

// EDIT ROOM
const editRoom = (roomID, data) => {
    return TravelDashboardAPI.put(MEDIA_BASE + `/edit-room-info/${roomID}`, { ...data })
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
}

// DELETE ROOM
const deleteRoom = (roomID) => {
    return TravelDashboardAPI.delete(MEDIA_BASE + `/delete/${roomID}`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        });
}

const AccommodationRoomsService = {
    getRoomsList,
    getRoomsTypesList,
    getRoomAccessories,
    getRoomByID,

    addRoom,
    editRoom,
    deleteRoom
}

export default AccommodationRoomsService;