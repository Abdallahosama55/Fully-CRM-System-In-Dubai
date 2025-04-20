import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AccommodationAPI from "../../accommodation.service";

export default function useGetAccommodationPensionsList(config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_ACCOMMODATION_PENSIONS_LIST],
        queryFn: () => AccommodationAPI.getAccommodationPensionsList(),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_ACCOMMODATION_PENSIONS_LIST] };
}
