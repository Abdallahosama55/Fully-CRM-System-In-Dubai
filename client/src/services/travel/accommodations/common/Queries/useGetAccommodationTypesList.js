import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AccommodationAPI from "../../accommodation.service";

export default function useGetAccommodationTypesList(config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_ACCOMMODATION_TYPE_LIST],
        queryFn: () => AccommodationAPI.getAccommodationTypesList(),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_ACCOMMODATION_TYPE_LIST] };
}
