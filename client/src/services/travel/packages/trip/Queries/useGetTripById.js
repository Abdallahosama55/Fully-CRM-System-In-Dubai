import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackagesTripService from "../packages.trips.service";


export default function useGetTripById(id, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PACKAGE_TRIP_BY_ID , id],
    queryFn: () => PackagesTripService.getTripById(id),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PACKAGE_TRIP_BY_ID , id] };
}
