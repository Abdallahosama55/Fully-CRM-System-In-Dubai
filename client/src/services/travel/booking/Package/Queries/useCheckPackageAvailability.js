import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackageBookingService from "../package.booking.service";

export default function useCheckPackageAvailability(payload, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.BOOKING_PACKAGE_CHECK_AVAILABILITY, payload],
    queryFn: () => PackageBookingService.checkPackageAvailability(payload),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.BOOKING_PACKAGE_CHECK_AVAILABILITY, payload] };
}
