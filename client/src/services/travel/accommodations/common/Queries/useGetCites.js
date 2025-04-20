import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AccommodationAPI from "../../accommodation.service";

export default function useGetCites(name, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_CITES, name],
        queryFn: () => AccommodationAPI.getCites(name),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_CITES, name] };
}
