import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import SeasonService from "../seasons.service";

export default function useGetSeasonsType(accommodationID, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_SEASONS_TYPE, accommodationID],
        queryFn: () => SeasonService.getSeasonsType(accommodationID),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_SEASONS_TYPE, accommodationID] };
}
