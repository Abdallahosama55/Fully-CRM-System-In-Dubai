import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackageBookingService from "../package.booking.service";

export default function useGetPackageSearchResults(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.BOOKING_PACKAGE_SEARCH_RESULTS, params],
        queryFn: () => PackageBookingService.getPackageSearchResults(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.BOOKING_PACKAGE_SEARCH_RESULTS, params] };
}

