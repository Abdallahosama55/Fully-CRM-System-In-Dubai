import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AccommodationRoomsService from "../rooms.service";

export default function useGetRoomAccessoriesList(config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_ACCOMMODATION_ROOMS_ACCESSORIES_LIST],
        queryFn: () => AccommodationRoomsService.getRoomAccessories(),
        staleTime: Infinity,
        cacheTime: Infinity, 
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_ACCOMMODATION_ROOMS_ACCESSORIES_LIST] };
}
