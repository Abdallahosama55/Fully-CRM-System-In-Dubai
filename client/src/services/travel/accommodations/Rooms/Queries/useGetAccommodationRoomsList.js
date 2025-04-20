import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AccommodationRoomsService from "../rooms.service";

export default function useGetAccommodationRoomsList(id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_ACCOMMODATION_ROOMS_LIST, id],
        queryFn: () => AccommodationRoomsService.getRoomsList(id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_ACCOMMODATION_ROOMS_LIST, id] };
}
