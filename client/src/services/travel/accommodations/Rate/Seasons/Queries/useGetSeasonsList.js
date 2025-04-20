import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import SeasonService from "../seasons.service";

export default function useGetSeasonsList(accommodation_Id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_SEASONS_LIST, accommodation_Id],
        queryFn: () => SeasonService.getSeasons(accommodation_Id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_SEASONS_LIST, accommodation_Id] };
}
