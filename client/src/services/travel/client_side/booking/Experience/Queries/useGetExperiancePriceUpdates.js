import { useQuery } from "@tanstack/react-query";
import ExperienceBookingClientService from "../booking.service";
import { QUERY_KEY_CLIENT } from "constants/QUERY_KEY_CLIENT";

export default function useGetExperiancePriceUpdates(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY_CLIENT.BOOKING_GET_EXPERIANCE_PRICES, params],
        queryFn: () => ExperienceBookingClientService.getExperiancePriceUpdates(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY_CLIENT.BOOKING_GET_EXPERIANCE_PRICES, params] };
}

