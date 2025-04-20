import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AccommodationLocalService from "../accommodation.local.service";

export default function useGetLocalHotelRooms(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.BOOKING_GET_LOCAL_HOTEL_ROOMS, params],
        queryFn: () => AccommodationLocalService.getHotelRooms(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.BOOKING_GET_LOCAL_HOTEL_ROOMS, params] };
}
