import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackagesPassengersService from "../passengers.service";

export default function useGetPackageQuestions(tripId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PACKAGE_QUESTIONS , tripId],
    queryFn: () => PackagesPassengersService.getQuestions(tripId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PACKAGE_QUESTIONS , tripId] };
}
