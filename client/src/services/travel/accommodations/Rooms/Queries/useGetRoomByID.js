import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AccommodationRoomsService from "../rooms.service";

export default function useGetRoomByID(roomID, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_ROOM_BY_ID, roomID],
        queryFn: () => AccommodationRoomsService.getRoomByID(roomID),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_ROOM_BY_ID, roomID] };
}
