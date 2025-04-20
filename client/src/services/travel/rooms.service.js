import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "./config";
const ROOM_BASE = '/accommodation/contract/room';
// GET
const getRooms = (accommodation_Id, page, size) => {
    return TravelDashboardAPI.get(ROOM_BASE + `/list/${accommodation_Id}`, { params: { page, size } }).then((res) => {
        return {
            data: res.data.data.rows,
            totalCount: res.data.data.count,
            totalPages: res.data.data.totalPages,
        };
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

const getRoomsTypesBySeasonId = (season_id) => {
    return TravelDashboardAPI.get(`/accommodation/room-type/single/${season_id}`)
        .then((res) => {
            return {
                data: res.data
            };
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// ADD
const addRoom = (room) => {
    return TravelDashboardAPI.post(ROOM_BASE + '/add', {
        ...room
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// Update
const updateRoom = (room) => {
    return TravelDashboardAPI.put(ROOM_BASE + '/edit/' + room.id, {
        ...room
    }).then((res) => {
        return res.data.data;
    }).catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
    })
}

// Delete
const deleteRoom = (id) => {
    return TravelDashboardAPI.delete(ROOM_BASE + '/delete/' + id)
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}

// COMMON
const getRoomsTypesList = () => {
    return TravelDashboardAPI.get("accommodation/room-type/list")
        .then((res) => {
            return res.data.data;
        }).catch((error) => {
            throw new Error(responseErrorMessageExtractor(error));
        })
}

const RoomAPI = {
    getRooms,
    getRoomsTypesBySeasonId,
    addRoom,
    updateRoom,
    deleteRoom,
    getRoomsTypesList,
}

export default RoomAPI;