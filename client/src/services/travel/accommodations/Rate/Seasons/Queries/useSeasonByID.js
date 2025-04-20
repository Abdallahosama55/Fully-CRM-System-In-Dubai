import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import SeasonService from "../seasons.service";

export default function useSeasonByID(id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_SEASON_BY_ID, id],
        queryFn: () => SeasonService.getSeasonById(id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_SEASON_BY_ID, id] };
}
