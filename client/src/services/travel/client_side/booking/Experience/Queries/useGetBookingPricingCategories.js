import { useQuery } from "@tanstack/react-query";
import ExperienceBookingClientService from "../booking.service";
import { QUERY_KEY_CLIENT } from "constants/QUERY_KEY_CLIENT";

export default function useGetBookingPricingCategories(config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY_CLIENT.BOOKING_EXPERIANCE_PRICING_CATEGORIES],
        queryFn: () => ExperienceBookingClientService.getPricingCategories(),
        ...config,
    });
    return { ...query, key: [QUERY_KEY_CLIENT.BOOKING_EXPERIANCE_PRICING_CATEGORIES] };
}

