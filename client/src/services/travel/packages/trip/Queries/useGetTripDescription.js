import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackagesTripService from "../packages.trips.service";


export default function useGetTripDescription(tripId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PACKAGE_TRIP_DESCRIPTION_BY_ID , tripId],
    queryFn: () => PackagesTripService.getDescription(tripId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PACKAGE_TRIP_DESCRIPTION_BY_ID , tripId] };
}
