import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AccommodationAPI from "../../accommodation.service";

export default function useGetAccommodations(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_ACCOMMODATIONS, params],
        queryFn: () => AccommodationAPI.getAccommodations(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_ACCOMMODATIONS, params] };
}
