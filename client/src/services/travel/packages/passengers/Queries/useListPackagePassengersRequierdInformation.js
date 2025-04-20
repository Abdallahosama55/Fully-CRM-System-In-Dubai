import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackagesPassengersService from "../passengers.service";

export default function useListPackagePassengersRequierdInformation(tripId , config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.LIST_PACKAGE_PASSENGERS_REQUIERD_INFORMATION , tripId],
    queryFn: () => PackagesPassengersService.listPassengersRequierdInformation(tripId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.LIST_PACKAGE_PASSENGERS_REQUIERD_INFORMATION , tripId] };
}
