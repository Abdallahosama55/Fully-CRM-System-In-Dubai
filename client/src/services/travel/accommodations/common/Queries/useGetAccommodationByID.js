import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AccommodationAPI from "../../accommodation.service";

export default function useGetAccommodationByID(id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_ACCOMMODATION_BY_ID, id],
        queryFn: () => AccommodationAPI.getAccommodationByID(id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_ACCOMMODATION_BY_ID, id] };
}
