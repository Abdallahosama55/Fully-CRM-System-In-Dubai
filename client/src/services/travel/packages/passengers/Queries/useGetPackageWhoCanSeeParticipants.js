import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackagesPassengersService from "../passengers.service";

export default function useGetPackageWhoCanSeeParticipants(tripId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PACKAGE_WHO_CAN_SEE_PARTICIPANTS , tripId],
    queryFn: () => PackagesPassengersService.getWhoCanSeeParticipants(tripId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PACKAGE_WHO_CAN_SEE_PARTICIPANTS , tripId] };
}
