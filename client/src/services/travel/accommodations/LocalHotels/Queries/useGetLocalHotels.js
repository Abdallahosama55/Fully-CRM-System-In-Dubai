import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AccommodationLocalService from "../accommodation.local.service";

export default function useGetLocalHotels(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.BOOKING_GET_LOCAL_HOTELS, params],
        queryFn: () => AccommodationLocalService.getHotels(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.BOOKING_GET_LOCAL_HOTELS, params] };
}
