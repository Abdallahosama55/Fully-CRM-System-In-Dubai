import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ManualBookingService from "../../manual.booking.service";

export default function useManualBookingListHotelRooms(payload, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.MANUAL_BOOKING_LIST_HOTEL_ROOMS, payload],
        queryFn: () => ManualBookingService.Accommodation.listHotelRooms(payload),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.MANUAL_BOOKING_LIST_HOTEL_ROOMS, payload] };
}
