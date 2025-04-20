import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ExperianceService from "../experiance.service";

export default function useGetInclusions(id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_EXPERIANCE_INCLUSIONS],
        queryFn: () => ExperianceService.getInclusions(id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_EXPERIANCE_INCLUSIONS] };
}
