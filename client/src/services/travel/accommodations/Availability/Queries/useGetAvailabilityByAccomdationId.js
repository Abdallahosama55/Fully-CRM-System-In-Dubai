import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AvailabilityService from "../availability.service";

export default function useGetAvailabilityByAccomdationId(id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_AVAILABILITY_BY_ACCOMDATION_ID, id],
        queryFn: () => AvailabilityService.getAvailabilityByAccomdationId(id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_AVAILABILITY_BY_ACCOMDATION_ID, id] };
}
