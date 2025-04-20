import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import RateService from "../rate.service";

export default function useGetRateBySeasonID(seasonID, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_SEASONS_LIST, seasonID],
        queryFn: () => RateService.getRateBySeasonID(seasonID),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_SEASONS_LIST, seasonID] };
}
