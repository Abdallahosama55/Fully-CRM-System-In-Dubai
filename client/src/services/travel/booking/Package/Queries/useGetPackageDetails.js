import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackageBookingService from "../package.booking.service";

export default function useGetPackageDetails(id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.BOOKING_PACKAGE_GET_PACKAGE_DETAILS, id],
        queryFn: () => PackageBookingService.getPackageDetails(id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.BOOKING_PACKAGE_GET_PACKAGE_DETAILS, id] };
}



