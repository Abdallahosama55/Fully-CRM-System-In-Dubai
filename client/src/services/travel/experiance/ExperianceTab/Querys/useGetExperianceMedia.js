import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ExperianceService from "../experiance.service";

export default function useGetExperianceMedia(id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.EXPERIANCE_MEDIA, id],
        queryFn: () => ExperianceService.getMedia(id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.EXPERIANCE_MEDIA, id] };
}
