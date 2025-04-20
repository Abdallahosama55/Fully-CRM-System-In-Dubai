import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AvailabilityService from "../availability.service";

export default function useGetRoomsCapacity(accommodationId, config) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_ROOM_CAPACITY, accommodationId],
        queryFn: () => AvailabilityService.getRoomsCapacity(accommodationId),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_ROOM_CAPACITY, accommodationId] };
}
