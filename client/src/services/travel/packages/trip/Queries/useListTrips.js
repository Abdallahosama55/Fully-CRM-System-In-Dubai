import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackagesTripService from "../packages.trips.service";


export default function useListTrips(params , config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PACKAGES_TRIPS_LIST , params],
    queryFn: () => PackagesTripService.listTrips(params),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PACKAGES_TRIPS_LIST , params] };
}
