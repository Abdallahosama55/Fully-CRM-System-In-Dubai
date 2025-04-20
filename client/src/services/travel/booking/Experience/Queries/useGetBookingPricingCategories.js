import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ExperienceBookingService from "../booking.service";

export default function useGetBookingPricingCategories(config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.BOOKING_EXPERIANCE_PRICING_CATEGORIES],
        queryFn: () => ExperienceBookingService.getPricingCategories(),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.BOOKING_EXPERIANCE_PRICING_CATEGORIES] };
}

