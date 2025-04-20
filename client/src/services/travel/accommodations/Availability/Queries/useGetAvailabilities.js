import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AvailabilityService from "../availability.service";

export default function useGetAvailabilities(paylaod, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_AVAILABILITIES, JSON.stringify(paylaod)],
        queryFn: () => AvailabilityService.getAvailabilities(paylaod),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_AVAILABILITIES, JSON.stringify(paylaod)] };
}
