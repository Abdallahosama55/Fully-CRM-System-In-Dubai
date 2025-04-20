import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AccommodationMediaService from "../media.service";

export default function useGetMetaversSliders(config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_METAVERS_SLIDERS],
        queryFn: () => AccommodationMediaService.getMetaversSliders(),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_METAVERS_SLIDERS] };
}
