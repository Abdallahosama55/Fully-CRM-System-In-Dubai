import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AccommodationTboService from "../accommodation.tbo.service";

export default function useGetTboHotelRooms(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.BOOKING_GET_TBO_HOTEL_ROOMS, params],
        queryFn: () => AccommodationTboService.getHotelRooms(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.BOOKING_GET_TBO_HOTEL_ROOMS, params] };
}
