import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackagesDepartureService from "../departure.service";

export default function useGetPackageDepartureDates(tripId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PACKAGE_DEPARTURE_DATES, tripId],
    queryFn: () => PackagesDepartureService.getDepartureDates(tripId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PACKAGE_DEPARTURE_DATES, tripId] };
}
