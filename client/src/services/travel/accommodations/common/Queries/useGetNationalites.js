import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AccommodationAPI from "../../accommodation.service";

export default function useGetNationalites(config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_NATIONALITES],
        queryFn: () => AccommodationAPI.getNationalites(),
        staleTime: Infinity,
        cashTime: Infinity,
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_NATIONALITES] };
}
