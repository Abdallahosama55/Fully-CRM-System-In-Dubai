import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AvailabilityService from "../availability.service";

export default function useGetRoomTypes(payload, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_ROOM_TYPES, payload.accommodationId, payload.startDate, payload.endDate],
        queryFn: () => AvailabilityService.getRoomTypes(payload),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_ROOM_TYPES, payload.accommodationId, payload.startDate, payload.endDate] };
}
