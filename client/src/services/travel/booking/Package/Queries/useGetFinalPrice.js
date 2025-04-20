import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackageBookingService from "../package.booking.service";

export default function useGetFinalPrice(payload, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.BOOKING_PACKAGE_GET_PACKAGE_FINAL_PRICE, payload],
        queryFn: () => PackageBookingService.getFinalPrice(payload),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.BOOKING_PACKAGE_GET_PACKAGE_FINAL_PRICE, payload] };
}