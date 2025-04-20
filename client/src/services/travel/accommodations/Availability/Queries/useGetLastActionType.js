import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AvailabilityService from "../availability.service";

export default function useGetLastActionType(accommodationId, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_AVAILABILITY_LAST_ACTION_TYPE, accommodationId],
        queryFn: () => AvailabilityService.getLastActionType(accommodationId),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_AVAILABILITY_LAST_ACTION_TYPE, accommodationId] };
}
