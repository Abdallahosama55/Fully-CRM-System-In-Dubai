import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ExperienceBookingService from "../booking.service";

export default function useGetExperiancePriceUpdates(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.BOOKING_GET_EXPERIANCE_PRICES, params],
        queryFn: () => ExperienceBookingService.getExperiancePriceUpdates(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.BOOKING_GET_EXPERIANCE_PRICES, params] };
}

