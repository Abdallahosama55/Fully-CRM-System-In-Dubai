import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AccommodationMediaService from "../media.service";

export default function useGetMediaInfo(id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_MEDIA_INFO, id],
        queryFn: () => AccommodationMediaService.getMediaInfo(id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_MEDIA_INFO, id] };
}
